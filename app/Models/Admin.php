<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\HasName as FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = "admins";
    protected $fillable = [
        'username',
        'password',
        'role',
        'is_active'
    ];

    // 1️⃣ دالة الصلاحية (التي يجب أن يراها Filament)
    public function canAccessPanel(Panel $panel): bool
    {
        // بما أن هذا هو مودل الأدمن، نجعله يعيد true ليتمكن من الدخول
        // يمكنك تعديلها لاحقاً لـ return $this->role === 'super_admin';
        return true;
    }

    // 2️⃣ دالة الاسم المعروض (حل مشكلة الـ NULL)
    public function getFilamentName(): string
    {
        return $this->getAttributeValue('username');
    }

}
