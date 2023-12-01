<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Tempat;
use App\Models\Tikets;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TiketsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    // public function home()
    // {
    //     $id = auth()->user()->id;
    //     $data = User::where('id', $id)->get();

    //     return Inertia::render('Home', [
    //         'props' => $data
    //     ]);
    // }
    public function index()
    {

        $today = Carbon::now();
        // Inisialisasi array untuk menyimpan tanggal dan hari
        $dates = [];
        // Loop untuk mengambil semua tanggal dalam 7 hari ke depan
        for ($i = 0; $i < 7; $i++) {
            $currentDate = $today->clone()->addDays($i);
            $formattedDate = $currentDate->format('d-m-Y');
            $dayOfWeek = $currentDate->isoFormat('dddd'); // Menampilkan hari dalam bahasa Inggris

            $dates[] = [
                'date' => $formattedDate,
                'day' => $dayOfWeek,
            ];
        }
        $id = auth()->user()->id;
        $jumlahData = Bookings::where('user_id', $id)->count();
        $data = Tempat::all();
        return Inertia::render('Tiket/Index', [
            'props' => $data,
            'today' => $today,
            'dateAndDays' => $dates,
            'countBookings' => $jumlahData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tikets $tikets)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tikets $tikets)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tikets $tikets)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tikets $tikets)
    {
        //
    }
}
