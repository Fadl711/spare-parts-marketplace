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
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('seller_id')->constrained('sellers')->onDelete('cascade');
            $table->foreignId('standard_part_id')->constrained('standard_parts')->onDelete('cascade');
            $table->decimal('price', 10, 2);
            $table->enum('status', ['new', 'used', 'renewed']); // جديد، مستعمل، مجدد
            $table->enum('quality', ['original', 'commercial', 'chinese', 'other']); // أصلي، تجاري...
            $table->string('extra_name', 255)->nullable(); // اسم إضافي
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
