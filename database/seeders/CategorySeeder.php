<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

//^import factories


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $catgories = ['Laravel', 'JavaScript', 'Python', 'C++', 'HTML', 'CSS', 'Java', 'Django','React','Vue','NextJS'];

        //^loop thru all and create a name for each
        foreach ($catgories as $cat) {
            Category::create([
                'name' => $cat,
            ]);
        }
    }
}
