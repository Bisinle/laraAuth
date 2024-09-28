<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $faker = \Faker\Factory::create();

        // Create an array to store unique tag names
        $tagNames = [];

        // Generate 20 unique tags
        while (count($tagNames) < 20) {
            $tagName = ucfirst($faker->words(rand(1, 2), true)); // Generate 1-2 word tags
            $tagName = Str::limit($tagName, 20); // Limit to 20 characters
            $tagNames[$tagName] = true; // Using as key ensures uniqueness
        }

        // Insert the tags into the database
        foreach (array_keys($tagNames) as $tagName) {
            Tag::create(['name' => $tagName]);
        }

        $this->command->info('20 unique tags have been created successfully.');
    }
}
