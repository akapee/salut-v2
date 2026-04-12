"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { 
  FaPlus, FaPen, FaTrash, FaMagnifyingGlass, 
  FaHouse, FaRegCalendarCheck, FaUsers, FaGear, 
  FaArrowRightFromBracket, FaXmark, FaSpinner
} from "react-icons/fa6";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"events" | "team">("events");
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Auth Guard: Cek sesi login saat halaman pertama kali dimuat
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Belum login — tendang ke halaman login
        router.replace("/admin/login");
      } else {
        setIsAuthChecking(false);
      }
    };
    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Tampilkan loading screen saat mengecek status autentikasi
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-4">
        <FaSpinner className="w-10 h-10 animate-spin text-[#1864FF]" />
        <p className="text-slate-600 font-bold">Memverifikasi akses admin...</p>
      </div>
    );
  }

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
          <button 
            onClick={() => setActiveTab("events")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-left ${activeTab === 'events' ? 'bg-white/20 text-white font-bold shadow-inner border border-white/10' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
          >
            <FaRegCalendarCheck /> Kelola Event (DB)
          </button>
          <button 
            onClick={() => setActiveTab("team")} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-left ${activeTab === 'team' ? 'bg-white/20 text-white font-bold shadow-inner border border-white/10' : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
          >
            <FaUsers /> Kelola Pengurus
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-white/10 hover:text-white rounded-xl transition-colors font-medium text-left">
            <FaGear /> Pengaturan Lain
          </button>
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
          <h1 className="text-2xl font-bold text-slate-800">
            {activeTab === 'events' ? "Publikasi Event & Berita" : "Manajemen Pengurus (Tentang Kami)"}
          </h1>
          
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

        {/* Dynamic Tab Workspace */}
        <div className="p-8 flex-1 overflow-y-auto">
          {activeTab === "events" && <EventsManager />}
          {activeTab === "team" && <TeamManager />}
        </div>
      </main>
    </div>
  );
}

/* =========================================
   KOMPONEN TAB 1: MANAJEMEN EVENTS
========================================= */
function EventsManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: 0, title: "", date: "", category: "", status: "Published", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('events').select('*').order('id', { ascending: false });
      if (error) throw new Error(error.message);
      setEvents(data || []);
      setErrorText("");
    } catch (err: any) {
      console.error(err);
      setErrorText("Gagal menarik data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({ id: 0, title: "", date: "", category: "", status: "Published", description: "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: any) => {
    setIsEditMode(true);
    setFormData({
      id: event.id, title: event.title || "", date: event.date || "",
      category: event.category || "", status: event.status || "Published", description: event.description || ""
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin hapus event ini?")) return;
    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (!error) { setEvents(events.filter(e => e.id !== id)); alert("Terhapus!"); } 
      else { alert("Gagal: " + error.message); }
    } catch (err) { alert("Koneksi terputus."); }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('event-banners').upload(fileName, imageFile);
        if (uploadError) throw new Error("Gagal mengunggah gambar: " + uploadError.message);
        const { data: publicUrlData } = supabase.storage.from('event-banners').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload: any = { title: formData.title, date: formData.date, category: formData.category, status: formData.status, description: formData.description };
      if (imageUrl) payload.image_path = imageUrl;
      
      let dbError;
      if (isEditMode) {
        const { error } = await supabase.from('events').update(payload).eq('id', formData.id);
        dbError = error;
      } else {
        const { error } = await supabase.from('events').insert([payload]);
        dbError = error;
      }

      if (dbError) throw new Error("Simpan ke DB gagal: " + dbError.message);
      alert("Tersimpan!");
      fetchEvents();
      setIsModalOpen(false);
    } catch (err: any) { alert("Error: " + err.message); }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e: any) => { if (e.target.files && e.target.files.length > 0) setImageFile(e.target.files[0]); };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-96">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input readOnly type="text" placeholder="Cari event..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-slate-400 cursor-not-allowed shadow-sm" />
        </div>
        <button onClick={handleAddNew} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1864FF] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:-translate-y-0.5">
          <FaPlus /> Tambah Event Baru
        </button>
      </div>

      {errorText && <div className="p-4 mb-6 text-sm text-rose-800 rounded-xl bg-rose-50 border border-rose-200"><strong className="font-bold">Error!</strong> {errorText}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[400px]">
        {isLoading && <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-[#1864FF]"><FaSpinner className="w-10 h-10 animate-spin mb-4" /><p className="font-bold">Memuat...</p></div>}
        
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-600">
              <tr>
                <th className="py-4 px-6 font-bold text-sm">ID</th>
                <th className="py-4 px-6 font-bold text-sm">Judul Berita/Banner</th>
                <th className="py-4 px-6 font-bold text-sm">Kategori</th>
                <th className="py-4 px-6 font-bold text-sm">Tanggal</th>
                <th className="py-4 px-6 font-bold text-sm">Status</th>
                <th className="py-4 px-6 font-bold text-sm text-center">Aksi Live</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-blue-600">#{event.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-800 flex items-center gap-4">
                    {event.image_path ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={event.image_path} alt="cover" className="w-10 h-10 object-cover rounded shadow-sm border border-gray-200" />
                    ) : <div className="w-10 h-10 rounded bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">NaN</div>}
                    <span>{event.title.length > 30 ? event.title.substring(0, 30) + "..." : event.title}</span>
                  </td>
                  <td className="py-4 px-6 text-sm"><span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium">{event.category}</span></td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-600">{event.date}</td>
                  <td className="py-4 px-6 text-sm"><span className={`px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-wide ${event.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{event.status}</span></td>
                  <td className="py-4 px-6 flex justify-center gap-3">
                    <button onClick={() => handleEdit(event)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 bg-white"><FaPen /></button>
                    <button onClick={() => handleDelete(event.id)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200 bg-white"><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {!isLoading && events.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-slate-500 font-medium">Belum ada data event.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-slate-800">{isEditMode ? "Ubah Event" : "Push Event Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"><FaXmark className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="crudApiForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Unggah Banner Baru</label>
                  <label htmlFor="image-upload" className={`w-full border-2 border-dashed ${imageFile ? 'border-[#1864FF] bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} rounded-xl p-8 text-center flex flex-col items-center transition-colors cursor-pointer relative`}>
                    <FaRegCalendarCheck className={`w-8 h-8 mb-2 ${imageFile ? 'text-[#1864FF]' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${imageFile ? 'text-[#1864FF]' : 'text-gray-500'}`}>{imageFile ? `${imageFile.name}` : 'Klik untuk meramban gambar (JPG, PNG)'}</span>
                    <input id="image-upload" type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Judul</label><input required name="title" value={formData.title} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF]" /></div>
                <div className="grid grid-cols-2 gap-6">
                  <div><label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label><input required name="date" value={formData.date} onChange={handleChange} type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF]" /></div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                    <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF]">
                      <option value="">Pilih Kategori...</option><option value="Seminar">Seminar</option><option value="Workshop">Workshop</option><option value="Berita Kampus">Berita Kampus</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                  <select required name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF]">
                    <option value="Published">Published</option><option value="Draft">Draft</option>
                  </select>
                </div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Lengkap</label><textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] resize-none"></textarea></div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-4 rounded-b-3xl">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-600 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
              <button form="crudApiForm" type="submit" className="px-6 py-3 font-bold text-white bg-[#1864FF] hover:bg-blue-700 rounded-xl shadow-md transition-all">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================
   KOMPONEN TAB 2: MANAJEMEN TEAM MEMBERS
