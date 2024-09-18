<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $posts = Post::all();
        $users = User::all();

        foreach ($posts as $post) {
            // Create 1 to 5 top-level comments for each post
            $commentCount = rand(1, 5);
            for ($i = 0; $i < $commentCount; $i++) {
                $this->createComment($post->id, null, $users);
            }
        }
    }

    private function createComment($postId, $parentId, $users, $depth = 0)
    {
        $comment = Comment::create([
            'post_id' => $postId,
            'user_id' => $users->random()->id,
            'parent_id' => $parentId,
            'content' => fake()->paragraph(rand(1, 3)),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 month', 'now'),
            // 'status' => fake()->randomElement(['approved', 'pending', 'spam']),
            'likes' => fake()->numberBetween(0, 100),
        ]);

        // Update the updated_at to be after created_at
        $comment->updated_at = fake()->dateTimeBetween($comment->created_at, 'now');
        $comment->save();

        // Recursively create nested comments, up to 3 levels deep
        if ($depth < 3) {
            $replyCount = rand(0, 3);  // Changed from rand(1, 3) to allow for no replies
            for ($i = 0; $i < $replyCount; $i++) {
                $this->createComment($postId, $comment->id, $users, $depth + 1);
            }
        }
    }
}
