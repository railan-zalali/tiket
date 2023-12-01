<?php

namespace App\Http\Controllers;

use App\Models\Pay;
use App\Http\Requests\StorePayRequest;
use App\Http\Requests\UpdatePayRequest;
use App\Models\Bookings;
use App\Models\Tempat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $id = auth()->user()->user_id;

        $bookings = Bookings::with(['user', 'tempat'])
            // ->where('user_id', $id)
            ->get();
        return Inertia::render('Admin/Pay/Index', [
            'head' => 'Payments',
            'bookings' => $bookings
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
        $barcodeData = $request->input('barcodeData');
        // dd($request->input());
        $bookingId = $barcodeData[0];

        $booking = Bookings::find($bookingId);

        if ($booking) {

            $payment = new Pay([
                'bookings_id' => $bookingId,
                'tanggal' => now(),
                'status' => 'berhasil',
                'code' => implode(',', $barcodeData)
            ]);

            $payment->save();

            return response()->json(['status' => 'success', 'message' => 'Barcode data saved successfully']);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Booking not found']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pay $pay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pay $pay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $pay = Pay::find($id);

            if ($pay) {
                $bookings_id = $pay->bookings_id;

                $pay->status = 'dikonfirmasi'; // Sesuaikan dengan atribut yang sesuai
                $pay->save();

                // Lakukan operasi pada tabel bookings jika perlu
                $booking = Bookings::find($bookings_id);
                if ($booking) {
                    $booking->status = 'dikonfirmasi'; // Sesuaikan dengan atribut yang sesuai
                    $booking->save();
                }
            }
            $bookings = Bookings::with(['user', 'tempat'])
                // ->where('user_id', $id)
                ->get();
            return Inertia::render('Admin/Pay/Index', [
                'head' => 'Payments',
                'bookings' => $bookings
            ]);
            // return redirect()->back()->with('success', 'Status booking berhasil diubah.');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Konfirmasi gagal.'], 500);
        }
        // dd($id);
        // Lakukan operasi konfirmasi pembayaran, misalnya:
        // $booking = Bookings::find($id);
        // $booking->status = 'confirmed'; // Sesuaikan dengan atribut yang sesuai
        // $booking->save();

        // return response()->json(['message' => 'Pembayaran berhasil dikonfirmasi']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pay $pay)
    {
        //
    }
}
