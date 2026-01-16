<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

echo "=== Creating test customer ===\n\n";

$email = 'test@customer.com';
$password = 'password';

// Check if exists
$customer = Customer::where('email', $email)->first();

if ($customer) {
    echo "✓ Customer already exists!\n";
    echo "  Email: {$email}\n";
    echo "  Name: {$customer->name}\n";

    // Update password to be sure
    $customer->password = Hash::make($password);
    $customer->save();
    echo "  ✓ Password updated to: {$password}\n";
} else {
    // Create new
    $customer = Customer::create([
        'name' => 'Test Customer',
        'email' => $email,
        'phone' => '0777777777',
        'password' => Hash::make($password),
        'city' => 'Sanaa',
        'is_active' => true,
    ]);
    echo "✓ Created new customer!\n";
    echo "  Email: {$email}\n";
    echo "  Password: {$password}\n";
}

echo "\n=== You can now login with ===\n";
echo "Email: {$email}\n";
echo "Password: {$password}\n";
