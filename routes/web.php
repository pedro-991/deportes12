<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TournamentController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\PartidosController;
use App\Http\Controllers\ResultadosController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rutas de administración
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Torneos
    Route::resource('tournaments', TournamentController::class);
    Route::post('/tournaments/{tournament}/status', [TournamentController::class, 'changeStatus'])->name('tournaments.change-status');
    
    // Equipos
    Route::resource('teams', TeamController::class);
    Route::post('/teams/{team}/players', [TeamController::class, 'addPlayer'])->name('teams.add-player');
    Route::delete('/teams/{team}/players/{player}', [TeamController::class, 'removePlayer'])->name('teams.remove-player');
    
    // Jugadores
    Route::resource('players', PlayerController::class);

    //grupos
    Route::resource('groups', GroupController::class);

    //partidos
    Route::resource('partidos', PartidosController::class);

    //resultados
    Route::resource('resultados', ResultadosController::class);


});

require __DIR__.'/auth.php';
