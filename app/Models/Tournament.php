<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    /** @use HasFactory<\Database\Factories\TournamentFactory> */
    use HasFactory;

     protected $fillable = [
        'name',
        'date_init',
        'date_end',
        'type',
        'logo',
        'cover',
        'slug',
        'priority',
        'status',
        'rules',
        'sport_id',
        'organization_id',
    ];

    protected $casts = [
        'date_init' => 'date',
        'date_end' => 'date',
    ];


    public function organization()
        {
            return $this->belongsTo(Organization::class);
        }

    public function sport()
        {
            return $this->belongsTo(Sport::class);
        }

        public function teams()
    {
        return $this->hasMany(Team::class);
    }
}
