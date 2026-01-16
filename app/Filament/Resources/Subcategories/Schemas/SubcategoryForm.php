<?php

namespace App\Filament\Resources\Subcategories\Schemas;

use App\Models\Category;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SubcategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->label('الفئة الرئيسية')
                    ->options(Category::pluck('name_ar', 'id'))
                    ->required()
                    ->searchable(),
                TextInput::make('name_ar')
                    ->label('الاسم بالعربي')
                    ->required()
                    ->maxLength(100),
                TextInput::make('name_en')
                    ->label('الاسم بالانجليزي')
                    ->maxLength(100),
            ]);
    }
}
