<?php

namespace App\Filament\Resources\Customers\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CustomersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                TextColumn::make('name')
                    ->label('الاسم')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('phone')
                    ->label('الجوال')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('البريد')
                    ->searchable(),
                TextColumn::make('city')
                    ->label('المدينة')
                    ->searchable(),
                IconColumn::make('is_banned')
                    ->label('محظور')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('تاريخ التسجيل')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                TernaryFilter::make('is_banned')
                    ->label('الحالة')
                    ->placeholder('الكل')
                    ->trueLabel('محظور')
                    ->falseLabel('نشط'),
                SelectFilter::make('city')
                    ->label('المدينة')
                    ->options(fn () => \App\Models\Customer::distinct()->pluck('city', 'city')->toArray()),
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
