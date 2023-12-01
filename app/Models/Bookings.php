<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model
{
    use HasFactory;
    protected $primaryKey = 'bookings_id';
    protected $fillable = ['user_id', 'tempat_id', 'tanggal', 'tipe_tiket', 'harga', 'status'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tempat()
    {
        return $this->belongsTo(Tempat::class, 'tempat_id');
    }
    // public function tikets()
    // {
    //     return $this->hasMany(Tikets::class);
    // }
}
