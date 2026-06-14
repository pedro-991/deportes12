<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Partidos;
use Inertia\Inertia;

class PartidosController extends Controller
{
    //
    public function index()
    {
        $groups = Group::with(['teams','partidos.team1','partidos.team2'])->get();
        return Inertia::render('Admin/Partidos/Index', ['groups' => $groups]);
    }

    public function store(Request $request)
    {
        $request->validate(['group_id' => 'required|exists:groups,id']);
        $group = Group::with('teams')->findOrFail($request->group_id);
        $teams = $group->teams->pluck('id')->toArray();
        sort($teams);

        // generar todas las parejas i<j
        $pairs = [];
        $n = count($teams);
        for ($i = 0; $i < $n; $i++) {
            for ($j = $i + 1; $j < $n; $j++) {
                $a = $teams[$i];
                $b = $teams[$j];
                $pairs[] = [$a, $b];
            }
        }

        foreach ($pairs as [$a, $b]) {
            // normalizar orden para la unicidad (vs1 < vs2)
            [$vs1, $vs2] = $a < $b ? [$a, $b] : [$b, $a];

            // crear solo si no existe
            $exists = Partidos::where('group_id', $group->id)
                ->where('vs1', $vs1)
                ->where('vs2', $vs2)
                ->exists();

            if (!$exists) {
                Partidos::create([
                    'group_id' => $group->id,
                    'vs1' => $vs1,
                    'vs2' => $vs2,
                ]);
            }
        }

        return redirect()->route('admin.partidos.index')->with('success', 'Enfrentamientos generados para ' . $group->name);
    }

    // otros métodos (show/create) pueden implementarse si quieres

}
