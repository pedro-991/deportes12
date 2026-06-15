<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Resultados;
use App\Models\Group;
use App\Models\Team;

class Partidos extends Model
{
    /** @use HasFactory<\Database\Factories\PartidosFactory> */
    use HasFactory;

    protected $fillable = ['group_id', 'vs1', 'vs2'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function team1()
    {
        return $this->belongsTo(Team::class, 'vs1');
    }

    public function team2()
    {
        return $this->belongsTo(Team::class, 'vs2');
    }

    public function resultados()
{
    return $this->hasMany(Resultados::class, 'partido_id');
}
}