========================================= */
function TeamManager() {
  const [team, setTeam] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: "", role: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('team_members').select('*').order('id', { ascending: true });
      if (error) throw new Error(error.message);
      setTeam(data || []);
      setErrorText("");
    } catch (err: any) {
      console.error(err);
      setErrorText("Gagal menarik data tim.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleAddNew = () => {
    setIsEditMode(false);
    setFormData({ id: 0, name: "", role: "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (member: any) => {
    setIsEditMode(true);
    setFormData({ id: member.id, name: member.name || "", role: member.role || "" });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Hapus pengurus ini?")) return;
    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (!error) { setTeam(team.filter(t => t.id !== id)); alert("Berhasil dihapus!"); }
      else { alert("Gagal menghapus: " + error.message); }
    } catch (err) { alert("Koneksi terputus."); }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('team-profiles').upload(fileName, imageFile);
        if (uploadError) throw new Error("Gagal mengunggah foto: " + uploadError.message);
        const { data: publicUrlData } = supabase.storage.from('team-profiles').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload: any = { name: formData.name, role: formData.role };
      if (imageUrl) payload.image_url = imageUrl;
      
      let dbError;
      if (isEditMode) {
        const { error } = await supabase.from('team_members').update(payload).eq('id', formData.id);
        dbError = error;
      } else {
        const { error } = await supabase.from('team_members').insert([payload]);
        dbError = error;
      }

      if (dbError) throw new Error("Gagal database: " + dbError.message);
      alert("Tersimpan!");
      fetchTeam();
      setIsModalOpen(false);
    } catch (err: any) { alert("Error: " + err.message); }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e: any) => { if (e.target.files && e.target.files.length > 0) setImageFile(e.target.files[0]); };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full sm:w-96">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input readOnly type="text" placeholder="Cari..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-slate-400 cursor-not-allowed shadow-sm" />
        </div>
        <button onClick={handleAddNew} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1864FF] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:-translate-y-0.5">
          <FaPlus /> Tambah Tim Baru
        </button>
      </div>

      {errorText && <div className="p-4 mb-6 text-sm text-rose-800 rounded-xl bg-rose-50 border border-rose-200"><strong className="font-bold">Error!</strong> {errorText}</div>}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[400px]">
        {isLoading && <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-[#1864FF]"><FaSpinner className="w-10 h-10 animate-spin mb-4" /><p className="font-bold">Memuat...</p></div>}
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left">
            <thead className="bg-slate-50 border-b border-gray-200 text-slate-600">
              <tr>
                <th className="py-4 px-6 font-bold text-sm">ID</th><th className="py-4 px-6 font-bold text-sm">Foto</th><th className="py-4 px-6 font-bold text-sm">Nama Lengkap</th><th className="py-4 px-6 font-bold text-sm">Jabatan</th><th className="py-4 px-6 font-bold text-sm text-center">Aksi Live</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-blue-600">#{member.id}</td>
                  <td className="py-4 px-6">
                    {member.image_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={member.image_url} alt="Profile" className="w-12 h-12 object-cover rounded-full shadow-sm border-2 border-white drop-shadow-sm" />
                    ) : <div className="w-12 h-12 rounded-full bg-gray-100 border flex items-center justify-center text-xs text-gray-400">NaN</div>}
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-800">{member.name}</td>
                  <td className="py-4 px-6 text-sm"><span className="px-3 py-1 bg-[#1864FF]/10 text-[#1864FF] rounded-lg font-bold">{member.role}</span></td>
                  <td className="py-4 px-6 flex justify-center gap-3">
                    <button onClick={() => handleEdit(member)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 bg-white"><FaPen /></button>
                    <button onClick={() => handleDelete(member.id)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200 bg-white"><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {!isLoading && team.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-slate-500 font-medium">Belum ada data Pengurus.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-slate-800">{isEditMode ? "Ubah Data Tim" : "Tambah Pengurus Baru"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"><FaXmark className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form id="teamForm" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Foto Profil</label>
                  <label htmlFor="image-upload-team" className={`w-full border-2 border-dashed ${imageFile ? 'border-[#1864FF] bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} rounded-xl p-8 text-center flex flex-col items-center transition-colors cursor-pointer`}>
                    <FaUsers className={`w-8 h-8 mb-2 ${imageFile ? 'text-[#1864FF]' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${imageFile ? 'text-[#1864FF]' : 'text-gray-500'}`}>{imageFile ? `${imageFile.name} siap` : 'Klik untuk memilih foto'}</span>
                    <input id="image-upload-team" type="file" name="image" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label><input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF]" /></div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">Jabatan</label><input required name="role" value={formData.role} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF]" /></div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-3xl">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 font-bold text-slate-600 hover:bg-gray-200 rounded-xl transition-colors">Batal</button>
              <button form="teamForm" type="submit" className="px-5 py-2.5 font-bold text-white bg-[#1864FF] hover:bg-blue-700 rounded-xl shadow-md transition-all">Simpan Profil</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
