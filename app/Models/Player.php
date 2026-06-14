<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    /** @use HasFactory<\Database\Factories\PlayerFactory> */
    use HasFactory;

     protected $fillable = ['first_name',
        'last_name',
        'age',
        'dni',
        'gender',
        'number',
        'observations',
        'organization_id'];
}
