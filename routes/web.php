<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Post\PostController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Category\CategoryController;
use Illuminate\Routing\RouteGroup;

// Application routes
Route::get('/', function () {
    return view('home');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Users routes
Route::resource('users', UserController::class);

// Posts routes
Route::resource('posts', PostController::class);

// Categories routes
Route::resource('categories', CategoryController::class);

// Filament will handle its own routes