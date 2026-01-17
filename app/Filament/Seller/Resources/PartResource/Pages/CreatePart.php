<?php

namespace App\Filament\Seller\Resources\PartResource\Pages;

use App\Filament\Seller\Resources\PartResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreatePart extends CreateRecord
{
    protected static string $resource = PartResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // إضافة seller_id تلقائياً
        $data['seller_id'] = Auth::guard('seller_web')->id();

        return $data;
    }

    protected function afterCreate(): void
    {
        $data = $this->form->getRawState();
        $record = $this->record;

        if (isset($data['images_upload']) && is_array($data['images_upload'])) {
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
