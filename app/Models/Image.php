<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Mix;
use Mockery\Generator\StringManipulationGenerator;

class Image extends Model
{
    use HasFactory;
    //^ polymorphic relationship
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, "imageable");
    }
}
