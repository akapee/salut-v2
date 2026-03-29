import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { FaCalendar, FaArrowLeft, FaTags, FaShareNodes } from "react-icons/fa6";
import { notFound } from "next/navigation";

// Mencegah cache statis Next.js agar selalu segar dari API Realtime
export const dynamic = 'force-dynamic';

// Fungsi Fetch Server untuk menarik 1 data spesifik berdasar ID
async function getEventDetails(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/events/${id}`, {
      cache: 'no-store'
    });
    
    // Jika event dihapus atau tidak ditemukan, kembalikan null untuk trigger halaman 404
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`API Error: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Gagal menarik detail event:", error);
    return null;
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Mengambil parameter ID dari URL (Next.js 15+ mengharuskan penantian / await untuk params)
  const resolvedParams = await params;
  const event = await getEventDetails(resolvedParams.id);

  // Memicu halaman Not Found 404 otomatis jika event bernilai null
  if (!event) {
    notFound(); 
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-20 pb-24">
        
        {/* Banner Cover Section */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] relative bg-slate-900 border-b-[6px] border-[#1864FF]">
          {event.image_path ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={event.image_path} 
              alt={event.title} 
              className="w-full h-full object-cover opacity-75"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/40 bg-[#1864FF]/5">
              <FaCalendar className="w-24 h-24 mb-6 opacity-30" />
              <p className="text-xl font-bold tracking-widest uppercase">Tanpa Gambar Sampul</p>
            </div>
          )}
          
          {/* Gradient Overlay untuk membuat tulisan putih terbaca */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full">
            <div className="max-w-4xl mx-auto px-6 pb-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-5 py-2 bg-[#fbbf24] text-slate-900 text-xs md:text-sm font-black tracking-wider rounded-lg shadow-sm uppercase">
                  {event.category}
                </span>
                <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-lg shadow-sm border border-white/20 flex items-center gap-2">
                  <FaCalendar /> {event.date}
                </span>
                <span className={`px-4 py-2 bg-white/5 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/10 ml-auto ${event.status === 'Draft' ? 'text-red-400' : 'text-green-400'}`}>
                  • {event.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white leading-tight drop-shadow-xl">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Body Section */}
        <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-14">
            
            {/* Top Bar Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-10 border-b border-gray-100">
              <Link href="/event" className="inline-flex items-center gap-3 text-slate-500 hover:text-[#1864FF] transition-colors font-bold group">
                <div className="p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </div>
                Kembali ke Daftar Event
              </Link>
              
              <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                <button className="flex items-center gap-2 hover:text-[#1864FF] transition-colors px-4 py-2 border border-gray-200 rounded-xl hover:border-blue-200 hover:bg-blue-50">
                  <FaShareNodes /> Bagikan Info
                </button>
              </div>
            </div>

            {/* Main Text Content */}
            <article className="prose prose-lg prose-slate max-w-none">
              {event.description.split('\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-slate-700 leading-loose mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </article>

            <blockquote className="mt-12 p-6 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-xl">
              <p className="text-slate-700 font-medium italic">
                Bagi mahasiswa aktif Universitas Terbuka, perhatikan kembali seluruh detail tanggal dan kelengkapan administrasi sebelum mengikuti rangkaian kegiatan di atas. Info kepanitiaan lebih lanjut dapat disampaikan ke Sekretariat Salut Lentera.
              </p>
            </blockquote>

            {/* Footer Metadata */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between bg-slate-50 p-8 rounded-2xl">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1864FF] to-blue-400 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
                  AD
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">Dipublikasikan Oleh Sistem Admin</p>
                  <p className="text-sm text-slate-500">Salut Lentera - Universitas Terbuka</p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 flex items-center gap-2 text-sm font-bold text-[#1864FF] bg-blue-100 px-4 py-2 rounded-xl">
                <FaTags /> Tag Kategori: {event.category}
              </div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
