<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['part_id', 'image_path'];
    public $timestamps = false;

    public function part()
    {
        return $this->belongsTo(Part::class);
    }
}
