<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('make')
                    ->label('الماركة')
                    ->required()
                    ->maxLength(100),
                TextInput::make('model')
                    ->label('الموديل')
                    ->required()
                    ->maxLength(100),
                TextInput::make('year_from')
                    ->label('من سنة')
                    ->required()
                    ->numeric()
                    ->minValue(1900)
                    ->maxValue(2030),
                TextInput::make('year_to')
                    ->label('إلى سنة')
                    ->required()
                    ->numeric()
                    ->minValue(1900)
                    ->maxValue(2030),
                Select::make('type')
                    ->label('النوع')
                    ->options([
                        'car' => 'سيارة',
                        'truck' => 'شاحنة',
                    ])
                    ->required(),
            ]);
    }
}
