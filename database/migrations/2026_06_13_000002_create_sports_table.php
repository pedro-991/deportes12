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
        Schema::create('sports', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->decimal('duration', 10, 2);
            $table->integer('status')->default(1);
            $table->integer('min_players')->default(0);
            $table->integer('max_players')->default(0);
            $table->string('denomination', 20)->nullable()->comment('Goals, Points');
            $table->longText('rules')->nullable();
            $table->string('logo', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sports');
    }
};
