<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== Checking test users ===\n\n";

// Check Customers
echo "CUSTOMERS:\n";
$customers = \App\Models\Customer::all();
if ($customers->count() > 0) {
    foreach ($customers as $customer) {
        echo "  - Email: {$customer->email}\n";
        echo "    Name: {$customer->name}\n";
        echo "    Phone: {$customer->phone}\n";
        echo "    Created: {$customer->created_at}\n\n";
    }
} else {
    echo "  No customers found!\n\n";
}

// Check Sellers
echo "SELLERS:\n";
$sellers = \App\Models\Seller::all();
if ($sellers->count() > 0) {
    foreach ($sellers as $seller) {
        echo "  - Email: {$seller->email}\n";
        echo "    Store: {$seller->store_name}\n";
        echo "    Phone: {$seller->phone}\n";
        echo "    Created: {$seller->created_at}\n\n";
    }
} else {
    echo "  No sellers found!\n\n";
}

echo "\n=== Creating test users if not exist ===\n\n";

// Create test customer if not exists
$testCustomer = \App\Models\Customer::where('email', 'test@customer.com')->first();
if (!$testCustomer) {
    $testCustomer = \App\Models\Customer::create([
        'name' => 'Test Customer',
        'email' => 'test@customer.com',
        'phone' => '0777777777',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'city' => 'Sana\'a',
        'is_active' => true,
    ]);
    echo "✓ Created test customer: test@customer.com / password\n";
} else {
    echo "✓ Test customer already exists: test@customer.com\n";
}

// Create test seller if not exists
$testSeller = \App\Models\Seller::where('email', 'test@seller.com')->first();
if (!$testSeller) {
    $testSeller = \App\Models\Seller::create([
        'store_name' => 'Test Store',
        'owner_name' => 'Test Seller',
        'email' => 'test@seller.com',
        'phone' => '0788888888',
        'password' => \Illuminate\Support\Facades\Hash::make('password'),
        'city' => 'Sana\'a',
        'district' => 'Test District',
        'address' => 'Test Address',
        'is_approved' => true,
        'is_active' => true,
    ]);
    echo "✓ Created test seller: test@seller.com / password\n";
} else {
    echo "✓ Test seller already exists: test@seller.com\n";
}

echo "\nDone!\n";
