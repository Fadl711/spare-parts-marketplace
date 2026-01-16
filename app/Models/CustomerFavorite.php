<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerFavorite extends Model
{
    protected $fillable = [
        'customer_id',
        'part_id',
    ];

    /**
     * Get the customer that owns the favorite
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the part that is favorited
     */
    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}
