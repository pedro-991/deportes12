<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlayerTeam extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerTeamFactory> */
    use HasFactory;

     // Ajusta si la migración creó otro nombre de tabla
    protected $table = 'player_team';

    // Campos que se pueden asignar en masa
    protected $fillable = [
        'player_id',
        'team_id',
        // añade aquí otros campos de la migración si existen (por ejemplo 'role', 'joined_at', etc.)
    ];

    // Asumimos que es una tabla pivot sin timestamps; cambia a `true` si tu migración incluye created_at/updated_at
    public $timestamps = false;

    // Si la tabla NO tiene un id autoincremental, desactiva incrementing
    public $incrementing = false;

    // Relaciones de ayuda
    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id');
    }

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }
}
