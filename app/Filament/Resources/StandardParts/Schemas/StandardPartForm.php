<?php

namespace App\Filament\Resources\StandardParts\Schemas;

use App\Models\Subcategory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class StandardPartForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('subcategory_id')
                    ->label('الفئة الفرعية')
                    ->options(Subcategory::pluck('name_ar', 'id'))
                    ->required()
                    ->searchable(),
                TextInput::make('name_ar')
                    ->label('الاسم بالعربي')
                    ->required()
                    ->maxLength(150),
                TextInput::make('name_en')
                    ->label('الاسم بالانجليزي')
                    ->maxLength(150),
            ]);
    }
}
