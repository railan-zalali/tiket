<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Tempat extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $primaryKey = 'tempats_id';
    protected $table = 'tempats'; // Sesuaikan dengan nama tabel database Anda jika berbeda
    protected $fillable = ['nama_tempat', 'deskripsi', 'alamat', 'kapasitas', 'harga', 'foto_tempat', 'kontak'];
}
