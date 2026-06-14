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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
             $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->integer('age')->default(0);
            $table->string('dni', 20)->nullable();
            $table->enum('gender', ['Male', 'Female']);
            $table->integer('number')->default(0);
            $table->text('observations')->nullable();
            
            $table->foreignId('organization_id')->nullable()->constrained('organizations')->cascadeOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
