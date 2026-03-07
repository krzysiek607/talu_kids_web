# ============================================
#  TaLu Kids - Deploy na Hostido
#  Uzycie: powershell -ExecutionPolicy Bypass -File deploy.ps1
# ============================================

$ftpHost = "host786687.xce.pl"
$ftpUser = "admin@talukids.pl"
$localDir = "C:\talu_kids_web"
$outDir = "$localDir\out"
$remoteBase = "/public_html"

Write-Host ""
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  TaLu Kids - Deploy na Hostido" -ForegroundColor Magenta
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""

# --- Krok 1: Haslo FTP ---
$ftpPass = Read-Host "Podaj haslo FTP (admin@talukids.pl)"

# --- Krok 2: Build ---
Write-Host ""
Write-Host "[1/4] Budowanie strony..." -ForegroundColor Yellow
Set-Location $localDir
npm run build 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "BLAD: Build nie powiodl sie!" -ForegroundColor Red
    exit 1
}
Write-Host "  Build OK" -ForegroundColor Green

# --- Krok 3: Rename _next -> next-static ---
Write-Host "[2/4] Przygotowanie plikow..." -ForegroundColor Yellow
$oldNext = Join-Path $outDir "_next"
$newNext = Join-Path $outDir "next-static"

if (Test-Path $newNext) { Remove-Item $newNext -Recurse -Force }
if (Test-Path $oldNext) { Rename-Item $oldNext "next-static" }

# Update references in HTML/JS/CSS
$filesToFix = Get-ChildItem $outDir -Recurse -Include "*.html","*.css","*.js"
foreach ($file in $filesToFix) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -and $content.Contains("/_next/")) {
        $content = $content.Replace("/_next/", "/next-static/")
        Set-Content $file.FullName $content -NoNewline
    }
}
Write-Host "  Pliki przygotowane" -ForegroundColor Green

# --- Krok 4: Upload FTPS (SSL) ---
Write-Host "[3/4] Upload na Hostido (FTPS)..." -ForegroundColor Yellow
$allFiles = Get-ChildItem $outDir -Recurse -File
$total = $allFiles.Count
$i = 0
$errors = 0
$errorFiles = @()

foreach ($file in $allFiles) {
    $i++
    $relativePath = $file.FullName.Substring($outDir.Length + 1).Replace('\', '/')
    $url = "ftp://${ftpHost}${remoteBase}/${relativePath}"

    $pct = [math]::Round(($i / $total) * 100)
    Write-Host "`r  [$pct%] $i/$total - $relativePath          " -NoNewline -ForegroundColor Cyan

    $null = & curl.exe -s -S --ssl-reqd --ftp-create-dirs --ftp-pasv -T "$($file.FullName)" $url --user "${ftpUser}:${ftpPass}" --connect-timeout 30 --max-time 180 2>&1

    if ($LASTEXITCODE -ne 0) {
        $errors++
        $errorFiles += $relativePath
    }
}

Write-Host ""
if ($errors -eq 0) {
    Write-Host "  Upload OK ($total plikow)" -ForegroundColor Green
} else {
    Write-Host "  Upload z $errors bledami:" -ForegroundColor Red
    foreach ($ef in $errorFiles) {
        Write-Host "    - $ef" -ForegroundColor Red
    }

    # Retry failed files
    Write-Host ""
    Write-Host "  Ponawiam nieudane pliki..." -ForegroundColor Yellow
    $retryErrors = 0
    foreach ($ef in $errorFiles) {
        $fullPath = Join-Path $outDir ($ef.Replace('/', '\'))
        $url = "ftp://${ftpHost}${remoteBase}/${ef}"
        Write-Host "  Retry: $ef" -NoNewline -ForegroundColor Cyan

        $null = & curl.exe -s -S --ssl-reqd --ftp-create-dirs --ftp-pasv -T $fullPath $url --user "${ftpUser}:${ftpPass}" --connect-timeout 30 --max-time 180 2>&1

        if ($LASTEXITCODE -eq 0) {
            Write-Host " OK" -ForegroundColor Green
        } else {
            Write-Host " FAIL" -ForegroundColor Red
            $retryErrors++
        }
    }

    if ($retryErrors -eq 0) {
        Write-Host "  Wszystkie pliki wyslane po retry!" -ForegroundColor Green
    } else {
        Write-Host "  Nadal $retryErrors plikow z bledami" -ForegroundColor Red
    }
}

# --- Podsumowanie ---
Write-Host ""
Write-Host "[4/4] Gotowe!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Magenta
Write-Host "  Strona: https://talukids.pl" -ForegroundColor Green
Write-Host "  Pliki lokalne: $localDir" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Magenta
Write-Host ""
