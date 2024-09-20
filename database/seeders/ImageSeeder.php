<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create images for all users
        User::all()->each(function ($user) {
            Image::create([
                'url' => fake()->imageUrl(),
                'imageable_id' => $user->id,
                'imageable_type' => User::class
            ]);
        });

        $this->command->info('All users have been assigned images.');

        // Find admin user
        $adminUser = User::where('name', 'admin')->first();

        if ($adminUser) {
            // Get all posts by admin
            $adminPosts = Post::where('user_id', $adminUser->id)->get();

            // Create images for admin's posts
            $adminPosts->each(function ($post) {
                Image::create([
                    'url' => fake()->imageUrl(),
                    'imageable_id' => $post->id,
                    'imageable_type' => Post::class
                ]);
            });

            $this->command->info('All posts by admin have been assigned images.');
        } else {
            $this->command->warn('No user with name "admin" found.');
        }
    }
}
