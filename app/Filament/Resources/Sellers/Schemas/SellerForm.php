<?php

namespace App\Filament\Resources\Sellers\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class SellerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('store_name')
                    ->label('اسم المتجر')
                    ->required()
                    ->maxLength(150),
                TextInput::make('owner_name')
                    ->label('اسم المالك')
                    ->required()
                    ->maxLength(100),
                TextInput::make('phone')
                    ->label('رقم الجوال')
                    ->tel()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(20),
                TextInput::make('email')
                    ->label('البريد الإلكتروني')
                    ->email()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100),
                TextInput::make('city')
                    ->label('المدينة')
                    ->required()
                    ->maxLength(100),
                TextInput::make('district')
                    ->label('المديرية')
                    ->maxLength(100),
                TextInput::make('address')
                    ->label('العنوان التفصيلي')
                    ->required()
                    ->maxLength(255),
                TextInput::make('whatsapp_link')
                    ->label('رابط الواتساب')
                    ->url()
                    ->maxLength(255),
                TextInput::make('latitude')
                    ->label('خط العرض')
                    ->numeric(),
                TextInput::make('longitude')
                    ->label('خط الطول')
                    ->numeric(),
                DatePicker::make('subscription_end')
                    ->label('تاريخ انتهاء الاشتراك'),
                Toggle::make('is_banned')
                    ->label('محظور')
                    ->default(false),
                TextInput::make('password')
                    ->label('كلمة المرور')
                    ->password()
                    ->dehydrateStateUsing(fn ($state) => $state ? Hash::make($state) : null)
                    ->dehydrated(fn ($state) => filled($state))
                    ->required(fn (string $operation): bool => $operation === 'create'),
            ]);
    }
}
