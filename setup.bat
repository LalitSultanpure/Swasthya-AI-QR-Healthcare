@echo off
REM Quick Start Script for Swasthya AI Frontend

echo.
echo ================================
echo Swasthya AI - Frontend Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo [OK] npm version:
npm --version
echo.

REM Install dependencies
echo [RUNNING] Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo [OK] Dependencies installed successfully!
    echo.
    echo [NEXT] To start the development server, run:
    echo        npm run dev
    echo.
    echo [INFO] Other available commands:
    echo        npm run build    - Build for production
    echo        npm run preview  - Preview production build
    echo        npm run lint     - Check code quality
    echo.
) else (
    echo [X] Failed to install dependencies
    pause
    exit /b 1
)

pause
