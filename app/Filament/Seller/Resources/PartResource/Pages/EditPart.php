<?php

namespace App\Filament\Seller\Resources\PartResource\Pages;

use App\Filament\Seller\Resources\PartResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPart extends EditRecord
{
    protected static string $resource = PartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        $data = $this->form->getRawState();
        $record = $this->record;

        if (isset($data['images_upload']) && is_array($data['images_upload'])) {
            // مسح الصور القديمة (اختياري، يفضل مزامنة الفرق)
            // هنا سنقوم بمسح الصور القديمة وإضافة الجديدة للتبسيط
            $record->images()->delete();

            foreach ($data['images_upload'] as $path) {
                $record->images()->create([
                    'image_path' => $path,
                ]);
            }
        }
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
