<?php

namespace App\Filament\Resources\Parts\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PartForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
            Select::make('seller_id')
                ->relationship('seller', 'store_name')
                ->searchable()
                ->preload()
                ->required()
                ->label('Seller Store (المتجر)'),

            Select::make('standard_part_id')
                ->relationship('standardPart', 'name')
                ->searchable()
                ->preload()
                ->required()
                ->label('Standard Part Name (الاسم الموحد)'),

            // 2. علاقة Many-to-Many مع المركبات (Vehicles)
            // ✅ هذا المكون يقوم بتحديث جدول part_vehicle تلقائياً
            Select::make('vehicles')
                ->relationship('vehicles', 'model') // اسم العلاقة واسم العمود المراد عرضه
                ->multiple() // تسمح باختيار عدة مركبات لنفس القطعة
                ->searchable()
                ->preload()
                ->label('Compatible Vehicles (المركبات المتوافقة)'),

            // 3. بيانات القطعة الأساسية
            TextInput::make('price')
                ->numeric()
                ->required()
                ->prefix('YER'), // العملة الافتراضية

            Select::make('status')
                ->options([
                    'new' => 'New (جديد)',
                    'used' => 'Used (مستعمل)',
                    'renewed' => 'Renewed (مجدد)',
                ])
                ->required(),

            Select::make('quality')
                ->options([
                    'original' => 'Original (أصلي)',
                    'commercial' => 'Commercial (تجاري)',
                    'chinese' => 'Chinese (صيني)',
                    'other' => 'Other (آخر)',
                ])
                ->required(),

            TextInput::make('extra_name')
                ->maxLength(255)
                ->nullable()
                ->label('Seller Specific Name'),

            Textarea::make('description')
                ->maxLength(65535)->columns(2), // تقسيم الحقول في عمودين
                ]);
    }
}
