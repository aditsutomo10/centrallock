import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Dashboard({ auth, services = [] }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Categories list for option menus
    const categories = [
        { id: 'spion', label: 'Spion (Aksesoris)' },
        { id: 'lampu', label: 'Lampu (Aksesoris)' },
        { id: 'alarm', label: 'Alarm & Central Lock (Aksesoris)' },
        { id: 'android', label: 'Tape Android (Aksesoris)' },
        { id: 'tape_manual', label: 'Tape Manual (Aksesoris)' },
        { id: 'sarung_setir', label: 'Sarung Setir (Aksesoris)' },
        { id: 'setir', label: 'Setir Mobil (Aksesoris)' },
        { id: 'jok_setir', label: 'Jok Setir (Aksesoris)' },
        { id: 'power', label: 'Power Audio (Aksesoris)' },
        { id: 'poles_lampu', label: 'Jasa Poles Lampu' },
        { id: 'power_window', label: 'Jasa Power Window' },
        { id: 'kelistrikan', label: 'Jasa Kelistrikan' },
    ];

    // Inertia form for adding new item
    const {
        data: addData,
        setData: setAddData,
        post: addPost,
        reset: resetAddForm,
        errors: addErrors,
        processing: addProcessing
    } = useForm({
        name: '',
        type: 'product',
        category: 'spion',
        description: '',
        price: '',
        image: null,
        image_url: '',
        is_available: true,
    });

    // Inertia form for editing item
    const {
        data: editData,
        setData: setEditData,
        post: editPost,
        errors: editErrors,
        processing: editProcessing
    } = useForm({
        name: '',
        type: 'product',
        category: 'spion',
        description: '',
        price: '',
        image: null,
        image_url: '',
        is_available: true,
    });

    // Open add modal
    const openAddModal = () => {
        resetAddForm();
        setIsAddModalOpen(true);
    };

    // Submit add form
    const handleAddSubmit = (e) => {
        e.preventDefault();
        addPost(route('admin.services.store'), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                resetAddForm();
            }
        });
    };

    // Open edit modal
    const openEditModal = (item) => {
        setEditingItem(item);
        setEditData({
            name: item.name,
            type: item.type,
            category: item.category,
            description: item.description,
            price: item.price || '',
            image: null,
            image_url: item.image_path.startsWith('/storage') ? '' : item.image_path,
            is_available: !!item.is_available,
        });
        setIsEditModalOpen(true);
    };

    // Submit edit form
    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Since we want to support file uploads, we POST to the update route which Laravel handles
        editPost(route('admin.services.update', editingItem.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingItem(null);
            }
        });
    };

    // Delete item action
    const handleDeleteItem = (item) => {
        if (confirm(`Apakah Anda yakin ingin menghapus "${item.name}"?`)) {
            router.delete(route('admin.services.destroy', item.id));
        }
    };

    // Statistics calculations
    const stats = {
        total: services.length,
        products: services.filter(s => s.type === 'product').length,
        services: services.filter(s => s.type === 'service').length,
        unavailable: services.filter(s => !s.is_available).length,
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-extrabold text-2xl text-slate-800 leading-tight">Dashboard Owner (Admin)</h2>}
        >
            <Head title="Dashboard Owner - Central Otomotif" />

            <div className="py-12 bg-slate-50 min-h-screen text-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Total Barang & Jasa</span>
                            <span className="text-3xl font-black text-slate-900">{stats.total}</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Kategori Aksesoris</span>
                            <span className="text-3xl font-black text-orange-600">{stats.products}</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Kategori Jasa Servis</span>
                            <span className="text-3xl font-black text-blue-600">{stats.services}</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider block mb-1">Tidak Tersedia</span>
                            <span className="text-3xl font-black text-red-600">{stats.unavailable}</span>
                        </div>
                    </div>

                    {/* Main Catalog Management Box */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-3xl border border-slate-250 p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-slate-950">Daftar Katalog Bengkel</h3>
                                <p className="text-sm text-slate-500 mt-1">Kelola data aksesoris mobil dan jasa servis yang ditampilkan di halaman utama.</p>
                            </div>
                            <button
                                onClick={openAddModal}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] text-sm"
                            >
                                + Tambah Item Baru
                            </button>
                        </div>

                        {/* Responsive Table */}
                        <div className="overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">Info Item</th>
                                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">Tipe</th>
                                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">Kategori</th>
                                        <th className="p-4 text-left text-xs font-bold uppercase tracking-wider">Harga</th>
                                        <th className="p-4 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                                        <th className="p-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {services.length > 0 ? services.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                            {/* Name & Desc */}
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.image_path}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded-lg border border-slate-200 bg-slate-100"
                                                    />
                                                    <div className="max-w-xs md:max-w-md">
                                                        <h4 className="font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                                                        <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="p-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    item.type === 'product' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                }`}>
                                                    {item.type === 'product' ? 'Aksesoris' : 'Jasa'}
                                                </span>
                                            </td>

                                            {/* Category */}
                                            <td className="p-4 font-semibold text-sm text-slate-700 uppercase">
                                                {item.category.replace('_', ' ')}
                                            </td>

                                            {/* Price */}
                                            <td className="p-4 font-bold text-sm text-slate-900">
                                                {item.price ? `Rp ${item.price.toLocaleString('id-ID')}` : 'Hubungi Kami'}
                                            </td>

                                            {/* Availability */}
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                    item.is_available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {item.is_available ? 'Tersedia' : 'Kosong'}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="text-slate-600 hover:text-orange-600 font-bold text-sm transition"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteItem(item)}
                                                        className="text-red-500 hover:text-red-700 font-bold text-sm transition"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="p-16 text-center text-slate-500 font-medium">
                                                Belum ada katalog barang atau jasa. Klik "Tambah Item Baru" untuk memasukkan item pertama!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL: ADD ITEM */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
                        <h3 className="text-xl font-black text-slate-950 mb-6Skor">Tambah Item Baru</h3>

                        <form onSubmit={handleAddSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Nama Barang / Jasa</label>
                                <input
                                    type="text"
                                    required
                                    value={addData.name}
                                    onChange={e => setAddData('name', e.target.value)}
                                    placeholder="Contoh: Lampu LED H4 Projector"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-0 text-slate-900 outline-none transition"
                                />
                                {addErrors.name && <p className="text-xs text-red-600 mt-1">{addErrors.name}</p>}
                            </div>

                            {/* Type & Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tipe</label>
                                    <select
                                        value={addData.type}
                                        onChange={e => setAddData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 text-slate-900 outline-none"
                                    >
                                        <option value="product">Aksesoris (Barang)</option>
                                        <option value="service">Jasa Servis</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Kategori</label>
                                    <select
                                        value={addData.category}
                                        onChange={e => setAddData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 text-slate-900 outline-none"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Harga (Rp - Kosongkan jika Hubungi Kami)</label>
                                <input
                                    type="number"
                                    value={addData.price}
                                    onChange={e => setAddData('price', e.target.value)}
                                    placeholder="Contoh: 150000"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-0 text-slate-900 outline-none transition"
                                />
                                {addErrors.price && <p className="text-xs text-red-600 mt-1">{addErrors.price}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Deskripsi Lengkap</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={addData.description}
                                    onChange={e => setAddData('description', e.target.value)}
                                    placeholder="Jelaskan spesifikasi barang atau deskripsi pengerjaan jasa..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-0 text-slate-900 outline-none transition resize-none"
                                ></textarea>
                                {addErrors.description && <p className="text-xs text-red-600 mt-1">{addErrors.description}</p>}
                            </div>

                            {/* Image Choice */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Gambar Item (Pilih salah satu)</span>
                                
                                {/* Image File Upload */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Unggah Berkas Gambar</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setAddData('image', e.target.files[0])}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-350 transition"
                                    />
                                    {addErrors.image && <p className="text-xs text-red-600 mt-1">{addErrors.image}</p>}
                                </div>

                                <div className="text-center font-bold text-xs text-slate-400">— ATAU —</div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tautan Gambar (URL Unsplash / Daring)</label>
                                    <input
                                        type="url"
                                        value={addData.image_url}
                                        onChange={e => setAddData('image_url', e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 text-slate-900 text-sm outline-none"
                                    />
                                    {addErrors.image_url && <p className="text-xs text-red-600 mt-1">{addErrors.image_url}</p>}
                                </div>
                            </div>

                            {/* Availability Toggle */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="add_is_available"
                                    checked={addData.is_available}
                                    onChange={e => setAddData('is_available', e.target.checked)}
                                    className="rounded border-slate-300 text-slate-900 focus:ring-0"
                                />
                                <label htmlFor="add_is_available" className="text-sm font-bold text-slate-700">Tampilkan Item / Tersedia</label>
                            </div>

                            {/* Form Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={addProcessing}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition disabled:opacity-50"
                                >
                                    {addProcessing ? 'Menyimpan...' : 'Simpan Item'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: EDIT ITEM */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
                        <h3 className="text-xl font-black text-slate-950 mb-6">Ubah Item Katalog</h3>

                        <form onSubmit={handleEditSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Nama Barang / Jasa</label>
                                <input
                                    type="text"
                                    required
                                    value={editData.name}
                                    onChange={e => setEditData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-0 text-slate-900 outline-none transition"
                                />
                                {editErrors.name && <p className="text-xs text-red-600 mt-1">{editErrors.name}</p>}
                            </div>

                            {/* Type & Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Tipe</label>
                                    <select
                                        value={editData.type}
                                        onChange={e => setEditData('type', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 text-slate-900 outline-none"
                                    >
                                        <option value="product">Aksesoris (Barang)</option>
                                        <option value="service">Jasa Servis</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Kategori</label>
                                    <select
                                        value={editData.category}
                                        onChange={e => setEditData('category', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 text-slate-900 outline-none"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Harga (Rp - Kosongkan jika Hubungi Kami)</label>
                                <input
                                    type="number"
                                    value={editData.price}
                                    onChange={e => setEditData('price', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-0 text-slate-900 outline-none transition"
                                />
                                {editErrors.price && <p className="text-xs text-red-600 mt-1">{editErrors.price}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Deskripsi Lengkap</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={editData.description}
                                    onChange={e => setEditData('description', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-0 text-slate-900 outline-none transition resize-none"
                                ></textarea>
                                {editErrors.description && <p className="text-xs text-red-600 mt-1">{editErrors.description}</p>}
                            </div>

                            {/* Image Choice */}
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Gambar Item (Biarkan kosong jika tidak diubah)</span>
                                
                                {/* Image File Upload */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Unggah Berkas Baru</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setEditData('image', e.target.files[0])}
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-350 transition"
                                    />
                                    {editErrors.image && <p className="text-xs text-red-600 mt-1">{editErrors.image}</p>}
                                </div>

                                <div className="text-center font-bold text-xs text-slate-400">— ATAU —</div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tautan Gambar (URL Baru)</label>
                                    <input
                                        type="url"
                                        value={editData.image_url}
                                        onChange={e => setEditData('image_url', e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-slate-800 text-slate-900 text-sm outline-none"
                                    />
                                    {editErrors.image_url && <p className="text-xs text-red-600 mt-1">{editErrors.image_url}</p>}
                                </div>
                            </div>

                            {/* Availability Toggle */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="edit_is_available"
                                    checked={editData.is_available}
                                    onChange={e => setEditData('is_available', e.target.checked)}
                                    className="rounded border-slate-300 text-slate-900 focus:ring-0"
                                />
                                <label htmlFor="edit_is_available" className="text-sm font-bold text-slate-700">Tampilkan Item / Tersedia</label>
                            </div>

                            {/* Form Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditingItem(null);
                                    }}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition disabled:opacity-50"
                                >
                                    {editProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}