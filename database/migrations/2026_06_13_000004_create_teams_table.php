<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('alias', 50)->nullable();
            $table->enum('type', ['Male', 'Female']);
            $table->string('logo', 100)->nullable();
            $table->string('color', 20)->nullable();
            $table->integer('status')->default(1);
            
            $table->foreignId('sport_id')->constrained('sports')->cascadeOnDelete();
            $table->foreignId('tournament_id')->nullable()->constrained('tournaments')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
