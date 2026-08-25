<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Users
        User::create([
            'name' => 'Owner Central Otomotif',
            'email' => 'owner@centralotomotif.com',
            'password' => Hash::make('owner123'),
            'role' => 'owner',
        ]);

        User::create([
            'name' => 'Buyer Central Otomotif',
            'email' => 'buyer@gmail.com',
            'password' => Hash::make('buyer123'),
            'role' => 'buyer',
        ]);

        // Seed Accessories (Products)
        Service::create([
            'name' => 'Spion Retract Otomatis (Universal)',
            'type' => 'product',
            'category' => 'spion',
            'description' => 'Spion lipat otomatis / retract kit lengkap dengan tombol switch lipat dan modul auto retract. Pengerjaan rapi dan bisa dipasang ke berbagai mobil.',
            'price' => 1250000,
            'image_path' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Lampu LED Headlight H4 Super Bright',
            'type' => 'product',
            'category' => 'lampu',
            'description' => 'Lampu LED utama dengan intensitas cahaya tinggi, hemat daya, dan tahan lama. Sorotan fokus dan tidak menyilaukan pengendara lain.',
            'price' => 450000,
            'image_path' => 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Sistem Alarm Keamanan Mobil & Central Lock',
            'type' => 'product',
            'category' => 'alarm',
            'description' => 'Alarm mobil lengkap dengan 2 remote, modul alarm, sensor getar, dan sirene. Meminimalisir pencurian dengan keamanan terpercaya.',
            'price' => 380000,
            'image_path' => 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Android Head Unit 9 Inch IPS Screen',
            'type' => 'product',
            'category' => 'android',
            'description' => 'Layar sentuh IPS resolusi tinggi dengan RAM 2GB / ROM 32GB. Mendukung Android Auto, Apple CarPlay, Bluetooth, GPS, dan kamera mundur.',
            'price' => 1750000,
            'image_path' => 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Tape Mobil Manual Single Din Bluetooth',
            'type' => 'product',
            'category' => 'tape_manual',
            'description' => 'Tape mobil standar single din dengan koneksi Bluetooth, USB, dan radio FM. Cocok untuk yang butuh audio sederhana tanpa layar sentuh.',
            'price' => 350000,
            'image_path' => 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Sarung Setir Kulit Anti Slip Universal',
            'type' => 'product',
            'category' => 'sarung_setir',
            'description' => 'Sarung setir bahan kulit sintetis anti slip, nyaman digenggam dan tersedia berbagai warna. Cocok untuk hampir semua ukuran setir mobil.',
            'price' => 85000,
            'image_path' => 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Setir Mobil Racing Model Sport (Berbagai Jenis Mobil)',
            'type' => 'product',
            'category' => 'setir',
            'description' => 'Setir mobil model racing untuk berbagai jenis dan merk mobil. Tersedia berbagai ukuran dan tipe sesuai kebutuhan modifikasi kabin.',
            'price' => 950000,
            'image_path' => 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Jok Setir Busa Empuk Anti Panas',
            'type' => 'product',
            'category' => 'jok_setir',
            'description' => 'Bantalan/jok setir berbahan busa empuk dan anti panas, membuat genggaman setir lebih nyaman saat berkendara jarak jauh.',
            'price' => 65000,
            'image_path' => 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Power Audio Mobil 4 Channel (Berbagai Merk)',
            'type' => 'product',
            'category' => 'power',
            'description' => 'Power audio mobil 4 channel, tersedia berbagai pilihan merk sesuai budget dan kebutuhan sistem audio mobil Anda.',
            'price' => 650000,
            'image_path' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        // Seed Services
        Service::create([
            'name' => 'Ngelas & Poles Mika Lampu Menguning',
            'type' => 'service',
            'category' => 'poles_lampu',
            'description' => 'Mengembalikan mika lampu utama yang kusam, kuning, atau baret menjadi jernih kembali seperti baru dengan teknik poles khusus dan coating pelindung.',
            'price' => 150000,
            'image_path' => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Perbaikan Power Window Macet / Lemah',
            'type' => 'service',
            'category' => 'power_window',
            'description' => 'Servis dinamo motor power window, penggantian regulator kaca, atau perbaikan switch saklar jendela agar kembali lancar naik-turun.',
            'price' => 120000,
            'image_path' => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);

        Service::create([
            'name' => 'Servis Kelistrikan Mobil Total & Wiring',
            'type' => 'service',
            'category' => 'kelistrikan',
            'description' => 'Diagnosis dan perbaikan seluruh jalur kabel / kelistrikan mobil, sekring putus, lampu mati, kelistrikan mesin mendadak mogok, dan penataan kabel rapi.',
            'price' => 250000,
            'image_path' => 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=600',
            'is_available' => true,
        ]);
    }
}
