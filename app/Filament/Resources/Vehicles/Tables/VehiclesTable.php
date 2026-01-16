<?php

namespace App\Filament\Resources\Vehicles\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class VehiclesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                TextColumn::make('make')
                    ->label('الماركة')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('model')
                    ->label('الموديل')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('year_from')
                    ->label('من سنة')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('year_to')
                    ->label('إلى سنة')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('type')
                    ->label('النوع')
                    ->badge()
                    ->formatStateUsing(fn ($state) => $state === 'car' ? 'سيارة' : 'شاحنة'),
            ])
            ->filters([
                SelectFilter::make('type')
                    ->label('النوع')
                    ->options([
                        'car' => 'سيارة',
                        'truck' => 'شاحنة',
                    ]),
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
