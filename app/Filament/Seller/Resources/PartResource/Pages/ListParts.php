<?php

namespace App\Filament\Seller\Resources\PartResource\Pages;

use App\Filament\Seller\Resources\PartResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListParts extends ListRecords
{
    protected static string $resource = PartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
