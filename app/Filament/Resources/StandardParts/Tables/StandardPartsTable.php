<?php

namespace App\Filament\Resources\StandardParts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class StandardPartsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                TextColumn::make('subcategory.name_ar')
                    ->label('الفئة الفرعية')
                    ->sortable(),
                TextColumn::make('subcategory.category.name_ar')
                    ->label('الفئة الرئيسية')
                    ->sortable(),
                TextColumn::make('name_ar')
                    ->label('الاسم بالعربي')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name_en')
                    ->label('الاسم بالانجليزي')
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('subcategory_id')
                    ->label('الفئة الفرعية')
                    ->relationship('subcategory', 'name_ar'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
