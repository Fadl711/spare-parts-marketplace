<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Seller;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;

echo "=== Creating test users ===\n\n";

// Create test customer
$customerEmail = 'test@customer.com';
$customer = Customer::where('email', $customerEmail)->first();

if ($customer) {
    echo "✓ Customer exists: {$customerEmail}\n";
    $customer->password = Hash::make('password');
    $customer->save();
    echo "  Password reset to: password\n";
} else {
    Customer::create([
        'name' => 'Test Customer',
        'email' => $customerEmail,
        'phone' => '0777777777',
        'password' => Hash::make('password'),
        'city' => 'Sanaa',
        'is_active' => true,
    ]);
    echo "✓ Created customer: {$customerEmail}\n";
}

// Create test seller
$sellerEmail = 'test@seller.com';
$seller = Seller::where('email', $sellerEmail)->first();

if ($seller) {
    echo "\n✓ Seller exists: {$sellerEmail}\n";
    $seller->password = Hash::make('password');
    $seller->is_approved = true;
    $seller->is_active = true;
    $seller->save();
    echo "  Password reset to: password\n";
    echo "  Status: approved and active\n";
} else {
    Seller::create([
        'store_name' => 'Test Store',
        'owner_name' => 'Test Seller',
        'email' => $sellerEmail,
        'phone' => '0788888888',
        'password' => Hash::make('password'),
        'city' => 'Sanaa',
        'district' => 'Test District',
        'address' => 'Test Address',
        'is_approved' => true,
        'is_active' => true,
    ]);
    echo "\n✓ Created seller: {$sellerEmail}\n";
}

echo "\n=== Login Credentials ===\n";
echo "Customer: test@customer.com / password\n";
echo "Seller: test@seller.com / password\n";
echo "\nDone!\n";
