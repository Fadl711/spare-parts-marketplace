<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Seller extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // 👈 استخدام الخاصية هنا
    protected $guarded = [];
    protected $hidden = ['password'];

    protected $casts = [
        'opening_hours' => 'array', // تحويل الـ JSON تلقائياً لمصفوفة
        'subscription_end' => 'date',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function parts()
    {
        return $this->hasMany(Part::class);
    }
}
