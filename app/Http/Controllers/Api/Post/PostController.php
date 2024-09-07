<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\PostStoreRequest;
use App\Http\Resources\Post\PostResources;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;


class PostController extends Controller
{
    // public function home()
    // {
    //     $featuredposts = Post::with('user')
    //         ->orderBy('salary', 'desc')
    //         ->take(3)
    //         ->get();

    //     $userCount = User::count();
    //     $categoryCount = Category::count();
    //     $postCount = Post::count();

    //     return view('home', compact('featuredposts', 'userCount', 'postCount', 'categoryCount'));
    // }


    public function index(Request $request)
    {
        // return UserResource::collection(User::query()->orderBy('id', 'asc')->paginate(10));
        return PostResources::collection(Post::query()->latest()->paginate(9));
    }


    // public function create()
    // {
    //     $categories = Category::all();
    //     return view('posts.create', ['categories' => $categories]);
    // }



    public function store(PostStoreRequest $request)
    {
        //* validate the request befor saving
        $data = $request->validated();
        $post = Post::create($data);

        return response(new PostResources($post), 201);
        // request()->validate([
        //     'title' => ['required', 'min:3'],
        //     'description' => ['required', 'min:3'],
        //     'category' => ['required', 'min:3'],


        // ]);
        // $categoryId =
        //     $userId =
        //     Post::create([
        //         'title' => request('title'),
        //         'description' => request('description'),
        //         "category_id" => Category::where('name', request('category'))->value('id'),
        //         "user_id" => User::inRandomOrder()->value('id'),
        //     ]);

        // DB::table('posts')->insert([
        //     'title' => request('title'),
        //     'description' => request('description'),
        //     'category_id' => $categoryId,
        //     'user_id' => $userId, // <-- Assign the user ID here

        // ]);
        // $post = new Post([
        //     'title' => request('title'),
        //     'description' => request('description'),
        //     'category_id' => Category::where('name', request('category'))->value('id'),
        //     'user_id' => $userId,
        // ]);
        // $post->save();
        return redirect('/posts');
    }





    public function show(Post $post)
    {

        return new PostResources($post);
    }






    public function edit(Post $post)
    {
        return view('posts.edit', ['post' => $post]);
    }



    public function update(Post $post)
    {
        // Validate request
        request()->validate([
            'title' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],

        ]);

        // Update the job
        $post->update([
            'title' => request('title'),
            'description' => request('description'),

        ]);

        // Redirect to job page
        return redirect("/posts/" . $post->id);
    }
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect('/posts');
    }
}
