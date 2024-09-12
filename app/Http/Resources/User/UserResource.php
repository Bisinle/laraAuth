<?php

namespace App\Http\Resources\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            "name" => $this->name,
            "email" => $this->email,
            "posts" => $this->posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description,
                    'category' => $post->category,
                    'tags' => $post->tags,
                ];
            }),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            // "avatar" => $this->avatar,

        ];
    }
}
