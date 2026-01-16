<?php

namespace App\Filament\Resources\Customers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class CustomerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('الاسم')
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
                TextInput::make('latitude')
                    ->label('خط العرض')
                    ->numeric(),
                TextInput::make('longitude')
                    ->label('خط الطول')
                    ->numeric(),
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
