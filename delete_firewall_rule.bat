@echo off 
if not "%1"=="am_admin" (
    powershell -Command "Start-Process -Verb RunAs -FilePath '%0' -ArgumentList 'am_admin'"
    exit /b
)

echo Deleting firewall rule...
@echo off 
powershell Remove-NetFirewallRule -Name 'Block Bad CS2 Servers' && powershell echo 'Successfully deleted firewall rule.'
pause 