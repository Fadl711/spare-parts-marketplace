<?php

namespace App\Filament\Resources\StandardParts\Pages;

use App\Filament\Resources\StandardParts\StandardPartResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditStandardPart extends EditRecord
{
    protected static string $resource = StandardPartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
