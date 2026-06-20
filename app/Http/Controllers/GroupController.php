<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\Team;
use App\Models\TeamGroup;
use Inertia\Inertia;

class GroupController extends Controller
{
    //
    public function index()
    {
        $groups = Group::with('teams')->get();
        return Inertia::render('Admin/Groups/Index', ['groups' => $groups]);
    }

    public function create()
    {
        $teams = Team::where('status', '<>', -1)->get();
        return Inertia::render('Admin/Groups/Create', ['teams' => $teams]);
    }

    public function store(Request $request)
    {
        $teams = Team::where('status', '<>', -1)->get()->shuffle();
        $n = $teams->count();

        if ($n === 0) {
            return back()->with('info', 'No hay equipos para crear grupos.');
        }

        // regla especial: si hay exactamente 4 equipos => 2 grupos de 2
        if ($n === 4) {
            $groupsCount = 2;
        } else {
            $groupsCount = min(4, (int) ceil($n / 4));
            if ($groupsCount * 4 < $n) {
                $groupsCount = (int) ceil($n / 4);
            }
            if ($groupsCount <= 0) $groupsCount = 1;
        }

        // distribuir lo más parejo posible (diferencia <= 1)
        $base = intdiv($n, $groupsCount);
        $rem = $n % $groupsCount;
        $sizes = [];
        for ($i = 0; $i < $groupsCount; $i++) {
            $sizes[] = $base + ($i < $rem ? 1 : 0);
        }

        // crear grupos y asignar equipos
        $letters = range('A', 'Z');
        $idx = 0;
        for ($g = 0; $g < $groupsCount; $g++) {
            $group = Group::create([
                'name' => 'Grupo ' . ($letters[$g] ?? ($g + 1)),
                'description' => 'Creado automáticamente',
            ]);

            for ($k = 0; $k < $sizes[$g]; $k++) {
                if (!isset($teams[$idx])) break;
                TeamGroup::create([
                    'group_id' => $group->id,
                    'team_id' => $teams[$idx]->id,
                ]);
                $idx++;
            }
        }

        return redirect()->route('admin.groups.index')->with('success', 'Grupos generados correctamente.');
    }

    public function destroy(Group $group)
    {
        // Eliminar relaciones en la tabla pivote
        TeamGroup::where('group_id', $group->id)->delete();

        // Eliminar el grupo
        $group->delete();

        return redirect()->route('admin.groups.index')
            ->with('success', 'Grupo eliminado exitosamente');
    }
}
