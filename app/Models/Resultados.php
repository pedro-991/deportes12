<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Team;
use App\Models\Partidos;

class Resultados extends Model
{
    /** @use HasFactory<\Database\Factories\ResultadosFactory> */
    use HasFactory;

    protected $table = 'resultados';

    protected $fillable = [
        'partido_id',
        'team_id',
        'goles',
    ];

    public function partido()
    {
        return $this->belongsTo(Partidos::class, 'partido_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }
}
