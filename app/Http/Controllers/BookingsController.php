<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Pay;
use App\Models\Tempat;
use App\Models\Tikets;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Bookings $bookings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bookings $bookings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bookings $bookings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Cari booking dengan ID yang dimaksud
            $booking = Bookings::find($id);

            // Pastikan booking ditemukan
            if (!$booking) {
                return response()->json(['message' => 'Booking not found'], 404);
            }

            // Hapus booking
            $booking->delete();
            // dd($booking);

            // Hitung ulang jumlah booking untuk pengguna yang diotentikasi
            $id = auth()->user()->user_id;
            $data = Bookings::where('user_id', $id)->count();

            // Redirect dengan pesan dan jumlah booking terkini
            return redirect()->route('confirm.page')->with([
                'message' => 'Booking berhasil dihapus',
                'countBookings' => $data
            ]);
        } catch (\Exception $e) {
            // Tangani kesalahan
            return response()->json(['message' => 'Gagal melakukan hapus', 'error' => $e->getMessage()], 500);
        }
    }

    public function confirmPage()
    {
        $id = auth()->user()->user_id;

        $jumlahData = Bookings::where('user_id', $id)->count();
        $bookings = Bookings::with(['user', 'tempat'])
            ->where('user_id', $id)
            ->get();
        // dd($bookings);
        return Inertia::render('Tiket/Confirm', [
            'head' => 'Confirm',
            'data' => $bookings,
            'countBookings' => $jumlahData
        ]);
    }
    public function checkout(Request $request)
    {
        try {
            // Validasi request sesuai kebutuhan Anda
            $request->validate([
                // Sesuaikan aturan validasi dengan struktur data yang dikirim dari frontend
                'items' => 'required|array',
                'subtotal' => 'required|numeric',
                'jumlahData' => 'required|integer',
            ]);


            $user_id = auth()->user()->user_id;

            $data = Bookings::where('user_id', $user_id)->count();
            // Ambil data dari request
            $items = $request->input('items');
            $subtotal = $request->input('subtotal');
            $jumlahData = $request->input('jumlahData');
            $tanggal = date('Y-m-d', strtotime($items[0]['tanggal']));
            // Dapatkan id_tempat berdasarkan nama_tempat
            $id_tempat = Tempat::where('nama_tempat', $items[0]['nama_tempat'])->value('tempats_id');
            // dd($id_tempat);
            // Simpan data ke dalam tabel bookings
            $booking = new Bookings();
            $booking->user_id = $user_id;
            $booking->tempat_id = $id_tempat;
            $booking->tanggal = $tanggal;
            $booking->tipe_tiket = $items[0]['tipe_tiket'];
            $booking->harga = $subtotal;
            $booking->jumlah_tiket = $jumlahData;
            // dd($booking);


            $booking->save();


            return response()->json([
                'message' => 'Data berhasil disimpan',
                'countBookings' => $data
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal melakukan checkout', 'error' => $e->getMessage()], 500);
        }
    }
    public function confirmCheckout($id)
    {
        try {
            $booking = Bookings::findOrFail($id);
            $booking->update(['status' => 'diproses']);
            // dd($booking->id);
            Pay::create([
                'bookings_id' => $id,
                'tanggal' => now(),
                'status' => 'pending',
                // Tambahkan bidang-bidang lain sesuai kebutuhan
            ]);

            // return Inertia::render('Tiket/Confirm', [
            //     'message' => 'Berhasil konfirmasi'
            // ])
            return redirect()->back()->with('success', 'Status booking berhasil diubah.');
        } catch (\Exception $e) {
            return response()->json(['error' => 'Konfirmasi gagal.'], 500);
        }
    }
    public function getBooking($bookings_id)
    {
        try {
            $booking = Bookings::with(['user', 'tempat'])
                ->where('bookings_id', $bookings_id)
                ->get();
            // dd($booking);
            // $booking = Bookings::find($bookings_id);

            if ($booking) {
                return response()->json($booking);
            } else {
                return response()->json(['error' => 'Booking not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Server error'], 500);
        }
    }
    public function confirmBooking($bookingId)
    {
        try {
            // Temukan booking berdasarkan ID
            $booking = Bookings::findOrFail($bookingId);

            // Ubah status pada tabel bookings menjadi 'success'
            $booking->update(['status' => 'success']);

            // Temukan pembayaran berdasarkan bookings_id
            $pay = Pay::where('bookings_id', $bookingId)->first();

            // Ubah status pada tabel pays menjadi 'success'
            if ($pay) {
                $pay->update(['status' => 'success']);
            }

            return response()->json(['message' => 'Booking confirmed successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to confirm booking'], 500);
        }
    }
}
