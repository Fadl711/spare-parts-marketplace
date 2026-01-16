<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name_ar', 'name_en', 'image_url'];
    public $timestamps = false;

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }
}
