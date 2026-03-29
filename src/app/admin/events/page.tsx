"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { 
  FaPlus, FaPen, FaTrash, FaMagnifyingGlass, 
  FaHouse, FaRegCalendarCheck, FaUsers, FaGear, 
  FaArrowRightFromBracket, FaXmark, FaSpinner
} from "react-icons/fa6";

export default function AdminEvents() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: 0, title: "", date: "", category: "", status: "Published", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const API_URL = "http://127.0.0.1:8000/api/events";

  // 1. Fetch Data (Read)
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { 
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get("auth_token")}`
        }
      });
      if (!res.ok) throw new Error("Gagal terhubung ke API / Status: " + res.status);
      const data = await res.json();
      setEvents(data);
      setErrorText("");
    } catch (err: any) {
      console.error(err);
      setErrorText("Gagal menarik data. Pastikan Laravel menyala ('php artisan serve') di port 8000 dan CORS aktif.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Open Modal for Create
  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({ id: 0, title: "", date: "", category: "", status: "Published", description: "" });
    setImageFile(null); // Reset File Selector
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEdit = (event: any) => {
    setIsEditMode(true);
    setFormData({
      id: event.id,
      title: event.title || "",
      date: event.date || "",
      category: event.category || "",
      status: event.status || "Published",
      description: event.description || ""
    });
    setImageFile(null); // Reset File Selector
    setIsModalOpen(true);
  };

  // Delete Action via API
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus event ini secara permanen dari Database?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { 
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get("auth_token")}`
        }
      });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
        alert("Event sukses dihapus dari Database Laravel!");
      } else {
        alert("Mohon maaf, API gagal menghapus event. Kode HTTP: " + res.status);
      }
    } catch (err) {
      alert("Sepertinya koneksi terputus. Cek kembali backend Laravel Anda.");
    }
  };

  // Submit Form (Create/Update via API dengan Dukungan FormData)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Gunakan FormData karena formulir ini mengirim file mutipart
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("date", formData.date);
      payload.append("category", formData.category);
      payload.append("status", formData.status);
      payload.append("description", formData.description);

      // Selipkan file gambar murni jika user mengisinya
      if (imageFile) {
        payload.append("image", imageFile);
      }

      let url = API_URL;
      
      // Khusus Laravel: Kirim File Gambar untuk Edit Data wajib dipalsukan via POST _method PUT
      // (PHP tidak dapat mengurai Multipart form-data dalam mode PUT biasa).
      if (isEditMode) {
        url = `${API_URL}/${formData.id}`;
        payload.append("_method", "PUT"); 
      }

      const res = await fetch(url, {
        method: "POST", // Kita pasang mode POST karena FormData. Jika edit, sudah ditangani di atas.
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${Cookies.get("auth_token")}`
          // "Content-Type" JANGAN ditulis manual (Biarkan dibariskan otomatis oleh FormData)
        },
        body: payload
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Gagal menyunting database Laravel.");
      }

      const result = await res.json();
      alert(result.message); 
      
      // Auto refresh table after success
      fetchEvents();
      setIsModalOpen(false);
      
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleLogout = () => {
    Cookies.remove("auth_token", { path: '/' });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
      
      {/* Sidebar - Desktop Only */}
      <aside className="w-64 bg-[#1864FF] text-white hidden md:flex flex-col h-screen fixed left-0 top-0 z-20 shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-xl">
              <FaRegCalendarCheck className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight font-serif">
              Salut<span className="text-yellow-400">Admin</span>
            </span>
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto w-full">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-xl transition-colors font-medium">
            <FaHouse /> Dashboard
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 bg-white/20 text-white rounded-xl transition-colors font-bold shadow-inner border border-white/10">
            <FaRegCalendarCheck /> Kelola Event (DB)
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-xl transition-colors font-medium">
            <FaUsers /> Data Pendaftar
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-xl transition-colors font-medium">
            <FaGear /> Pengaturan API
          </Link>
        </div>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-rose-500 hover:text-white rounded-xl transition-colors font-medium text-left">
            <FaArrowRightFromBracket /> Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col">
        {/* Header Bar */}
        <header className="bg-white h-20 border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-800">Manajemen Event & Berita Laravel</h1>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#1864FF] font-bold border-2 border-[#1864FF]">
              LA
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">Admin System</p>
              <p className="text-xs text-slate-500">api@salutlentera.com</p>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-8 flex-1 overflow-y-auto">
          
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                readOnly
                type="text" 
                placeholder="Cari event (Terkoneksi API)..." 
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-slate-400 focus:outline-none cursor-not-allowed shadow-sm"
              />
            </div>
            <button 
              onClick={handleAddNew}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1864FF] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <FaPlus /> Tambah Data Baru
            </button>
          </div>

          {/* Alert Message Box for API Error */}
          {errorText && (
            <div className="p-4 mb-6 text-sm text-rose-800 rounded-xl bg-rose-50 border border-rose-200">
              <strong className="font-bold flex gap-2"><FaTrash className="w-4 h-4"/> Akses Database Gagal!</strong> {errorText}
            </div>
          )}

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[400px]">
            {isLoading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-[#1864FF]">
                <FaSpinner className="w-10 h-10 animate-spin mb-4" />
                <p className="font-bold">Menghubungkan ke API Laravel Anda...</p>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap text-left">
                <thead className="bg-slate-50 border-b border-gray-200 text-slate-600">
                  <tr>
                    <th className="py-4 px-6 font-bold text-sm">ID</th>
                    <th className="py-4 px-6 font-bold text-sm">Judul Berita/Banner</th>
                    <th className="py-4 px-6 font-bold text-sm">Kategori</th>
                    <th className="py-4 px-6 font-bold text-sm">Tanggal Acara</th>
                    <th className="py-4 px-6 font-bold text-sm">Status</th>
                    <th className="py-4 px-6 font-bold text-sm text-center">Aksi Live</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {events.map((event, idx) => (
                    <tr key={event.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-blue-600">#{event.id}</td>
                      <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-4">
                        {event.image_path ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={event.image_path} alt="cover" className="w-10 h-10 object-cover rounded shadow-sm border border-gray-200" />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">NaN</div>
                        )}
                        <span>{event.title.length > 30 ? event.title.substring(0, 30) + "..." : event.title}</span>
                      </td>
                      <td className="py-4 px-6 text-sm">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">{event.category}</span>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-600">{event.date}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-wide ${event.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex justify-center gap-3">
                        <button onClick={() => handleEdit(event)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 bg-white" title="Edit Data dari Database">
                          <FaPen />
                        </button>
                        <button onClick={() => handleDelete(event.id)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200 bg-white" title="Hapus Permanen dari MySQL">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!isLoading && events.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-medium">
                        Belum ada row data/tabel event ditemukan di Database Laravel Anda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-slate-500">
              <p>Total data tertarik: <span className="font-bold text-slate-900">{events.length}</span> *baris row* (Tabel Events).</p>
            </div>
          </div>

        </div>
      </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {isEditMode ? "Tulis Ulang Event via API" : "Push Event Baru ke Laravel"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Sistem akan memecah file gambar sebagai Multipart / Form-Data.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors">
                <FaXmark className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {/* Penting: Enctype multipart diperlukan untuk form HTML, namun karena kita menggunakan 'FormData' di javascript fetch, hal itu otomatis.*/}
              <form id="crudApiForm" onSubmit={handleSubmit} className="space-y-6">
                
                {/* File/Image Upload Section Aktif */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Unggah Gambar / Sampul Banner <span className="text-slate-400 font-normal">(Maks. 2MB)</span></label>
                  <label htmlFor="image-upload" className={`w-full border-2 border-dashed ${imageFile ? 'border-[#1864FF] bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} rounded-xl p-8 text-center flex flex-col items-center transition-colors cursor-pointer relative`}>
                    <FaRegCalendarCheck className={`w-8 h-8 mb-2 ${imageFile ? 'text-[#1864FF]' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${imageFile ? 'text-[#1864FF]' : 'text-gray-500'}`}>
                      {imageFile ? `📸 ${imageFile.name} (Telah Menggantung)` : 'Klik untuk meramban gambar (JPG, PNG)'}
                    </span>
                    <input id="image-upload" type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Judul Event / Berita <span className="text-red-500">*</span></label>
                  <input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF]" placeholder="Contoh: Info Akademik Terbaru..." />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Acara <span className="text-red-500">*</span></label>
                    <input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF]" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Utama <span className="text-red-500">*</span></label>
                    <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF]">
                      <option value="">Pilih Kategori Database...</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Sosialisasi">Sosialisasi</option>
                      <option value="Karir">Karir</option>
                      <option value="Kompetisi">Kompetisi</option>
                      <option value="Berita Kampus">Berita Kampus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status Server Publikasi <span className="text-red-500">*</span></label>
                  <select required name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF]">
                    <option value="Published">Terbit Sekarang (Published)</option>
                    <option value="Draft">Simpan Sebagai Draf (Draft)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Lengkap (Body Payload) <span className="text-red-500">*</span></label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF] resize-none leading-relaxed" placeholder="Tulis uraian acara ini..."></textarea>
                </div>

              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4 rounded-b-3xl">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-600 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
              <button form="crudApiForm" type="submit" className="px-6 py-3 font-bold text-white bg-[#1864FF] hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                Simpan & Unggah Gambar🚀
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
