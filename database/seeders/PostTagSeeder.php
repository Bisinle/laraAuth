<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;



class PostTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allTags = Tag::all();
        $allPosts = Post::all();

        foreach ($allPosts as $post) {
            $post->tags()->attach(
                $allTags->random(rand(1, 10))->pluck('id')->toArray()
            );
        }
    }
}
