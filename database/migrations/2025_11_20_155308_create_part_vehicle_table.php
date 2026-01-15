<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('part_vehicle', function (Blueprint $table) {
            $table->foreignId('part_id')->constrained('parts')->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');

            // المفتاح الأساسي مركب لمنع تكرار ربط نفس القطعة بنفس السيارة مرتين
            $table->primary(['part_id', 'vehicle_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('part_vehicle');
    }
};
