<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // 👈 استخدام الخاصية هنا
    protected $guarded = [];
    protected $hidden = ['password'];

    public function favoriteParts()
    {
        return $this->belongsToMany(Part::class, 'customer_favorites');
    }
}
