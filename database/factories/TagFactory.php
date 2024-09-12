<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => function () {
                do {
                    $words = array_slice(explode(' ', $this->faker->jobTitle()), 0, 2);
                    $word = strtolower(trim(implode('-', $words)));
                } while (strlen($word) < 3 || Tag::where('name', '#' . $word)->exists());

                return '#' . $word;
            },
        ];
    }
}
