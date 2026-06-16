# Hook Cursor: deploy automático do CopyTube para GitHub
$Root = if ($env:CURSOR_PROJECT_DIR) { $env:CURSOR_PROJECT_DIR } else { (Get-Location).Path }
$Script = Join-Path $Root 'scripts\sync-and-deploy-copytube.ps1'
if (Test-Path $Script) {
    Start-Process powershell -ArgumentList '-ExecutionPolicy','Bypass','-WindowStyle','Hidden','-File',$Script -NoNewWindow
}
exit 0
