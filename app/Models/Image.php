<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Mix;
use Mockery\Generator\StringManipulationGenerator;

class Image extends Model
{
    use HasFactory;
    // protected $fillable = ['url'];
    protected $fillable = ['url', 'imageable_type', 'imageable_id'];
    //^ polymorphic relationship
    public function imageable(): MorphTo
    {
        return $this->morphTo();
    }
}
