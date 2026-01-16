<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SellerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'store_name' => $this->store_name,
            'owner_name' => $this->when($request->user()?->id === $this->id, $this->owner_name),
            'email' => $this->when($request->user()?->id === $this->id, $this->email),
            'phone' => $this->phone,
            'whatsapp' => $this->whatsapp_link,
            'location' => [
                'city' => $this->city,
                'district' => $this->district,
                'address' => $this->when($request->user()?->id === $this->id, $this->address),
            ],
            'rating' => 0.0, // Placeholder for future rating system
            'total_parts' => $this->whenCounted('parts'),
            'is_approved' => $this->when($request->user() instanceof \App\Models\Admin, $this->is_approved),
            'is_active' => $this->when($request->user() instanceof \App\Models\Admin, $this->is_active),
            'opening_hours' => $this->opening_hours ? json_decode($this->opening_hours, true) : null,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
