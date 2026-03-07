<?php
/**
 * TaLu Kids - Formularz kontaktowy
 * Obsługuje POST z formularza i wysyła email na kontakt@talukids.pl
 */

header('Content-Type: application/json; charset=utf-8');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://talukids.pl', 'https://www.talukids.pl'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
} else {
    header('Access-Control-Allow-Origin: https://www.talukids.pl');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Tylko POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metoda niedozwolona']);
    exit;
}

// Rate limiting - max 5 wiadomości na godzinę z jednego IP (z file locking)
$rateLimitDir = __DIR__ . '/../storage/rate-limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0750, true);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = $rateLimitDir . '/' . md5($ip) . '.json';
$maxPerHour = 5;

$fp = @fopen($rateLimitFile, 'c+');
if ($fp && flock($fp, LOCK_EX)) {
    $contents = stream_get_contents($fp);
    $data = $contents ? json_decode($contents, true) : [];
    if (!is_array($data)) $data = [];

    $oneHourAgo = time() - 3600;
    $data = array_values(array_filter($data, fn($t) => $t > $oneHourAgo));

    if (count($data) >= $maxPerHour) {
        flock($fp, LOCK_UN);
        fclose($fp);
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Zbyt wiele wiadomości. Spróbuj ponownie za godzinę.']);
        exit;
    }
    // Aktualizujemy po wysłaniu emaila (poniżej)
} else {
    // Jeśli nie możemy otworzyć pliku, kontynuuj bez rate limitingu
    $fp = null;
}

// Parsuj dane - próbuj JSON, fallback na $_POST
$rawBody = file_get_contents('php://input');
$input = null;

if ($rawBody) {
    $rawBody = ltrim($rawBody, "\xEF\xBB\xBF");
    $input = json_decode($rawBody, true);
}

if (!is_array($input) || empty($input)) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? '');
$honeypot = trim($input['website'] ?? '');
$formLoadedAt = intval($input['_t'] ?? 0);

// Honeypot - bot trap
if (!empty($honeypot)) {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    echo json_encode(['success' => true]);
    exit;
}

// Anty-bot: formularz musi być załadowany min. 3 sekundy temu
$now = time();
if ($formLoadedAt > 0 && ($now - $formLoadedAt) < 3) {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    echo json_encode(['success' => true]); // Udajemy sukces dla bota
    exit;
}

// Sanityzacja - usunięcie znaków nowej linii (ochrona przed header injection)
$name = str_replace(["\r", "\n", "\0"], '', $name);
$email = str_replace(["\r", "\n", "\0"], '', $email);

// Walidacja
$errors = [];

if (empty($name) || mb_strlen($name) < 2) {
    $errors[] = 'Imię jest wymagane (min. 2 znaki)';
}
if (mb_strlen($name) > 100) {
    $errors[] = 'Imię jest za długie (max. 100 znaków)';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Podaj prawidłowy adres email';
}

if (empty($message) || mb_strlen($message) < 10) {
    $errors[] = 'Wiadomość jest wymagana (min. 10 znaków)';
}
if (mb_strlen($message) > 5000) {
    $errors[] = 'Wiadomość jest za długa (max. 5000 znaków)';
}

if (!empty($errors)) {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => implode('. ', $errors)]);
    exit;
}

// Email
$to = 'kontakt@talukids.pl';
$subject = "Formularz kontaktowy - {$name}";

$body = "Nowa wiadomość z formularza kontaktowego talukids.pl\n";
$body .= "=========================================\n\n";
$body .= "Imię: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Data: " . date('Y-m-d H:i:s') . "\n\n";
$body .= "Wiadomość:\n";
$body .= "-----------------------------------------\n";
$body .= "{$message}\n";
$body .= "-----------------------------------------\n";

$headers = [
    "From: noreply@talukids.pl",
    "Reply-To: {$email}",
    "Content-Type: text/plain; charset=UTF-8",
    "X-Mailer: TaLu Kids Contact Form",
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    // Zapisz rate limit z lockiem
    if ($fp) {
        $data[] = time();
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode(array_values($data)));
        flock($fp, LOCK_UN);
        fclose($fp);
    }

    echo json_encode(['success' => true, 'message' => 'Wiadomość wysłana pomyślnie!']);
} else {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Nie udało się wysłać wiadomości. Napisz bezpośrednio na kontakt@talukids.pl']);
}
