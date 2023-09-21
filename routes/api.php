<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ComicController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum', 'CORS'])->group(function() {
    Route::get('/user', function (Request $request) {
    return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/orders', OrderController::class);
    Route::apiResource('/authors', AuthorController::class);
    Route::apiResource('/comics', ComicController::class);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});


Route::controller(AuthController::class)->group(function() {
    Route::post('/signup', 'signup');
    Route::post('/login', 'login');
    
});
