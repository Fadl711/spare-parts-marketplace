<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $guarded = [];

    // القطعة تتبع بائع واحد
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    // القطعة لها اسم موحد واحد
    public function standardPart()
    {
        return $this->belongsTo(StandardPart::class);
    }

    // علاقات إضافية للوصول للفئات بسهولة
    public function subcategory()
    {
        return $this->standardPart ? $this->standardPart->subcategory() : null;
    }

    public function category()
    {
        return $this->subcategory() ? $this->subcategory()->category() : null;
    }

    // القطعة لها صور متعددة
    public function images()
    {
        return $this->hasMany(Image::class);
    }

    // القطعة قد تركب على أكثر من سيارة (أهم علاقة)
    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class, 'part_vehicle');
    }
}
