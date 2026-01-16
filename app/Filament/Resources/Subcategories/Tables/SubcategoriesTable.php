<?php

namespace App\Filament\Resources\Subcategories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SubcategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                TextColumn::make('category.name_ar')
                    ->label('الفئة الرئيسية')
                    ->sortable(),
                TextColumn::make('name_ar')
                    ->label('الاسم بالعربي')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name_en')
                    ->label('الاسم بالانجليزي')
                    ->searchable(),
                TextColumn::make('standard_parts_count')
                    ->label('القطع المعيارية')
                    ->counts('standardParts'),
            ])
            ->filters([
                SelectFilter::make('category_id')
                    ->label('الفئة')
                    ->relationship('category', 'name_ar'),
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
