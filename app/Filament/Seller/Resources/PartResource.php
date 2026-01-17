<?php

namespace App\Filament\Seller\Resources;

use App\Filament\Seller\Resources\PartResource\Pages;
use App\Models\Part;
use App\Models\Category;
use App\Models\Vehicle;
use BackedEnum;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PartResource extends Resource
{
    protected static ?string $model = Part::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationLabel = 'المنتجات';

    protected static ?string $modelLabel = 'منتج';

    protected static ?string $pluralModelLabel = 'المنتجات';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('معلومات المنتج')
                    ->schema([
                        Forms\Components\TextInput::make('extra_name')
                            ->label('اسم إضافي (اختياري)')
                            ->maxLength(255),

                        Forms\Components\Select::make('standard_part_id')
                            ->label('نوع القطعة')
                            ->relationship('standardPart', 'name_ar')
                            ->required()
                            ->searchable()
                            ->preload(),

                        Forms\Components\TextInput::make('price')
                            ->label('السعر (ر.ي)')
                            ->required()
                            ->numeric()
                            ->prefix('₪')
                            ->minValue(0),

                        Forms\Components\Select::make('status')
                            ->label('الحالة')
                            ->options([
                                'new' => 'جديد',
                                'used' => 'مستعمل',
                                'renewed' => 'مجدد',
                            ])
                            ->required()
                            ->default('new'),

                        Forms\Components\Select::make('quality')
                            ->label('الجودة')
                            ->options([
                                'original' => 'أصلي (وكالة)',
                                'commercial' => 'تجاري',
                                'chinese' => 'صيني',
                                'other' => 'آخر',
                            ])
                            ->required()
                            ->default('original'),

                        Forms\Components\Textarea::make('description')
                            ->label('الوصف')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('التوافق')
                    ->schema([
                        Forms\Components\Select::make('vehicles')
                            ->label('السيارات المتوافقة')
                            ->relationship('vehicles', 'model')
                            ->multiple()
                            ->searchable()
                            ->preload()
                            ->getOptionLabelFromRecordUsing(fn($record) => "{$record->make} {$record->model} ({$record->year_from}-{$record->year_to})")
                            ->required(),
                    ]),

                Section::make('الصور')
                    ->schema([
                        Forms\Components\FileUpload::make('images_upload')
                            ->label('صور المنتج')
                            ->image()
                            ->multiple()
                            ->maxFiles(5)
                            ->directory('parts')
                            ->imageEditor()
                            ->dehydrated(false)
                            ->afterStateHydrated(function (Forms\Components\FileUpload $component, $record) {
                                if ($record) {
                                    $component->state($record->images->pluck('image_path')->toArray());
                                }
                            })
                            ->helperText('يمكنك رفع حتى 5 صور'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images.image_path')
                    ->label('الصورة')
                    ->circular()
                    ->disk('public')
                    ->limit(1)
                    ->defaultImageUrl(url('/images/placeholder.png')),

                Tables\Columns\TextColumn::make('standardPart.name_ar')
                    ->label('القطعة')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('extra_name')
                    ->label('اسم إضافي')
                    ->searchable()
                    ->sortable()
                    ->limit(20),

                Tables\Columns\TextColumn::make('price')
                    ->label('السعر')
                    ->money('YER')
                    ->sortable(),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('الحالة')
                    ->colors([
                        'success' => 'new',
                        'warning' => 'used',
                        'danger' => 'renewed',
                    ])
                    ->formatStateUsing(fn($state) => match ($state) {
                        'new' => 'جديد',
                        'used' => 'مستعمل',
                        'renewed' => 'مجدد',
                        default => $state,
                    }),

                Tables\Columns\BadgeColumn::make('quality')
                    ->label('الجودة')
                    ->colors([
                        'success' => 'original',
                        'primary' => 'commercial',
                        'warning' => 'chinese',
                        'secondary' => 'other',
                    ])
                    ->formatStateUsing(fn($state) => match ($state) {
                        'original' => 'أصلي',
                        'commercial' => 'تجاري',
                        'chinese' => 'صيني',
                        'other' => 'آخر',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإضافة')
                    ->dateTime('Y-m-d')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('standardPart')
                    ->relationship('standardPart', 'name_ar')
                    ->label('نوع القطعة')
                    ->searchable()
                    ->preload(),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'جديد',
                        'used' => 'مستعمل',
                        'renewed' => 'مجدد',
                    ])
                    ->label('الحالة'),

                Tables\Filters\SelectFilter::make('quality')
                    ->options([
                        'original' => 'أصلي',
                        'commercial' => 'تجاري',
                        'chinese' => 'صيني',
                        'other' => 'آخر',
                    ])
                    ->label('الجودة'),
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where('seller_id', Auth::guard('seller_web')->id());
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListParts::route('/'),
            'create' => Pages\CreatePart::route('/create'),
            'edit' => Pages\EditPart::route('/{record}/edit'),
        ];
    }
}
