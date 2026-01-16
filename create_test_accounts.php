<?php

/**
 * Create Test Customer Account
 * 
 * This script creates a test customer for the mobile app login testing
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Customer;

echo "Creating test customer...\n";

try {
    // Check if customer exists
    $customer = Customer::where('email', 'test@customer.com')->first();
    
    if ($customer) {
        echo "✅ Test customer already exists!\n";
        echo "Email: test@customer.com\n";
        echo "Password: password\n";
        echo "Name: {$customer->name}\n";
        echo "Phone: {$customer->phone}\n";
    } else {
        // Create new test customer
        $customer = Customer::create([
            'name' => 'عميل تجريبي',
            'email' => 'test@customer.com',
            'password' => bcrypt('password'),
            'phone' => '0777777777',
            'city' => 'صنعاء',
            'is_banned' => false,
        ]);
        
        echo "✅ Test customer created successfully!\n";
        echo "Email: test@customer.com\n";
        echo "Password: password\n";
        echo "Name: {$customer->name}\n";
        echo "Phone: {$customer->phone}\n";
    }
    
    // Also create a test seller
    echo "\nCreating test seller...\n";
    $seller = \App\Models\Seller::where('email', 'test@seller.com')->first();
    
    if ($seller) {
        echo "✅ Test seller already exists!\n";
        echo "Email: test@seller.com\n";
        echo "Password: password\n";
    } else {
        $seller = \App\Models\Seller::create([
            'store_name' => 'متجر تجريبي',
            'owner_name' => 'بائع تجريبي',
            'email' => 'test@seller.com',
            'password' => bcrypt('password'),
            'phone' => '0788888888',
            'city' => 'صنعاء',
            'district' => 'الحصبة',
            'address' => 'شارع تجريبي',
            'is_banned' => false,
        ]);
        
        echo "✅ Test seller created successfully!\n";
        echo "Email: test@seller.com\n";
        echo "Password: password\n";
    }
    
    echo "\n✅ All test accounts ready!\n";
    echo "\n📱 Use these credentials in the mobile app:\n";
    echo "Customer Login:\n";
    echo "  Email: test@customer.com\n";
    echo "  Password: password\n";
    echo "\nSeller Login:\n";
    echo "  Email: test@seller.com\n";
    echo "  Password: password\n";
    
} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString() . "\n";
}
