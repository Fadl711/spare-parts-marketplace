<?php

namespace App\Filament\Resources\Parts\Schemas;

use App\Models\Seller;
use App\Models\StandardPart;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PartForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('seller_id')
                    ->label('المتجر')
                    ->options(Seller::pluck('store_name', 'id'))
                    ->searchable()
                    ->required(),

                Select::make('standard_part_id')
                    ->label('القطعة المعيارية')
                    ->options(StandardPart::pluck('name_ar', 'id'))
                    ->searchable()
                    ->required(),

                TextInput::make('extra_name')
                    ->label('اسم إضافي')
                    ->maxLength(255),

                TextInput::make('price')
                    ->label('السعر')
                    ->numeric()
                    ->required()
                    ->prefix('ر.ي'),

                Select::make('status')
                    ->label('الحالة')
                    ->options([
                        'new' => 'جديد',
                        'used' => 'مستعمل',
                        'renewed' => 'مجدد',
                    ])
                    ->required(),

                Select::make('quality')
                    ->label('الجودة')
                    ->options([
                        'original' => 'أصلي',
                        'commercial' => 'تجاري',
                        'chinese' => 'صيني',
                        'other' => 'آخر',
                    ])
                    ->required(),

                Select::make('vehicles')
                    ->label('المركبات المتوافقة')
                    ->relationship('vehicles', 'model')
                    ->multiple()
                    ->searchable()
                    ->preload(),

                Textarea::make('description')
                    ->label('وصف القطعة')
                    ->rows(3)
                    ->maxLength(65535),
            ]);
    }
}
