# Baixa o vídeo de fundo do YouTube para public/bg-video.mp4 (sem player/embed)
$yt = "$env:TEMP\yt-dlp.exe"
if (-not (Test-Path $yt)) {
  Invoke-WebRequest -Uri "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe" -OutFile $yt
}
$out = Join-Path $PSScriptRoot "..\public\bg-video.%(ext)s"
& $yt -f "136/779/best[height<=1080]" -o $out --force-overwrites "https://www.youtube.com/watch?v=Q8KfV7jd8s8"
Write-Host "OK: public/bg-video.mp4"
