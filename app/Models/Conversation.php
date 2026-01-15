<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $guarded = [];
    protected $casts = ['last_message_at' => 'datetime'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
