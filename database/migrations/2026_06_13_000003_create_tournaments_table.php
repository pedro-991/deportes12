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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->date('date_init');
            $table->date('date_end');
            $table->enum('type', ['Male', 'Female']);
            $table->string('logo', 100)->nullable();
            $table->string('cover', 100)->nullable();
            $table->string('slug', 100)->nullable();
            $table->integer('priority')->default(5);
            $table->integer('status')->default(0)->comment('-1: Eliminado, 0: En proceso, 1: Finalizado');
            $table->longText('rules')->nullable();
            
            $table->foreignId('sport_id')->constrained('sports')->cascadeOnDelete();
            $table->foreignId('organization_id')->constrained('organizations')->cascadeOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
