<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostStoreRequest;
use App\Http\Requests\Post\PostUpdateRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\Post\PostResources;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;


class PostController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        // return UserResource::collection(User::query()->orderBy('id', 'asc')->paginate(10));
        return PostResources::collection(Post::query()->latest()->paginate(9));
    }




    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\Post\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostStoreRequest $request)
    {
        //* validate the request befor saving
        $data = $request->validated();
        $post = Post::create($data);

        return response(new PostResources($post), 201);
    }




    /**
     * Display the specified resource.
     *
     * @param \App\Models\Post $post    
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

        return new PostResources($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\Post\UpdateUserRequest $request
     * @param \App\Models\Post   $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostUpdateRequest $request, Post $post)
    {
        $data = $request->validated();

        $post->update($data);

        return new PostResources($post);
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect('/posts');
    }
}
