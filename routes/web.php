<?php







use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use App\Models\JobListing;
use App\Models\User;


// Route::view('/', 'home');
Route::get('/', [PostController::class, 'home'])->name('home');
// Route::get('/search', [PostController::class, 'search'])->name('search');
// Route::view('/contact', 'contact');
Route::resource('posts', PostController::class);

// Route::controller(PostController::class)->group(function () {
//     Route::get('/jobs',  'index');
//     Route::get('/jobs/create',  'create');
//     Route::post('/jobs',  'store');
//     Route::get('/jobs/{job}',  'show');
//     Route::get('/jobs/{job}/edit',  'edit');
//     Route::patch('/jobs/{job}',  'update');
//     Route::delete('/jobs/{job}',  'destroy');
// });