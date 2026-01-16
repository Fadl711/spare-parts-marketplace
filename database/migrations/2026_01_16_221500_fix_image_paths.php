<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update image paths to match actual files in storage
        // This fixes the issue where image_path was stored as simple filename
        // but actual files have unique names

        DB::table('images')->where('part_id', 1)->update([
            ['image_path' => '01KF407FPW7FY8635QT8YNQPC5.png']
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to original paths if needed
        DB::table('images')->where('part_id', 1)->update([
            ['image_path' => 'img1.jpg']
        ]);
    }
};
