<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $guarded = [];

    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
