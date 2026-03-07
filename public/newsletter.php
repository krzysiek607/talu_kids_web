<?php
/**
 * TaLu Kids - Newsletter signup
 * Zapisuje email do Supabase (tabela newsletter_subscribers)
 */

// Supabase config
$supabaseUrl = 'https://efnxsjneewsqhxcglelz.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmbnhzam5lZXdzcWh4Y2dsZWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NjMxNjIsImV4cCI6MjA4NDMzOTE2Mn0.UZ2JQ9uq9VqZ3_LtjUAYTehOHz0ia-bcfimL7sKMbAk';

// CORS
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://talukids.pl', 'https://www.talukids.pl'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: {$origin}");
} else {
    header('Access-Control-Allow-Origin: https://www.talukids.pl');
}
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Metoda niedozwolona']);
    exit;
}

// Rate limiting (10/godz. na IP)
$rateLimitDir = __DIR__ . '/../storage/rate-limits';
if (!is_dir($rateLimitDir)) {
    @mkdir($rateLimitDir, 0750, true);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = $rateLimitDir . '/nl_' . md5($ip) . '.json';

$fp = @fopen($rateLimitFile, 'c+');
if ($fp && flock($fp, LOCK_EX)) {
    $contents = stream_get_contents($fp);
    $data = $contents ? json_decode($contents, true) : [];
    if (!is_array($data)) $data = [];

    $oneHourAgo = time() - 3600;
    $data = array_values(array_filter($data, fn($t) => $t > $oneHourAgo));

    if (count($data) >= 10) {
        flock($fp, LOCK_UN);
        fclose($fp);
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Zbyt wiele prób. Spróbuj ponownie za godzinę.']);
        exit;
    }
} else {
    $fp = null;
}

// Parsuj dane - próbuj JSON, fallback na $_POST
$rawBody = file_get_contents('php://input');
$input = null;

if ($rawBody) {
    // Usuń ewentualny BOM
    $rawBody = ltrim($rawBody, "\xEF\xBB\xBF");
    $input = json_decode($rawBody, true);
}

if (!is_array($input) || empty($input)) {
    $input = $_POST;
}

$email = trim($input['email'] ?? '');
$honeypot = trim($input['website'] ?? '');

// Honeypot
if (!empty($honeypot)) {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    echo json_encode(['success' => true]);
    exit;
}

// Walidacja
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Podaj prawidłowy adres email']);
    exit;
}

if (mb_strlen($email) > 255) {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Adres email jest za długi']);
    exit;
}

// Wyślij do Supabase
$payload = json_encode([
    'email' => strtolower($email),
    'source' => 'website',
    'status' => 'active',
]);

$ch = curl_init("{$supabaseUrl}/rest/v1/newsletter_subscribers");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "apikey: {$supabaseKey}",
        "Authorization: Bearer {$supabaseKey}",
        "Content-Type: application/json",
        "Prefer: return=minimal",
    ],
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Rate limit - zapisz po próbie
if ($fp) {
    $data[] = time();
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode(array_values($data)));
    flock($fp, LOCK_UN);
    fclose($fp);
}

// Obsługa odpowiedzi
if ($httpCode === 201 || $httpCode === 200) {
    echo json_encode(['success' => true, 'message' => 'Zapisano! Powiadomimy Cię o premierze.']);
    exit;
}

if ($httpCode === 409 || (strpos($response, 'duplicate') !== false) || (strpos($response, '23505') !== false)) {
    // Duplikat - email już zapisany. Nie zdradzamy tego (prywatność).
    echo json_encode(['success' => true, 'message' => 'Zapisano! Powiadomimy Cię o premierze.']);
    exit;
}

// Inny błąd
http_response_code(500);
echo json_encode(['success' => false, 'error' => 'Coś poszło nie tak. Spróbuj ponownie później.']);
