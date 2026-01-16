<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name_ar')
                    ->label('الاسم بالعربي')
                    ->required()
                    ->maxLength(100),
                TextInput::make('name_en')
                    ->label('الاسم بالانجليزي')
                    ->maxLength(100),
                FileUpload::make('image_url')
                    ->label('صورة الفئة')
                    ->image()
                    ->disk('public')
                    ->directory('categories')
                    ->nullable(),
            ]);
    }
}
