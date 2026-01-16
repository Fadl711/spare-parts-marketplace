@echo off
echo ======================================
echo   Quick Setup - Laqeetha App
echo ======================================
echo.

echo [1/3] Resetting database...
cd /d d:\laragon\www\spare-parts-marketplace
php artisan migrate:fresh --force
if %ERRORLEVEL% NEQ 0 (
    echo Database reset failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Creating test users...
echo.

:: Create test customer via API-like insert
php -r "require 'vendor/autoload.php'; $app = require 'bootstrap/app.php'; $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap(); try { \App\Models\Customer::create(['name' => 'Test Customer', 'email' => 'test@customer.com', 'phone' => '0777777777', 'password' => \Illuminate\Support\Facades\Hash::make('password'), 'city' => 'Sanaa', 'is_active' => true]); echo 'Customer created!'; } catch (Exception $e) { echo 'Customer might already exist or error: ' . $e->getMessage(); }"

echo.

:: Create test seller
php -r "require 'vendor/autoload.php'; $app = require 'bootstrap/app.php'; $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap(); try { \App\Models\Seller::create(['store_name' => 'Test Store', 'owner_name' => 'Test Seller', 'email' => 'test@seller.com', 'phone' => '0788888888', 'password' => \Illuminate\Support\Facades\Hash::make('password'), 'city' => 'Sanaa', 'district' => 'Test', 'address' => 'Test', 'is_approved' => true, 'is_active' => true]); echo 'Seller created!'; } catch (Exception $e) { echo 'Seller might already exist or error: ' . $e->getMessage(); }"

echo.
echo.
echo ======================================
echo   Setup Complete!
echo ======================================
echo.
echo Test Accounts:
echo   Customer: test@customer.com / password
echo   Seller: test@seller.com / password
echo.
echo [3/3] Servers are running:
echo   Backend: http://192.168.8.124:8080
echo   Frontend: Running in Expo
echo.
pause
