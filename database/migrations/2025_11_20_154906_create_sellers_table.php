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
        Schema::create('sellers', function (Blueprint $table) {
            $table->id();
            $table->string('store_name', 150);
            $table->string('owner_name', 100);
            $table->string('phone', 20)->unique();
            $table->string('email', 100)->nullable()->unique();
            $table->string('city', 100);
            $table->string('district', 100)->nullable();
            $table->string('address', 255);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('store_logo_path', 255)->nullable();
            $table->string('whatsapp_link', 255)->nullable();
            $table->json('opening_hours')->nullable(); // ساعات العمل كـ JSON
            $table->date('subscription_end')->nullable();
            $table->string('password');
            $table->boolean('is_banned')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sellers');
    }
};
