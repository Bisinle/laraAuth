<?php

namespace App\Http\Controllers\Api\Post;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;


class PostController extends Controller
{
    public function home()
    {
        $featuredposts = Post::with('user')
            ->orderBy('salary', 'desc')
            ->take(3)
            ->get();

        $userCount = User::count();
        $categoryCount = Category::count();
        $postCount = Post::count();

        return view('home', compact('featuredposts', 'userCount', 'postCount', 'categoryCount'));
    }

    // public function index()
    // {
    //     // $posts = Post::all();
    //     //     // $posts = Post::with('user')->get();
    //     //     // $posts = Post::with('user')->paginate(8);
    //     //     // $posts = Post::with('user')->cursorPaginate(8); // bes option when dealing with large data sets
    //     // $posts = Post::with('user')->orderBy('created_at', 'asc')->simplePaginate(12);
    //     $posts = Post::with('user')->latest()->simplePaginate(12);
    //     // $posts = Post::with('user')

    //     //     ->simplePaginate(9);

    //     return view('posts.index', ['posts' => $posts]);
    // }
    public function index(Request $request)
    {
        $query = Post::query();

        if ($request->has('search_term')) {
            $searchTerm = $request->input('search_term');
            $query->where('title', 'like', '%' . $searchTerm . '%')
                ->orWhere('description', 'like', '%' . $searchTerm . '%');
        }

        $posts = $query->latest()->simplePaginate(9);


        if ($request->wantsJson()) {
            return response()->json([
                'posts' => $posts
            ]);
        }

        return view('posts.index', ['posts' => $posts]);
    }

    // public function search(Request $request)
    // {
    //     $searchTerm = $request->input('search_term');
    //     $categoryId = $request->input('category_id');
    //     $userId = $request->input('user_id');

    //     $query = Post::query();

    //     if ($searchTerm) {
    //         $query->where(function ($q) use ($searchTerm) {
    //             $q->where('title', 'like', '%' . $searchTerm . '%')
    //                 ->orWhere('description', 'like', '%' . $searchTerm . '%');
    //         });
    //     }

    //     if ($categoryId) {
    //         $query->where('category_id', $categoryId);
    //     }

    //     if ($userId) {
    //         $query->where('user_id', $userId);
    //     }

    //     $posts = $query->with('category', 'user')
    //         ->paginate(12);

    //     $categories = Category::all();
    //     $users = User::all();

    //     return view('posts.index', compact('posts', 'categories', 'users'));
    // }

    public function create()
    {
        $categories = Category::all();
        return view('posts.create', ['categories' => $categories]);
    }



    public function store()
    {
        //* validate the request befor saving
        request()->validate([
            'title' => ['required', 'min:3'],
            'description' => ['required', 'min:3'],
            'category' => ['required', 'min:3'],


        ]);
        $categoryId =
            $userId =
            Post::create([
                'title' => request('title'),
                'description' => request('description'),
                "category_id" => Category::where('name', request('category'))->value('id'),
                "user_id" => User::inRandomOrder()->value('id'),
            ]);

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
        if ($post === null) {
            dd($post);
            return view('posts.notFound');
        }
        return view('posts.show', ['post' => $post]);
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
