<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Tournament;
use App\Models\Sport;
//use App\Models\Player;

use Inertia\Inertia;

class TeamController extends Controller
{
    //
    public function index(Request $request)
    {
        $query = Team::with(['sport', 'tournament']);

        if ($request->has('tournament_id') && $request->tournament_id) {
            $query->where('tournament_id', $request->tournament_id);
        }

        if ($request->has('sport_id') && $request->sport_id) {
            $query->where('sport_id', $request->sport_id);
        }

        $teams = $query->orderBy('name')->paginate(15)->withQueryString();

        $tournaments = Tournament::where('status', '!=', -1)->get();
        $sports = Sport::where('status', 1)->get();

        return Inertia::render('Admin/Teams/Index', [
            'teams' => $teams,
            'tournaments' => $tournaments,
            'sports' => $sports,
            'filters' => $request->only(['tournament_id', 'sport_id']),
        ]);
    }

    public function create(Request $request)
    {
        $tournaments = Tournament::where('status', '!=', -1)->get();
        $sports = Sport::where('status', 1)->get();

        return Inertia::render('Admin/Teams/Create', [
            'tournaments' => $tournaments,
            'sports' => $sports,
            'selectedTournament' => $request->query('tournament_id'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'alias' => 'nullable|string|max:50',
            'type' => 'required|in:Male,Female',
            'color' => 'nullable|string|max:20',
            'sport_id' => 'required|exists:sports,id',
            'tournament_id' => 'nullable|exists:tournaments,id',
            'logo' => 'nullable|image|max:2048',
        ]);

        $team = Team::create([
            'name' => $request->name,
            'alias' => $request->alias,
            'type' => $request->type,
            'color' => $request->color,
            'sport_id' => $request->sport_id,
            'tournament_id' => $request->tournament_id,
            'status' => 1,
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('teams/logos', 'public');
            $team->update(['logo' => $path]);
        }

        return redirect()->route('admin.teams.show', $team->id)->with('success', 'Equipo creado exitosamente');
        //return redirect()->route('admin.teams.index');
    }

    public function show(Team $team)
    {
        $team->load(['sport', 'tournament', 'players']);

        return Inertia::render('Admin/Teams/Show', [
            'team' => $team,
        ]);
    }

    public function edit(Team $team)
    {
        $tournaments = Tournament::where('status', '!=', -1)->get();
        $sports = Sport::where('status', 1)->get();

        return Inertia::render('Admin/Teams/Edit', [
            'team' => $team,
            'tournaments' => $tournaments,
            'sports' => $sports,
        ]);
    }

    public function update(Request $request, Team $team)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'alias' => 'nullable|string|max:50',
            'type' => 'required|in:Male,Female',
            'color' => 'nullable|string|max:20',
            'sport_id' => 'required|exists:sports,id',
            'tournament_id' => 'nullable|exists:tournaments,id',
            'logo' => 'nullable|image|max:2048',
        ]);

        $team->update($request->only(['name','alias','type','color','sport_id','tournament_id']));

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('teams/logos', 'public');
            $team->update(['logo' => $path]);
        }

        return redirect()->route('admin.teams.show', $team->id)->with('success', 'Equipo actualizado');
    }

    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('admin.teams.index')->with('success', 'Equipo eliminado');
    }
}
