<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        // Mengambil semua data jasa/barang dari database
        $services = Service::latest()->get();
        
        // Kirim data ke halaman Dashboard (React)
        return Inertia::render('Dashboard', [
            'services' => $services
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:product,service',
            'category' => 'required|string',
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_url' => 'nullable|url',
        ]);

        $data = $request->except(['image', 'image_url']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
            $data['image_path'] = '/storage/' . $path;
        } elseif ($request->filled('image_url')) {
            $data['image_path'] = $request->image_url;
        } else {
            // Default placeholder if none provided
            $data['image_path'] = 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=600';
        }

        $data['is_available'] = $request->boolean('is_available', true);

        Service::create($data);

        return redirect()->back()->with('message', 'Item berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:product,service',
            'category' => 'required|string',
            'description' => 'required|string',
            'price' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'image_url' => 'nullable|string',
        ]);

        $item = Service::findOrFail($id);
        $data = $request->except(['image', 'image_url']);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
            $data['image_path'] = '/storage/' . $path;
        } elseif ($request->has('image_url')) {
            $data['image_path'] = $request->image_url;
        }

        $data['is_available'] = $request->has('is_available') ? $request->boolean('is_available') : $item->is_available;

        $item->update($data);

        return redirect()->back()->with('message', 'Item berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $item = Service::findOrFail($id);
        $item->delete();

        return redirect()->back()->with('message', 'Item berhasil dihapus!');
    }
}