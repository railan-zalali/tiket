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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id('bookings_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('tempat_id');
            $table->date('tanggal');
            $table->string('tipe_tiket');
            $table->float('harga');
            $table->integer('jumlah_tiket');
            $table->enum('status', ['pending', 'success', 'gagal', 'diproses'])->default('diproses');
            $table->timestamps();
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('tempat_id')->references('tempats_id')->on('tempats');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
