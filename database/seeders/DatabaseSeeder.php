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
                Admin::create([
            'username' => 'admin',
            'password' => Hash::make('password'),
            'role' => 'super_admin',
            'is_active' => true,
        ]);
        // 1. Create Seller
        $seller = Seller::create([
            'store_name' => 'Al-Amal Parts',
            'owner_name' => 'Khalid',
            'phone' => '96650000000',
            'email' => 'seller@example.com',
            'city' => 'Riyadh',
            'district' => 'Malaz',
            'address' => 'King Fahd Road',
            'password' => Hash::make('password'),
            'opening_hours' => json_encode(['sat' => '9-5']),
        ]);

        // 2. Create Vehicle
        $vehicle = Vehicle::create([
            'make' => 'Toyota',
            'model' => 'Camry',
            'year_from' => 2018,
            'year_to' => 2024,
            'type' => 'car',
        ]);

        // 3. Create Category
        $category = Category::create([
            'name_ar' => 'Body',
            'name_en' => 'Body',
            'image_url' => 'body.jpg'
        ]);

        // 4. Create Subcategory
        $subcategory = Subcategory::create([
            'category_id' => $category->id,
            'name_ar' => 'Bumpers',
            'name_en' => 'Bumpers',
        ]);

        // 5. Create Standard Part
        $standardPart = StandardPart::create([
            'subcategory_id' => $subcategory->id,
            'name_ar' => 'Front Bumper',
            'name_en' => 'Front Bumper',
        ]);

        // 6. Create Part (فقط الأعمدة الموجودة فعليًا)
        $part = Part::create([
            'seller_id' => $seller->id,
            'standard_part_id' => $standardPart->id,
            'price' => 500,
            'status' => 'used',
            'quality' => 'original',
        ]);

        // 7. Link Part to Vehicle
        DB::table('part_vehicle')->insert([
            'part_id' => $part->id,
            'vehicle_id' => $vehicle->id,
        ]);

        // 8. Create Images
        Image::create([
            'part_id' => $part->id,
            'image_path' => 'img1.jpg'
        ]);

        Image::create([
            'part_id' => $part->id,
            'image_path' => 'img2.jpg'
        ]);

        // 9. Guarantee Part with ID = 1 exists
        Part::updateOrCreate(
            ['id' => 1],
            [
                'seller_id' => $seller->id,
                'standard_part_id' => $standardPart->id,
                'price' => 999,
                'status' => 'new',
                'quality' => 'original'
            ]
        );
    }
}
