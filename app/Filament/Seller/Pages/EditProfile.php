<?php

namespace App\Filament\Seller\Pages;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Component;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Auth\Pages\EditProfile as BaseEditProfile;
use Filament\Support\Exceptions\Halt;
use Illuminate\Support\Facades\Hash;

class EditProfile extends BaseEditProfile
{
    public function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('معلومات المتجر')
                    ->description('قم بتحديث معلومات متجرك الأساسية')
                    ->schema([
                        TextInput::make('store_name')
                            ->label('اسم المتجر')
                            ->required()
                            ->maxLength(150),

                        TextInput::make('owner_name')
                            ->label('اسم المالك')
                            ->required()
                            ->maxLength(100),

                        FileUpload::make('store_logo_path')
                            ->label('شعار المتجر')
                            ->image()
                            ->disk('public')
                            ->directory('store-logos')
                            ->imageEditor()
                            ->circleCropper()
                            ->helperText('يفضل أن تكون الصورة مربعة (500x500 بكسل)'),
                    ])
                    ->columns(2),

                Section::make('معلومات الاتصال')
                    ->description('معلومات التواصل مع العملاء')
                    ->schema([
                        TextInput::make('phone')
                            ->label('رقم الهاتف')
                            ->tel()
                            ->required()
                            ->maxLength(20)
                            ->unique(ignoreRecord: true),

                        TextInput::make('email')
                            ->label('البريد الإلكتروني')
                            ->email()
                            ->maxLength(100)
                            ->unique(ignoreRecord: true),

                        TextInput::make('whatsapp_link')
                            ->label('رابط واتساب')
                            ->url()
                            ->prefix('https://')
                            ->placeholder('wa.me/967xxxxxxxxx')
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Section::make('الموقع')
                    ->description('عنوان المتجر والموقع الجغرافي')
                    ->schema([
                        TextInput::make('city')
                            ->label('المدينة')
                            ->required()
                            ->maxLength(100),

                        TextInput::make('district')
                            ->label('الحي')
                            ->maxLength(100),

                        Textarea::make('address')
                            ->label('العنوان التفصيلي')
                            ->required()
                            ->rows(3)
                            ->maxLength(255)
                            ->columnSpanFull(),

                        TextInput::make('latitude')
                            ->label('خط العرض (Latitude)')
                            ->numeric()
                            ->step(0.00000001)
                            ->placeholder('15.369445')
                            ->helperText('اختياري - للظهور على الخريطة'),

                        TextInput::make('longitude')
                            ->label('خط الطول (Longitude)')
                            ->numeric()
                            ->step(0.00000001)
                            ->placeholder('44.191006')
                            ->helperText('اختياري - للظهور على الخريطة'),
                    ])
                    ->columns(2),

                Section::make('ساعات العمل')
                    ->description('حدد أوقات عمل متجرك')
                    ->schema([
                        Repeater::make('opening_hours')
                            ->label('أوقات العمل')
                            ->schema([
                                TextInput::make('day')
                                    ->label('اليوم')
                                    ->required()
                                    ->placeholder('السبت'),

                                TextInput::make('open')
                                    ->label('وقت الفتح')
                                    ->placeholder('08:00 ص')
                                    ->required(),

                                TextInput::make('close')
                                    ->label('وقت الإغلاق')
                                    ->placeholder('10:00 م')
                                    ->required(),
                            ])
                            ->columns(3)
                            ->defaultItems(0)
                            ->addActionLabel('إضافة يوم عمل')
                            ->collapsible()
                            ->columnSpanFull(),
                    ]),

                Section::make('الاشتراك')
                    ->description('معلومات اشتراكك الحالي')
                    ->schema([
                        TextInput::make('subscription_end')
                            ->label('تاريخ انتهاء الاشتراك')
                            ->disabled()
                            ->dehydrated(false)
                            ->default(fn($record) => $record?->subscription_end?->format('Y-m-d') ?? 'غير محدد')
                            ->helperText('للتجديد، يرجى التواصل مع الإدارة'),
                    ])
                    ->columns(1),

                Section::make('تغيير كلمة المرور')
                    ->description('اترك الحقول فارغة إذا كنت لا تريد تغيير كلمة المرور')
                    ->schema([
                        TextInput::make('current_password')
                            ->label('كلمة المرور الحالية')
                            ->password()
                            ->revealable()
                            ->dehydrated(false)
                            ->required(fn($get) => filled($get('password'))),

                        TextInput::make('password')
                            ->label('كلمة المرور الجديدة')
                            ->password()
                            ->revealable()
                            ->dehydrated(fn($state) => filled($state))
                            ->confirmed()
                            ->minLength(8),

                        TextInput::make('password_confirmation')
                            ->label('تأكيد كلمة المرور الجديدة')
                            ->password()
                            ->revealable()
                            ->dehydrated(false),
                    ])
                    ->columns(2),
            ]);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // التحقق من كلمة المرور الحالية إذا كان المستخدم يريد تغييرها
        if (filled($data['current_password'] ?? null)) {
            if (!Hash::check($data['current_password'], $this->getUser()->password)) {
                \Filament\Notifications\Notification::make()
                    ->danger()
                    ->title('كلمة المرور الحالية غير صحيحة')
                    ->send();

                throw new Halt();
            }
        }

        // إزالة الحقول غير المطلوبة
        unset($data['current_password']);
        unset($data['password_confirmation']);

        // تشفير كلمة المرور الجديدة إذا تم إدخالها
        if (filled($data['password'] ?? null)) {
            $data['password'] = Hash::make($data['password']);
        }

        return $data;
    }
}
