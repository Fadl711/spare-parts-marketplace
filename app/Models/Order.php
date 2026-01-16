<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'seller_id',
        'part_id',
        'total_price',
        'status',
        'delivery_city',
        'delivery_district',
        'delivery_address',
        'customer_phone',
        'notes',
    ];

    /**
     * Get the customer that placed the order
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the seller for this order
     */
    public function seller(): BelongsTo
    {
        return $this->belongsTo(Seller::class);
    }

    /**
     * Get the part being ordered
     */
    public function part(): BelongsTo
    {
        return $this->belongsTo(Part::class);
    }
}
