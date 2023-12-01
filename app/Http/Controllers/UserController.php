<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $data = User::all();
        return Inertia::render('Admin/User/Index', [
            'head' => 'User',
            'userData' => $data
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/User/Create', [
            'head' => 'User'
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,petugas',
        ]);


        $user = User::create([
            'name' => $request->input('name'),
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => $request->input('role'),
        ]);
        return response()->json(['message' => 'User created successfully']);
    }
    public function destroy($id)
    {
        try {
            // Cari booking dengan ID yang dimaksud

            $user = User::find($id);


            // dd($user);
            // Pastikan user ditemukan
            if (!$user) {
                return response()->json(['message' => 'user not found'], 404);
            }

            // Hapus user
            $user->delete();
            // dd($user);

            // Redirect dengan pesan dan jumlah user terkini
            return redirect()->route('user.index')->with([
                'message' => 'user berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            // Tangani kesalahan
            return response()->json(['message' => 'Gagal melakukan hapus', 'error' => $e->getMessage()], 500);
        }
    }
}
