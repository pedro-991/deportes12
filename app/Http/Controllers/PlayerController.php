<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\Team;
use App\Models\PlayerTeam;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlayerController extends Controller
{
    //
    /**
     * Mostrar lista de jugadores
     */
    public function index(Request $request)
    {
        //$query = Player::where('organization_id', auth()->user()->organization_id);
        //consultar Player sin condicionar por organizacion
        $query = Player::query();

        // Filtrar por nombre si se especifica
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('dni', 'like', "%{$search}%");
            });
        }

        // Filtrar por género si se especifica
        if ($request->has('gender') && $request->gender) {
            $query->where('gender', $request->gender);
        }

        $players = $query->orderBy('last_name')->orderBy('first_name')->paginate(15);

        return Inertia::render('Admin/Players/Index', [
            'players' => $players,
            'filters' => $request->only(['search', 'gender']),
        ]);
    }

    /**
     * Mostrar formulario para crear jugador
     */
    public function create()
    {
        
        $teams = Team::All();

        return Inertia::render('Admin/Players/Create', [
            'teams' => $teams,
        ]);
    }

    /**
     * Guardar nuevo jugador
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'age' => 'required|integer|min:0|max:99',
            'dni' => 'nullable|string|max:20|unique:players,dni',
            'gender' => 'required|in:Male,Female',
            'number' => 'required|integer|min:0|max:99',
            'observations' => 'nullable|string|max:500',
        ]);

        Player::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'age' => $request->age,
            'dni' => $request->dni,
            'gender' => $request->gender,
            'number' => $request->number,
            'observations' => $request->observations,
            'organization_id' => auth()->user()->organization_id,
        ]);

       
        $player = Player::latest()->first();

        //asignar id y equipo a la tabla pivote team_player, extrae el team del request
        $team_id = $request->team_id;
        //mas adelante puedo ejecutar esto solo si el team_id existe
        //y si no existe no lo ejecuto
        PlayerTeam::create([
            'player_id' => $player->id,
            'team_id' => $team_id,
        ]);

            return redirect()->route('admin.players.show', ['player' => $player->id])
                ->with('success', 'Jugador creado exitosamente');
    }

    /**
     * Mostrar detalles del jugador
     */
    public function show(Player $player)
    {
        

        /* $player->load(['teams' => function ($query) {
            $query->with(['tournament', 'sport']);
        }]); */

        //consultar equipo del jugador
        $team = PlayerTeam::where('player_id', $player->id)->first();
        //$team->load(['tournament', 'sport']);
        //$player->team = $team;
        //consultar equipo del jugador
        /* $player->load(['teams' => function ($query) {
            $query->with(['tournament', 'sport']);
        }]); */
        //$player->team = $player->teams->first();
        $player->team = Team::find($team->team_id);

        return Inertia::render('Admin/Players/Show', [
            'player' => $player
        ]);
    }

    /**
     * Mostrar formulario para editar jugador
     */
    public function edit(Player $player)
    {
        //consultar teams
            $teams = Team::All();

        return Inertia::render('Admin/Players/Edit', [
            'player' => $player,
            'teams' => $teams
        ]);
    }

    /**
     * Actualizar jugador
     */
    public function update(Request $request, Player $player)
    {
        

        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'age' => 'required|integer|min:0|max:99',
            'dni' => 'nullable|string|max:20|unique:players,dni,' . $player->id,
            'gender' => 'required|in:Male,Female',
            'number' => 'required|integer|min:0|max:99',
            'observations' => 'nullable|string|max:500',
        ]);

        $player->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'age' => $request->age,
            'dni' => $request->dni,
            'gender' => $request->gender,
            'number' => $request->number,
            'observations' => $request->observations,
        ]);

        $team_id = $request->team_id;
        //si el id no existe en la tabla pivote crearlo y si existe actualizarlo
        PlayerTeam::updateOrCreate(
            ['player_id' => $player->id],
            ['team_id' => $team_id]
        );

        return redirect()->route('admin.players.show', $player->id)
            ->with('success', 'Jugador actualizado exitosamente');
    }

    /**
     * Eliminar jugador
     */
    public function destroy(Player $player)
    {
       

        // Verificar si el jugador está asignado a algún equipo
        if ($player->teams()->count() > 0) {
            return redirect()->back()
                ->with('error', 'No se puede eliminar el jugador porque está asignado a uno o más equipos');
        }

        $player->delete();

        return redirect()->route('admin.players.index')
            ->with('success', 'Jugador eliminado exitosamente');
    }

   
    
}
