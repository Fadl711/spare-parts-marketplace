<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->standardPart
                ? ($this->standardPart->name_ar ?? $this->standardPart->name_en)
                : $this->extra_name,
            'price' => (float) $this->price,
            'currency' => 'YER',
            'status' => $this->status,
            'quality' => $this->quality,
            'description' => $this->description,
            'extra_name' => $this->extra_name,
            'images' => $this->whenLoaded('images', function () {
                return $this->images->map(function ($image) {
                    $normalizedPath = str_replace('\\', '/', $image->image_path);
                    $filename = basename($normalizedPath);
                    $imageUrl = url('images-proxy/parts/' . $filename);

                    return [
                        'id' => $image->id,
                        'url' => $imageUrl,
                        'thumbnail' => $imageUrl, // Could add thumbnail logic
                    ];
                });
            }),
            'seller' => $this->whenLoaded('seller', function () {
                return new SellerResource($this->seller);
            }),
            'standard_part' => $this->whenLoaded('standardPart', function () {
                return [
                    'id' => $this->standardPart->id,
                    'name_ar' => $this->standardPart->name_ar,
                    'name_en' => $this->standardPart->name_en,
                    'subcategory' => $this->standardPart->whenLoaded('subcategory', function () {
                        return [
                            'id' => $this->standardPart->subcategory->id,
                            'name_ar' => $this->standardPart->subcategory->name_ar,
                            'name_en' => $this->standardPart->subcategory->name_en,
                        ];
                    }),
                ];
            }),
            'vehicles' => $this->whenLoaded('vehicles', function () {
                return $this->vehicles->map(function ($vehicle) {
                    return [
                        'id' => $vehicle->id,
                        'make' => $vehicle->make,
                        'model' => $vehicle->model,
                        'year_from' => $vehicle->year_from,
                        'year_to' => $vehicle->year_to,
                    ];
                });
            }),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
