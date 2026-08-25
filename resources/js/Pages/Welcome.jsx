import React, { useState, useMemo } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, items = [], whatsapp_number = "6281234567890", company_address = "Jl. Raya Cianjur - Bandung KM 10, Desa Hegarmanah, Sukaluyu, Cianjur" }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Define categories list with friendly Indonesian labels
    const categories = [
        { id: 'all', label: 'Semua Jasa & Barang' },
        { id: 'spion', label: 'Spion' },
        { id: 'lampu', label: 'Lampu Mobil' },
        { id: 'alarm', label: 'Alarm & Central Lock' },
        { id: 'android', label: 'Tape Android' },
        { id: 'tape_manual', label: 'Tape Manual' },
        { id: 'sarung_setir', label: 'Sarung Setir' },
        { id: 'setir', label: 'Setir Mobil' },
        { id: 'jok_setir', label: 'Jok Setir' },
        { id: 'power', label: 'Power Audio' },
        { id: 'poles_lampu', label: 'Jasa Poles Lampu' },
        { id: 'power_window', label: 'Jasa Power Window' },
        { id: 'kelistrikan', label: 'Jasa Kelistrikan' },
    ];

    // Filter items based on selected category and search query
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [items, selectedCategory, searchQuery]);

    // Format currency to IDR
    const formatIDR = (price) => {
        if (!price) return 'Hubungi Kami';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
    };

    // Generate WhatsApp link for a specific product/service
    const getWhatsAppLink = (item) => {
        const priceStr = item.price ? ` dengan harga ${formatIDR(item.price)}` : '';
        const message = `Halo Central Otomotif, saya tertarik dengan:\n\n*${item.name}* (${item.type === 'product' ? 'Produk' : 'Jasa'}${priceStr})\n\nApakah bisa berkonsultasi atau melakukan pemesanan untuk ini? Terima kasih!`;
        return `https://wa.me/${whatsapp_number}?text=${encodeURIComponent(message)}`;
    };

    // General WhatsApp link
    const generalWhatsAppLink = `https://wa.me/${whatsapp_number}?text=${encodeURIComponent('Halo Central Otomotif, saya ingin berkonsultasi mengenai kelistrikan atau aksesoris mobil saya.')}`;

    // Google Maps embed & direction links based on the shop address (no API key needed)
    const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(company_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company_address)}`;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
            <Head title="Central Otomotif - Aksesoris & Kelistrikan Mobil" />

            {/* Header / Navbar */}
            <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <span className="text-2xl md:text-3xl font-black italic tracking-wider bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-yellow-300 transition-all duration-300">
                                    CENTRAL
                                </span>
                                <span className="text-xs bg-orange-600 text-white font-bold px-2 py-0.5 rounded skew-x-12 uppercase">
                                    Otomotif
                                </span>
                            </Link>
                        </div>

                        {/* Navigation Actions */}
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <div className="flex items-center gap-3">
                                    <span className="hidden sm:inline text-sm text-slate-400">
                                        Halo, <span className="font-semibold text-slate-200">{auth.user.name}</span>
                                    </span>
                                    {auth.user.role === 'owner' ? (
                                        <Link
                                            href={route('admin.dashboard')}
                                            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-950/40 transition duration-300 transform hover:scale-[1.03]"
                                        >
                                            Dashboard Owner
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('profile.edit')}
                                            className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition duration-300"
                                        >
                                            Profil Saya
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 transition"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-950/20 transition-all duration-300"
                                    >
                                        Daftar
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative bg-slate-950 pt-20 pb-28 md:py-36 overflow-hidden border-b border-slate-900">
                {/* Background lighting effects */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none animate-float-slow"></div>
                <div className="absolute bottom-10 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-orange-600/10 blur-[100px] pointer-events-none animate-float-delayed"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-950/50 text-orange-400 border border-orange-800/60 mb-6 uppercase tracking-wider opacity-0 animate-fade-in">
                        🔧 Bengkel Spesialis Aksesoris & Kelistrikan
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-6 opacity-0 animate-fade-in-up">
                        SOLUSI KELISTRIKAN & <br />
                        <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                            MODIFIKASI MOBIL ANDA
                        </span>
                    </h1>
                    <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up delay-100">
                        Kami menyediakan aksesoris premium seperti <span className="text-slate-200 font-semibold">Android Head Unit, Spion Retract, Alarm</span>, hingga layanan restorasi <span className="text-slate-200 font-semibold">mika lampu kuning</span>, power window macet, dan instalasi kelistrikan mobil bergaransi.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up delay-200">
                        <a
                            href="#katalog"
                            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-950/40 transition duration-300 transform hover:scale-[1.03]"
                        >
                            Jelajahi Katalog
                        </a>
                        <a
                            href={generalWhatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-950/20 transition duration-300 transform hover:scale-[1.03]"
                        >
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.38 9.863-9.764.002-2.607-1.01-5.059-2.85-6.902C16.643 2.097 14.195.84 11.586.84c-5.447 0-9.871 4.38-9.877 9.766-.002 1.8.48 3.56 1.393 5.117L2.1 21.847l5.547-1.458zm9.957-6.883c-.27-.135-1.595-.788-1.843-.878-.247-.09-.428-.135-.609.135-.18.27-.697.878-.855 1.058-.158.18-.315.202-.586.067-.27-.135-1.14-.42-2.172-1.341-.803-.715-1.344-1.602-1.502-1.872-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.609-1.464-.834-2.005-.22-.527-.44-.455-.609-.464-.158-.007-.338-.007-.518-.007-.18 0-.473.068-.72.337-.248.27-.946.923-.946 2.25s.968 2.61 1.103 2.79c.135.18 1.905 2.91 4.615 4.08.644.278 1.148.444 1.54.568.647.206 1.236.177 1.702.107.519-.078 1.595-.652 1.82-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
                            </svg>
                            Tanya Kelistrikan WA
                        </a>
                    </div>
                </div>
            </header>

            {/* Catalog & Filter Section */}
            <main id="katalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-1 w-8 bg-orange-500 rounded-full"></span>
                            <span className="text-orange-400 font-bold uppercase tracking-wider text-sm">Pilihan Terbaik</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black">KATALOG PRODUK & JASA</h2>
                    </div>

                    {/* Live Search */}
                    <div className="relative w-full md:w-80">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari barang atau jasa..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-100 pl-10 pr-4 py-3 rounded-xl transition duration-300 outline-none"
                        />
                    </div>
                </div>

                {/* Filters Navbar (Categories) */}
                <div className="flex overflow-x-auto gap-2 pb-6 mb-10 scrollbar-none border-b border-slate-900">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`whitespace-nowrap px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                                selectedCategory === cat.id
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/40'
                                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-850'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Catalog Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <div
                                key={`${selectedCategory}-${item.id}`}
                                style={{ animationDelay: `${(index % 6) * 75}ms` }}
                                className="group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 hover:shadow-2xl hover:shadow-orange-950/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full opacity-0 animate-fade-in-up"
                            >
                                {/* Item Image */}
                                <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                                    <img
                                        src={item.image_path}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    {/* Type Badge */}
                                    <span className={`absolute top-4 left-4 text-xs font-black uppercase px-2.5 py-1 rounded-lg skew-x-3 tracking-wider text-white ${
                                        item.type === 'product' ? 'bg-orange-600' : 'bg-blue-600'
                                    }`}>
                                        {item.type === 'product' ? 'Aksesoris' : 'Jasa Servis'}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">
                                        {item.category.replace('_', ' ')}
                                    </span>
                                    <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-orange-400 transition-colors duration-300">
                                        {item.name}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {item.description}
                                    </p>

                                    {/* Price and Action */}
                                    <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                                        <div>
                                            <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Estimasi Harga</span>
                                            <span className="text-lg font-black text-slate-100">
                                                {formatIDR(item.price)}
                                            </span>
                                        </div>

                                        <a
                                            href={getWhatsAppLink(item)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-950/20 text-white transition-all duration-300"
                                        >
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.38 9.863-9.764.002-2.607-1.01-5.059-2.85-6.902C16.643 2.097 14.195.84 11.586.84c-5.447 0-9.871 4.38-9.877 9.766-.002 1.8.48 3.56 1.393 5.117L2.1 21.847l5.547-1.458zm9.957-6.883c-.27-.135-1.595-.788-1.843-.878-.247-.09-.428-.135-.609.135-.18.27-.697.878-.855 1.058-.158.18-.315.202-.586.067-.27-.135-1.14-.42-2.172-1.341-.803-.715-1.344-1.602-1.502-1.872-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.609-1.464-.834-2.005-.22-.527-.44-.455-.609-.464-.158-.007-.338-.007-.518-.007-.18 0-.473.068-.72.337-.248.27-.946.923-.946 2.25s.968 2.61 1.103 2.79c.135.18 1.905 2.91 4.615 4.08.644.278 1.148.444 1.54.568.647.206 1.236.177 1.702.107.519-.078 1.595-.652 1.82-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
                                            </svg>
                                            Pesan via WA
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-200 mb-2">Item Tidak Ditemukan</h3>
                        <p className="text-slate-400">
                            Maaf, barang atau jasa dengan filter/kata kunci tersebut belum tersedia. Silakan hubungi kami langsung via WhatsApp untuk pertanyaan ketersediaan khusus!
                        </p>
                        <a
                            href={generalWhatsAppLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all duration-300"
                        >
                            Tanya Admin Langsung
                        </a>
                    </div>
                )}
            </main>

            {/* General Information Section */}
            <section className="bg-slate-900/50 border-t border-slate-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Box 1 */}
                        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-850">
                            <div className="w-12 h-12 rounded-2xl bg-orange-950 text-orange-400 flex items-center justify-center font-bold text-lg mb-6">
                                🛠️
                            </div>
                            <h4 className="text-lg font-bold mb-3">Montir Profesional</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Pengerjaan dilakukan oleh montir spesialis kelistrikan berpengalaman. Kabel ditata rapi, dibungkus selang spiral, aman anti konsleting.
                            </p>
                        </div>
                        {/* Box 2 */}
                        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-850">
                            <div className="w-12 h-12 rounded-2xl bg-blue-950 text-blue-400 flex items-center justify-center font-bold text-lg mb-6">
                                💎
                            </div>
                            <h4 className="text-lg font-bold mb-3">Produk Berkualitas</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Hanya menyediakan merk aksesoris terpercaya dengan garansi jelas. Semua Head Unit Android & Alarm ditest sebelum dipasang.
                            </p>
                        </div>
                        {/* Box 3 */}
                        <div className="bg-slate-950 p-8 rounded-3xl border border-slate-850">
                            <div className="w-12 h-12 rounded-2xl bg-amber-950 text-amber-400 flex items-center justify-center font-bold text-lg mb-6">
                                🤝
                            </div>
                            <h4 className="text-lg font-bold mb-3">Garansi Pengerjaan</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Kepuasan pelanggan adalah prioritas kami. Kami memberikan garansi servis untuk pengerjaan kelistrikan & perbaikan power window.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map / Location Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="lg:max-w-md">
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2 block">Lokasi Workshop</span>
                        <h3 className="text-3xl font-black mb-6">KUNJUNGI BENGKEL KAMI</h3>
                        <p className="text-slate-400 mb-4 leading-relaxed">
                            Butuh pemasangan langsung? Datang saja ke bengkel kami untuk konsultasi dan pengerjaan di tempat yang nyaman dan lengkap.
                        </p>
                        <div className="space-y-3 text-sm text-slate-300">
                            <div className="flex items-start gap-2">
                                <span className="text-orange-500">📍</span>
                                <span>{company_address}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-orange-500">⏰</span>
                                <span>Senin - Sabtu: 09:00 - 17:00 WIB</span>
                            </div>
                        </div>
                        <a
                            href={mapsDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition duration-300"
                        >
                            Buka di Google Maps
                        </a>
                    </div>
                    {/* Real Embedded Google Map */}
                    <div className="w-full lg:w-[550px] aspect-video bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative">
                        <iframe
                            src={mapsEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Central Otomotif"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-500 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-black italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mb-1">
                            CENTRAL OTOMOTIF
                        </h4>
                        <p className="text-slate-400 text-xs">Spesialis Poles Mika Lampu Kusam & Kelistrikan Mobil Cianjur.</p>
                    </div>
                    <div className="text-center md:text-right">
                        <p>© 2026 Central Otomotif. All Rights Reserved.</p>
                        <p className="text-xs text-slate-600 mt-1">Dibuat dengan Laravel, React & Tailwind CSS.</p>
                    </div>
                </div>
            </footer>

            {/* Sticky Floating WA Widget */}
            <a
                href={generalWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition duration-300 transform hover:scale-110 active:scale-95 group"
                title="Tanya Admin via WhatsApp"
            >
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.38 9.863-9.764.002-2.607-1.01-5.059-2.85-6.902C16.643 2.097 14.195.84 11.586.84c-5.447 0-9.871 4.38-9.877 9.766-.002 1.8.48 3.56 1.393 5.117L2.1 21.847l5.547-1.458zm9.957-6.883c-.27-.135-1.595-.788-1.843-.878-.247-.09-.428-.135-.609.135-.18.27-.697.878-.855 1.058-.158.18-.315.202-.586.067-.27-.135-1.14-.42-2.172-1.341-.803-.715-1.344-1.602-1.502-1.872-.158-.27-.017-.417.118-.552.122-.122.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.609-1.464-.834-2.005-.22-.527-.44-.455-.609-.464-.158-.007-.338-.007-.518-.007-.18 0-.473.068-.72.337-.248.27-.946.923-.946 2.25s.968 2.61 1.103 2.79c.135.18 1.905 2.91 4.615 4.08.644.278 1.148.444 1.54.568.647.206 1.236.177 1.702.107.519-.078 1.595-.652 1.82-1.282.225-.63.225-1.17.157-1.282-.067-.113-.247-.18-.517-.315z" />
                </svg>
                <span className="absolute right-16 scale-0 group-hover:scale-100 bg-slate-900 border border-slate-800 text-slate-100 text-xs font-bold py-2 px-4 rounded-xl whitespace-nowrap shadow-2xl transition duration-300 pointer-events-none">
                    Tanya Kelistrikan WA 💬
                </span>
            </a>
        </div>
    );
}