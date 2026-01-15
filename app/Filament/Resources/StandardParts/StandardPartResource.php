<?php

namespace App\Filament\Resources\StandardParts;

use App\Filament\Resources\StandardParts\Pages\CreateStandardPart;
use App\Filament\Resources\StandardParts\Pages\EditStandardPart;
use App\Filament\Resources\StandardParts\Pages\ListStandardParts;
use App\Filament\Resources\StandardParts\Schemas\StandardPartForm;
use App\Filament\Resources\StandardParts\Tables\StandardPartsTable;
use App\Models\StandardPart;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StandardPartResource extends Resource
{
    protected static ?string $model = StandardPart::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return StandardPartForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StandardPartsTable::configure($table);
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
            'index' => ListStandardParts::route('/'),
            'create' => CreateStandardPart::route('/create'),
            'edit' => EditStandardPart::route('/{record}/edit'),
        ];
    }
}
