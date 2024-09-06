<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {



        //create posts using the user and category id's
        for ($i = 0; $i < 100; $i++) {

            Post::create([
                "title" => fake()->sentence(6, true),
                'description' => fake()->paragraph(3, true),
                "category_id" => Category::inRandomOrder()->value('id'),
                "user_id" => User::inRandomOrder()->value('id'),

            ]);
        }
        //
    }
}
