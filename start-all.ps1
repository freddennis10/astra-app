# Astra Multi-Platform Startup Script
Write-Host "🚀 Starting Astra Multi-Platform Application..." -ForegroundColor Green

# Start Backend Server
Write-Host "📡 Starting Backend Server..." -ForegroundColor Blue
Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd backend; npm run dev" -WindowStyle Normal

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend React App
Write-Host "🌐 Starting Frontend React App..." -ForegroundColor Blue
Start-Process -FilePath "powershell" -ArgumentList "-Command", "npm start" -WindowStyle Normal

# Start Mobile App (React Native)
Write-Host "📱 Starting Mobile App (React Native)..." -ForegroundColor Blue
Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd mobile; npm start" -WindowStyle Normal

# Start Desktop App (Electron)
Write-Host "💻 Starting Desktop App (Electron)..." -ForegroundColor Blue
Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd desktop; npm start" -WindowStyle Normal

Write-Host "✅ All platforms started successfully!" -ForegroundColor Green
Write-Host "🌐 Web App: http://localhost:3001" -ForegroundColor Yellow
Write-Host "📡 Backend API: http://localhost:5000" -ForegroundColor Yellow
Write-Host "📚 API Docs: http://localhost:5000/api-docs" -ForegroundColor Yellow
Write-Host "🏥 Health Check: http://localhost:5000/health" -ForegroundColor Yellow

Read-Host "Press Enter to exit..."
