<?php

namespace App\Filament\Resources\Parts\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class PartsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('#')
                    ->sortable(),
                TextColumn::make('seller.store_name')
                    ->label('المتجر')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('standardPart.name_ar')
                    ->label('القطعة')
                    ->searchable()
                    ->sortable()
                    ->wrap(),
                TextColumn::make('extra_name')
                    ->label('اسم إضافي')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('price')
                    ->label('السعر')
                    ->money('YER')
                    ->sortable(),
                TextColumn::make('status')
                    ->label('الحالة')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match($state) {
                        'new' => 'جديد',
                        'used' => 'مستعمل',
                        'renewed' => 'مجدد',
                        default => $state
                    })
                    ->color(fn ($state) => match($state) {
                        'new' => 'success',
                        'used' => 'warning',
                        'renewed' => 'info',
                        default => 'gray'
                    }),
                TextColumn::make('quality')
                    ->label('الجودة')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match($state) {
                        'original' => 'أصلي',
                        'commercial' => 'تجاري',
                        'chinese' => 'صيني',
                        'other' => 'آخر',
                        default => $state
                    }),
                TextColumn::make('created_at')
                    ->label('تاريخ الإضافة')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('الحالة')
                    ->options([
                        'new' => 'جديد',
                        'used' => 'مستعمل',
                        'renewed' => 'مجدد',
                    ]),
                SelectFilter::make('quality')
                    ->label('الجودة')
                    ->options([
                        'original' => 'أصلي',
                        'commercial' => 'تجاري',
                        'chinese' => 'صيني',
                        'other' => 'آخر',
                    ]),
                SelectFilter::make('seller_id')
                    ->label('المتجر')
                    ->relationship('seller', 'store_name'),
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
