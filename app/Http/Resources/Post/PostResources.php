<?php

namespace App\Http\Resources\Post;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
            ],
            "user" => $this->user,
            'comments' => $this->comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'user' => $comment->user,
                    'likes' => $comment->likes,
                    'post_id' => $comment->post_id,
                    'parent_id' => $comment->parent_id,
                    'created_at' => $comment->created_at,
                    'parent_id' => $comment->parent_id,



                ];
            }),

            "tags" => $this->tags->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                ];
            }),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),


        ];
    }
}
