<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = ['brand', 'model', 'year_from', 'year_to', 'type'];
    public $timestamps = false;

    public function parts()
    {
        return $this->belongsToMany(Part::class, 'part_vehicle');
    }
}
