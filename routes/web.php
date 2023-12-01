<?php

use App\Http\Controllers\AdminTempatController;
use App\Http\Controllers\BookingsController;
use App\Http\Controllers\FotoTempatController;
use App\Http\Controllers\PayController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TempatController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/





Route::get('/', function () {
    return Inertia::render('Welcome');
});
// Route::get('/tiket', [TempatController::class, "index"])->middleware('guest')->name('tiket.index');
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/tempats', [AdminTempatController::class, 'index'])->name('tempats.index');
    Route::get('/tempats/create', [AdminTempatController::class, 'create'])->name('tempats.create');
    Route::post('/tempats', [AdminTempatController::class, 'store'])->name('tempats.store');
    Route::get('/tempats/{id}/edit', [AdminTempatController::class, 'edit'])->name('tempats.edit');
    Route::put('/tempats/{id}', [AdminTempatController::class, 'update'])->name('tempats.update');
    Route::delete('/tempats/{id}', [AdminTempatController::class, 'destroy'])->name('tempats.destroy');

    Route::resource('/pay', PayController::class);
    Route::post('/confirm-booking/{bookingId}', [BookingsController::class, 'confirmBooking']);

    Route::get('/report', [ReportController::class, 'index'])->name('report.index');
    Route::get('/report-bookings', [ReportController::class, 'bookings'])->name('report.bookings');


    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
    Route::get('/user/store', [UserController::class, 'store'])->name('user.store');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/bookings/{bookings_id}', [BookingsController::class, 'getBooking']);
    Route::post('/tiket/result', [TempatController::class, 'searchTickets'])->name('tiket.searchTickets');
    Route::post('/checkout', [BookingsController::class, 'checkout'])->name('checkout');
    Route::get('/confirm', [BookingsController::class, 'confirmPage'])->name('confirm.page');
    Route::delete('/confirm/{id}', [BookingsController::class, 'destroy'])->name('confirm.destroy');
    Route::put('/confirm-checkout/{id}', [BookingsController::class, 'confirmCheckout'])->name('confirm.checkout');
});
Route::resource('/tiket', TempatController::class);


// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/tiket', [TempatController::class, 'index'])->name('tiket.index');
//     Route::post('/tiket/result', [TempatController::class, 'searchTickets'])->name('tiket.searchTickets');


//     Route::post('/checkout', [BookingsController::class, 'checkout'])->name('checkout');
//     Route::get('/confirm', [BookingsController::class, 'confirmPage'])->name('confirm.page');
//     Route::put('/confirm-checkout/{id}', [BookingsController::class, 'confirmCheckout'])->name('confirm.checkout');
//     Route::delete('/confirm/{id}', [BookingsController::class, 'destroy'])->name('confirm.destroy');
// });
// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/storage/foto_tempats/{filename}', [FotoTempatController::class, 'show'])->name('foto_tempats.show');

require __DIR__ . '/auth.php';
