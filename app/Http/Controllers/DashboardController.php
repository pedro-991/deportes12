<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tournament;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $tournaments = Tournament::with(['sport', 'organization'])
            ->whereHas('organization', function ($query) {
                $query->where('id', auth()->user()->organization_id);
            })
            ->orderBy('priority', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Dashboard', [
            'tournaments' => $tournaments,
        ])->withViewData(['layout' => 'admin']);
    }
}
