@echo off
chcp 65001 >nul
echo 🚀 Iniciando Elite Designer...
echo.

echo 🔧 Passo 1: Parando processos Node anteriores...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo ✅ Processos parados!
echo.

echo 🔧 Passo 2: Iniciando Backend (porta 3001)...
start "Backend - Elite Designer" cmd /k "cd /d %~dp0 && npm run server:mock"

echo ⏳ Aguardando backend inicializar...
timeout /t 3 >nul

echo 🔧 Passo 3: Criando usuário admin...
node server/create-admin.js

echo.
echo 🔧 Passo 4: Iniciando Frontend (porta 5173)...
start "Frontend - Elite Designer" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ✅ Tudo iniciado!
echo.
echo 🌐 Acesse:
echo    - Site:      http://localhost:5173
echo    - Dashboard: http://localhost:5173/admin
echo    - API:       http://localhost:3001/api/health
echo.
echo 👤 Login: admin / admin123
echo.
pause
