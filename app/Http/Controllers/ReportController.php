<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Tempat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        $tempat = Tempat::all();
        return Inertia::render('Admin/Report/Index', [
            'head' => 'Report',
            'tempat' => $tempat
        ]);
    }
    public function bookings()
    {

        $bookings = Bookings::with(['user', 'tempat'])->get();
        return Inertia::render('Admin/Report/Bookings', [
            'head' => 'Bookings',
            'bookings' => $bookings
        ]);
    }
}
