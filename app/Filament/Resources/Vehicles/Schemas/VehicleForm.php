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
                TextInput::make('brand')
                    ->required(),
                TextInput::make('model')
                    ->required(),
                TextInput::make('year_from')
                    ->required()
                    ->numeric(),
                TextInput::make('year_to')
                    ->required()
                    ->numeric(),
                Select::make('type')
                    ->options(['car' => 'Car', 'truck' => 'Truck'])
                    ->required(),
            ]);
    }
}
