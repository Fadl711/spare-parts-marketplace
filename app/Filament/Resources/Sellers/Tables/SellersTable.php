<?php

namespace App\Filament\Resources\Sellers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class SellersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                ImageColumn::make('store_logo_path')
                    ->label('الشعار')
                    ->circular(),
                TextColumn::make('store_name')
                    ->label('اسم المتجر')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('owner_name')
                    ->label('اسم المالك')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('الجوال')
                    ->searchable(),
                TextColumn::make('city')
                    ->label('المدينة')
                    ->searchable(),
                TextColumn::make('subscription_end')
                    ->label('انتهاء الاشتراك')
                    ->date()
                    ->sortable(),
                IconColumn::make('is_banned')
                    ->label('محظور')
                    ->boolean(),
                TextColumn::make('parts_count')
                    ->label('القطع')
                    ->counts('parts'),
                TextColumn::make('created_at')
                    ->label('تاريخ التسجيل')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_banned')
                    ->label('الحالة')
                    ->placeholder('الكل')
                    ->trueLabel('محظور')
                    ->falseLabel('نشط'),
                SelectFilter::make('city')
                    ->label('المدينة')
                    ->options(fn () => \App\Models\Seller::distinct()->pluck('city', 'city')->toArray()),
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
