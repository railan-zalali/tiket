<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pay extends Model
{
    use HasFactory;
    protected $primaryKey = 'pays_id';
    protected $fillable = ['bookings_id', 'tanggal', 'status'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tempat()
    {
        return $this->belongsTo(Tempat::class, 'tempats_id');
    }
    public function booking()
    {
        return $this->belongsTo(Bookings::class, 'bookings_id');
    }
}
