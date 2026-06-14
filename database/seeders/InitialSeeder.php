<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Organization;
use App\Models\Sport;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class InitialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
         // Crear organización por defecto
        $organization = Organization::create([
            'name' => 'Organización Deportiva',
            'logo' => null,
        ]);

        // Crear deportes
        $sports = [
            [
                'name' => 'Fútbol',
                'duration' => 90.00,
                'status' => 1,
                'min_players' => 7,
                'max_players' => 11,
                'denomination' => 'Goles',
                'rules' => 'Duración: 90 minutos (2 tiempos de 45 minutos)\nJugadores: 11 por equipo (7 mínimo)\nSustituciones: 3 por partido',
                'logo' => null,
            ],
            [
                'name' => 'Basquetbol',
                'duration' => 40.00,
                'status' => 1,
                'min_players' => 5,
                'max_players' => 12,
                'denomination' => 'Puntos',
                'rules' => 'Duración: 40 minutos (4 cuartos de 10 minutos)\nJugadores: 5 por equipo\nSustituciones: Ilimitadas',
                'logo' => null,
            ],
            [
                'name' => 'Voleibol',
                'duration' => 60.00,
                'status' => 1,
                'min_players' => 6,
                'max_players' => 12,
                'denomination' => 'Puntos',
                'rules' => 'Duración: Máximo 5 sets (hasta 25 puntos por set)\nJugadores: 6 por equipo\nRotación: Obligatoria',
                'logo' => null,
            ],
            [
                'name' => 'Futsal',
                'duration' => 40.00,
                'status' => 1,
                'min_players' => 5,
                'max_players' => 12,
                'denomination' => 'Goles',
                'rules' => 'Duración: 40 minutos (2 tiempos de 20 minutos)\nJugadores: 5 por equipo\nSustituciones: Ilimitadas',
                'logo' => null,
            ],
        ];

        foreach ($sports as $sportData) {
            Sport::create($sportData);
        }

        // Crear usuario administrador
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@mail.com',
            'password' => Hash::make('admin'),
            'email_verified_at' => now(),
        ]);

        // Crear usuario manager
        User::create([
            'name' => 'Manager',
            'email' => 'manager@mail.com',
            'password' => Hash::make('manager'),
            'email_verified_at' => now(),
        ]);

        // Crear usuario regular
        User::create([
            'name' => 'Usuario',
            'email' => 'user@mail.com',
            'password' => Hash::make('user'),
            'email_verified_at' => now(),
        ]);
    }
}
