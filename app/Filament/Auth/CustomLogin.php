<?php

namespace App\Filament\Auth;

// ✅ الاستدعاء الصحيح في الإصدارات الحديثة
use Filament\Auth\Pages\Login;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Component;

class CustomLogin extends Login
{
    // 1️⃣ دالة الفورم: لتغيير شكل الحقول فقط
    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                // نضع حقل اسم المستخدم بدلاً من الإيميل
                TextInput::make('username')
                    ->label(__('Username')) // لدعم الترجمة مستقبلاً
                    ->required()
                    ->autocomplete()
                    ->autofocus(),

                // نستدعي حقل الباسورد الجاهز من الكلاس الأب (Modern Way)
                $this->getPasswordFormComponent(),

                // نستدعي زر "تذكرني" الجاهز
                $this->getRememberFormComponent(),
            ])
            ->statePath('data');
    }

    // 2️⃣ دالة البيانات: لربط الحقل بقاعدة البيانات
    protected function getCredentialsFromFormData(array $data): array
    {
        return [
            // هنا السحر: نأخذ القيمة المدخلة ونبحث عنها في عمود username
            'username' => $data['username'],
            'password' => $data['password'],
        ];
    }
}
