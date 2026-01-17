<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Seller extends Authenticatable implements FilamentUser, HasName
{
    use HasApiTokens, HasFactory, Notifiable;

    public function getFilamentName(): string
    {
        return $this->store_name ?? $this->owner_name ?? 'التاجر';
    }
    protected $guarded = [];
    protected $hidden = ['password'];

    protected $casts = [
        'opening_hours' => 'array', // تحويل الـ JSON تلقائياً لمصفوفة
        'subscription_end' => 'date',
    ];

    public function canAccessPanel(Panel $panel): bool
    {
        // يمكن لجميع البائعين الوصول لـ Seller Panel
        return $panel->getId() === 'seller';
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function parts()
    {
        return $this->hasMany(Part::class);
    }
}
