@echo off
setlocal

:: Define custom registry path and key
set regKey=HKCU\Software\DisplaySwitcher
set regValue=Mode

:: Get current mode from registry
for /f "tokens=3" %%a in ('reg query "%regKey%" /v %regValue% 2^>nul') do set mode=%%a

:: Toggle between Extend (2) and Second screen only (4)
if "%mode%"=="0x2" (
    start "" "ClickMonitorDDC_7_2.exe" d 2 s HDMI1

    echo Switching to Second Screen Only...
    DisplaySwitch.exe /external
    reg add "%regKey%" /v %regValue% /t REG_DWORD /d 4 /f >nul

    @REM timeout /t 20 /nobreak >nul
    @REM taskkill /im ClickMonitorDDC_7_2.exe /f
) else (
    echo Switching to Extend Display...
    DisplaySwitch.exe /extend
    reg add "%regKey%" /v %regValue% /t REG_DWORD /d 2 /f >nul

    start "" "ClickMonitorDDC_7_2.exe" d 2 s DISPLAYPORT1
    timeout /t 20 /nobreak >nul
    taskkill /im ClickMonitorDDC_7_2.exe /f
)

endlocal
