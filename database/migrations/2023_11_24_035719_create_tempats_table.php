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
        Schema::create('tempats', function (Blueprint $table) {
            $table->id('tempats_id');
            $table->string('nama_tempat');
            $table->text('deskripsi');
            $table->string('alamat');
            $table->integer('kapasitas');
            $table->float('harga');
            $table->string('foto_tempat');
            $table->string('kontak');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tempats');
    }
};
