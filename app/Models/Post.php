<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Post extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    //^ post user rlsh------------------------------------------>
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //^ post tags rlsh------------------------------------------>

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tag');
    }

    //^ post comments rlsh------------------------------------------>

    public function comments()
    {

        return $this->hasMany(Comment::class);
    }
    //* post image polymorphic rlsh------------------------------------------>
    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($post) {
            $post->tags()->detach();
        });
    }
    protected $fillable = [
        "title",
        "description",
        'category_id',
        'user_id',
    ];
}
