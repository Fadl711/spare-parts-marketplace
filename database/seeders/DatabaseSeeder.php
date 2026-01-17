<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Image;
use App\Models\Part;
use App\Models\Seller;
use App\Models\StandardPart;
use App\Models\Subcategory;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        Admin::create([
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'is_active' => true,
        ]);

        // Create Test Customer
        \App\Models\Customer::create([
            'name' => 'Test Customer',
            'email' => 'test@customer.com',
            'phone' => '0777777777',
            'password' => Hash::make('password'),
            'city' => 'Sanaa',
        ]);

        // Create Test Seller
        \App\Models\Seller::create([
            'store_name' => 'Test Store',
            'owner_name' => 'Test Seller',
            'email' => 'test@seller.com',
            'phone' => '0788888888',
            'password' => Hash::make('password'),
            'city' => 'Sanaa',
            'district' => 'Test District',
            'address' => 'Test Address',
        ]);

        echo "Test users created:\n";
        echo "Customer: test@customer.com / password\n";
        echo "Seller: test@seller.com / password\n";
    }
}
