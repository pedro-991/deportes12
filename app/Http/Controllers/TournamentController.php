<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tournament;
use App\Models\Sport;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TournamentController extends Controller
{
    //
    /**
     * Mostrar lista de torneos
     */
    public function index()
    {
        $tournaments = Tournament::with(['sport', 'organization'])
            //->where('organization_id', auth()->user()->organization_id)
            ->orderBy('priority', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Tournaments/Index', [
            'tournaments' => $tournaments,
        ]);
    }

    /**
     * Mostrar formulario para crear torneo
     */
    public function create()
    {
        $sports = Sport::where('status', 1)->get();

        return Inertia::render('Admin/Tournaments/Create', [
            'sports' => $sports,
        ]);
    }

    /**
     * Guardar nuevo torneo
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:150|unique:tournaments',
            'date_init' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_init',
            'type' => 'required|in:Male,Female',
            'sport_id' => 'required|exists:sports,id',
            'priority' => 'required|integer|min:-10|max:100',
            'rules' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
        ]);

        $tournament = Tournament::create([
            'name' => $request->name,
            'date_init' => $request->date_init,
            'date_end' => $request->date_end,
            'type' => $request->type,
            'slug' => Str::slug($request->name),
            'priority' => $request->priority,
            'rules' => $request->rules,
            'sport_id' => $request->sport_id,
            'organization_id' => 1,
            'status' => 0, // En proceso
        ]);

        // Manejar logo si se proporciona
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('tournaments/logos', 'public');
            $tournament->update(['logo' => $path]);
        }

        return redirect()->route('admin.dashboard');
    }

    /**
     * Mostrar detalles de torneo
     */
    public function show(Tournament $tournament)
    {
        // Verificar permisos
        //$this->authorize('view', $tournament);

        //$tournament->load(['sport', 'organization', 'teams', 'groups', 'stages']);
        $tournament->load(['sport', 'organization', 'teams']);

        return Inertia::render('Admin/Tournaments/Show', [
            'tournament' => $tournament,
        ]);
    }

    /**
     * Mostrar formulario para editar torneo
     */
    public function edit(Tournament $tournament)
    {
        // Verificar permisos
        //$this->authorize('update', $tournament);

        $sports = Sport::where('status', 1)->get();

        return Inertia::render('Admin/Tournaments/Edit', [
            'tournament' => $tournament,
            'sports' => $sports,
        ]);
    }

    /**
     * Actualizar torneo
     */
    public function update(Request $request, Tournament $tournament)
    {
        // Verificar permisos
        //$this->authorize('update', $tournament);

        $request->validate([
            'name' => 'required|string|max:150|unique:tournaments,name,' . $tournament->id,
            'date_init' => 'required|date',
            'date_end' => 'required|date|after_or_equal:date_init',
            'type' => 'required|in:Male,Female',
            'sport_id' => 'required|exists:sports,id',
            'priority' => 'required|integer|min:-10|max:100',
            'rules' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'remove_logo' => 'nullable|boolean',
        ]);

        $data = [
            'name' => $request->name,
            'date_init' => $request->date_init,
            'date_end' => $request->date_end,
            'type' => $request->type,
            'slug' => Str::slug($request->name),
            'priority' => $request->priority,
            'rules' => $request->rules,
            'sport_id' => $request->sport_id,
        ];

        // Manejar logo
        if ($request->boolean('remove_logo')) {
            if ($tournament->logo) {
                \Storage::disk('public')->delete($tournament->logo);
            }
            $data['logo'] = null;
        } elseif ($request->hasFile('logo')) {
            // Eliminar logo anterior si existe
            if ($tournament->logo) {
                \Storage::disk('public')->delete($tournament->logo);
            }
            $path = $request->file('logo')->store('tournaments/logos', 'public');
            $data['logo'] = $path;
        }

        $tournament->update($data);

        return redirect()->route('admin.tournaments.show', $tournament->id)
            ->with('success', 'Torneo actualizado exitosamente');
    }

    /**
     * Eliminar torneo (soft delete)
     */
    public function destroy(Tournament $tournament)
    {
        // Verificar permisos
        //$this->authorize('delete', $tournament);

        $tournament->update(['status' => -1]); // Marcado como eliminado

        return redirect()->route('admin.tournaments.index')
            ->with('success', 'Torneo eliminado exitosamente');
    }

    /**
     * Cambiar estado del torneo
     */
    public function changeStatus(Request $request, Tournament $tournament)
    {
        // Verificar permisos
        //$this->authorize('update', $tournament);

        $request->validate([
            'status' => 'required|in:0,1',
        ]);

        $tournament->update(['status' => $request->status]);

        $statusText = $request->status == 1 ? 'finalizado' : 'en proceso';

        return redirect()->back()
            ->with('success', "Torneo marcado como {$statusText}");
    }
}
