<?php

namespace App\Filament\Resources\StandardParts\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class StandardPartForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('subcategory_id')
                    ->required()
                    ->numeric(),
                TextInput::make('name')
                    ->required(),
            ]);
    }
}
