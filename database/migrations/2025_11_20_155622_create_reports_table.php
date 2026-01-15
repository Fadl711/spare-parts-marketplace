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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reporter_id'); // ID الشخص المُبلغ
            $table->enum('reporter_type', ['customer', 'seller', 'admin']);
            $table->enum('reported_entity_type', ['seller', 'part', 'review', 'customer', 'message']);
            $table->unsignedBigInteger('reported_entity_id'); // ID الشيء المُبلغ عنه
            $table->text('reason');
            $table->enum('status', ['pending', 'in_review', 'resolved', 'closed'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
