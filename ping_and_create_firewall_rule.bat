@echo off
if not "%1"=="am_admin" (
    powershell -Command "Start-Process -Verb RunAs -FilePath '%0' -ArgumentList 'am_admin'"
    exit /b
)

@echo off 
pushd "%~dp0"
node ping && powershell echo 'Creating firewall rule to ban bad servers...' && powershell New-NetFirewallRule -DisplayName 'Block Bad CS2 Servers' -Name 'Block Bad CS2 Servers' -Direction Outbound -RemoteAddress (Get-Content servers_to_ban.txt) -Protocol Any -Action Block && powershell echo 'Successfully created firewall rule.'
pause 