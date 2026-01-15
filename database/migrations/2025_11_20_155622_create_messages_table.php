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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained('conversations')->onDelete('cascade');
            $table->unsignedBigInteger('sender_id'); // ID المرسل
            $table->enum('sender_type', ['customer', 'seller']); // نوع المرسل
            $table->text('message_text')->nullable();
            $table->enum('message_type', ['text', 'image', 'location'])->default('text');
            $table->string('attachment_path', 255)->nullable();
            $table->timestamp('read_at')->nullable(); // هل تمت القراءة؟
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
