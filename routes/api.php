<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Category\CategoryController;
use App\Http\Controllers\Api\Comment\CommentController;
use App\Http\Controllers\Api\Post\PostController;
use App\Http\Controllers\Api\User\UserPostController;
use App\Http\Controllers\Api\User\UserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/posts', PostController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::get('users/{user}/posts', [UserPostController::class, 'userPosts']);
    Route::get('comments/{post}/', [CommentController::class, 'index']);});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);



// // use App\Http\Resources\User\UserPostResource;
// // use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');