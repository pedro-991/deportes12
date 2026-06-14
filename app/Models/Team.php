<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /** @use HasFactory<\Database\Factories\TeamFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'alias',
        'type',
        'logo',
        'color',
        'status',
        'sport_id',
        'tournament_id',
    ];

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }

    public function tournament()
    {
        return $this->belongsTo(Tournament::class);
    }

    public function players()
    {
        return $this->belongsToMany(Player::class, 'player_teams')->withTimestamps();
    }
}
