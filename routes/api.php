<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Category\CategoryController;
use App\Http\Controllers\Api\Post\PostController;
use App\Http\Controllers\Api\User\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/posts', PostController::class);
    Route::apiResource('/categories', CategoryController::class);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);
