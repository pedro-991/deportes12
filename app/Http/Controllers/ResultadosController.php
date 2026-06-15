<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Group;
use App\Models\Partidos;
use App\Models\Resultados;
use Inertia\Inertia;

class ResultadosController extends Controller
{
    //

     public function index()
    {
        // Trae grupos con enfrentamientos y resultados relacionados
        $groups = Group::with([
            'teams',
            'partidos' => function($q) {
                $q->with(['team1','team2','resultados.team']);
            }
        ])->get();

        return Inertia::render('Admin/Resultados/Index', [
            'groups' => $groups
        ]);
    }

    public function create()
    {
        // Para el formulario: listamos grupos y enfrentamientos por grupo
        $groups = Group::with(['partidos.team1','partidos.team2'])->get();
        return Inertia::render('Admin/Resultados/Create', [
            'groups' => $groups
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'partido_id' => 'required|exists:partidos,id',
            'goles_vs1' => 'nullable|integer|min:0',
            'goles_vs2' => 'nullable|integer|min:0',
        ]);

        $enf = Partidos::findOrFail($data['partido_id']);

        // Normalizar equipos
        $teamA = $enf->vs1;
        $teamB = $enf->vs2;

        // Guardar/actualizar resultado para teamA
        Resultados::updateOrCreate(
            ['partido_id' => $enf->id, 'team_id' => $teamA],
            ['goles' => $data['goles_vs1'] ?? null]
        );

        // Guardar/actualizar resultado para teamB
        Resultados::updateOrCreate(
            ['partido_id' => $enf->id, 'team_id' => $teamB],
            ['goles' => $data['goles_vs2'] ?? null]
        );

        return redirect()->route('admin.resultados.index')->with('success', 'Resultados guardados.');
    }
}
