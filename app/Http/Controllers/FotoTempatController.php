<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FotoTempatController extends Controller
{
    public function show($filename)
    {
        $path = 'public/foto_tempats/' . $filename;
        return response()->file(Storage::path($path));
    }
}
