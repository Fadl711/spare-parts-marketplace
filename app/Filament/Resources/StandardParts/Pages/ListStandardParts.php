<?php

namespace App\Filament\Resources\StandardParts\Pages;

use App\Filament\Resources\StandardParts\StandardPartResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStandardParts extends ListRecords
{
    protected static string $resource = StandardPartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
