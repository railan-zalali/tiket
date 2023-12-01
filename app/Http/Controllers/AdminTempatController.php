<?php

namespace App\Http\Controllers;

use App\Models\Bookings;
use App\Models\Tempat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTempatController extends Controller
{
    public function index()
    {
        $tempats = Tempat::all();
        return Inertia::render('Admin/Tempat/Index', [
            'tempats' => $tempats
        ]);
    }

    public function create()
    {
        return inertia('Admin/Tempat/Create');
    }

    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama_tempat' => 'required',
            'deskripsi' => 'required',
            'alamat' => 'required',
            'kapasitas' => 'required|integer',
            'harga' => 'required|numeric',
            'foto_tempat' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'kontak' => 'required',
        ]);

        // Upload gambar
        $foto_tempat = $request->file('foto_tempat');
        $fotoFileName = time() . '.' . $foto_tempat->extension();
        $foto_tempat->storeAs('public/foto_tempats', $fotoFileName);

        // Simpan data ke database
        Tempat::create([
            'nama_tempat' => $request->nama_tempat,
            'deskripsi' => $request->deskripsi,
            'alamat' => $request->alamat,
            'kapasitas' => $request->kapasitas,
            'harga' => $request->harga,
            'foto_tempat' => $fotoFileName,
            'kontak' => $request->kontak,
        ]);

        $tempats = Tempat::all();

        return Inertia::render('Admin/Tempat/Index', [
            'message' => 'Berhasil tambah data',
            'tempats' => $tempats
        ]);
        // return redirect()->route('tempats.index');
    }

    public function edit($id)
    {
        $tempat = Tempat::find($id);

        return Inertia::render('Admin/Tempat/Edit', [
            'tempat' => $tempat
        ]);
    }


    public function update(Request $request, $id, Tempat $tempat)
    {
        try {
            $tempat = Tempat::findOrFail($id);

            $request->validate([
                'nama_tempat' => 'required|string',
                'deskripsi' => 'required|string',
                'alamat' => 'required|string',
                'kapasitas' => 'required|integer',
                'harga' => 'required|numeric',
                'kontak' => 'required|string',

            ]);

            $tempat->update([
                'nama_tempat' => $request->nama_tempat,
                'deskripsi' => $request->deskripsi,
                'alamat' => $request->alamat,
                'kapasitas' => $request->kapasitas,
                'harga' => $request->harga,
                'kontak' => $request->kontak,
            ]);

            if ($request->hasFile('foto_tempat')) {
                $imagePath = $request->file('foto_tempat')->store('tempat_images', 'public');
                $tempat->update(['foto_tempat' => $imagePath]);
            }

            $tempats = Tempat::all();


            // return redirect()->route('tempats.edit', $tempat->tempats_id)->with([
            //     'success' => 'Tempat has been updated successfully',
            //     // 'data' => $yourData, // Replace with the actual data you want to send
            // ]);
            // return redirect()->route('tempats.edit', $tempat->tempats_id)->with('success', 'Tempat has been updated successfully');
            return Inertia::render('Admin/Tempat/Index', [
                'data' => 'hai',
                'message' => 'Berhasil ubah data',
                'tempats' => $tempats
            ]);
            // return redirect()->route('tempats.index')->with('success', 'Tempat has been updated successfully');
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal melakukan checkout', 'error' => $e->getMessage()], 500);
        }

        // try {
        //     // Validasi request sesuai kebutuhan Anda
        //     $request->validate([
        //         'nama_tempat' => 'required|string|max:255',
        //         'deskripsi' => 'required|string',
        //         'alamat' => 'required|string',
        //         'kapasitas' => 'required|numeric',
        //         'harga' => 'required|numeric',
        //         'kontak' => 'required|string|max:255',

        //     ]);


        //     $nama_tempat = $request->input('nama_tempat');
        //     $deskripsi = $request->input('deskripsi');
        //     $alamat = $request->input('alamat');
        //     $kapasitas = $request->input('kapasitas');
        //     $harga = $request->input('harga');
        //     $kontak = $request->input('kontak');


        //     $tempat = new Tempat();
        //     $tempat->nama_tempat = $nama_tempat;
        //     $tempat->deskripsi = $deskripsi;
        //     $tempat->alamat = $alamat;
        //     $tempat->kapasitas = $kapasitas;
        //     $tempat->harga = $harga;
        //     $tempat->kontak = $kontak;

        //     // dd($tempat);

        //     $tempat->save();


        //     return response()->json([
        //         'message' => 'Data berhasil disimpan',
        //         // 'countBookings' => $data
        //     ], 200);
        // } catch (\Exception $e) {
        //     return response()->json(['message' => 'Gagal melakukan checkout', 'error' => $e->getMessage()], 500);
        // }
        // dd($request['nama_tempat']);
        // $request->validate([
        //     // Validasi input sesuai kebutuhan Anda
        //     'nama_tempat' => 'required|string|max:255',
        //     'deskripsi' => 'required|string',
        //     'kapasitas' => 'required|numeric',
        //     'harga' => 'required|numeric',
        //     'kontak' => 'required|string|max:255',
        //     // Tambahkan validasi lainnya sesuai kebutuhan
        // ]);

        // $tempat->update($request->all());

        // return redirect()->route('tempats.index')->with('success', 'Tempat berhasil diperbarui!');
    }




    public function destroy(Tempat $id)
    {
        // dd($id);

        // $id->delete();
        $id->delete();
        // dd($delete);
        return redirect()->route('tempats.index');
    }
}
