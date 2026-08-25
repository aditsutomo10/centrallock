<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $items = Service::where('is_available', true)->get();
        return Inertia::render('Welcome', [
            'items' => $items,
        ]);
    }
}
