<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StandardPart extends Model
{
    protected $fillable = ['subcategory_id', 'name_ar', 'name_en'];
    public $timestamps = false;

    public function subcategory()
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function parts()
    {
        return $this->hasMany(Part::class);
    }
}
