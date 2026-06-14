<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Team;
use App\Models\Partidos;

class Group extends Model
{
    /** @use HasFactory<\Database\Factories\GroupFactory> */
    use HasFactory;

    protected $fillable = [
        'tournament_id',
        'name',
        'description',
    ];

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_groups', 'group_id', 'team_id')->withTimestamps();
    }

    public function partidos()
    {
        return $this->hasMany(Partidos::class);
    }
}
