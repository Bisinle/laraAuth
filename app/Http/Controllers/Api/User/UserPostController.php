<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserPostResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserPostController extends Controller
{
    public function userPosts(Request $request, User $user)
    {

        // $posts = UserPostResource::collection($user->posts);
        $posts = $user->posts()->with(['category', 'tags'])->paginate($request->input('per_page', 15));
        return new UserPostResource($posts);
        // return UserPostResource::collection($user->posts);
    }
}
