import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaCalendar, FaArrowRight } from "react-icons/fa6";

export const metadata = {
  title: "Event & Kegiatan | Universitas Terbuka",
  description: "Daftar acara, seminar, dan kegiatan terbaru di lingkungan Universitas Terbuka.",
};

// Konfigurasi Next.js untuk mencegah cache statis agar data selalu ter-update (real-time).
export const dynamic = 'force-dynamic';

// Fungsi Fetching Server-Side (Langsung di-compile di server sebelum dikirim ke Browser)
async function fetchEventsFromLaravel() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/events", {
      cache: 'no-store' // Memastikan tidak ada caching HTTP
    });
    
    if (!res.ok) {
      console.warn("API Laravel merespons dengan error.");
      return [];
    }
    
    return await res.json();
  } catch (error) {
    console.error("Gagal terhubung ke Laravel:", error);
    return []; // Kembalikan array kosong jika server mati
  }
}

export default async function EventPage() {
  // Mengeksekusi penarikan data dari database melalui API
  const allEvents = await fetchEventsFromLaravel();
  
  // Filter khusus untuk hanya menampilkan acara yang berstatus "Published" (Terbit Secara Publik)
  const publishedEvents = allEvents.filter((event: any) => event.status === "Published");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 font-bold mb-6">
              Event & Kegiatan Terbaru
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Ikuti berbagai seminar, workshop, dan acara menarik lainnya untuk terus memperluas wawasan akademik dan jaringan Anda.
            </p>
          </div>

          {publishedEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Belum Ada Event Aktif</h3>
              <p className="text-slate-500 max-w-md mx-auto">Saat ini belum ada event atau berita terbaru yang dipublikasikan dari sistem. Silakan cek kembali nanti.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publishedEvents.map((event: any) => (
                <div 
                  key={event.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 flex flex-col h-full group"
                >
                  {/* Banner/Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gray-200 shrink-0 flex items-center justify-center">
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur text-[#1864FF] text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
                      {event.category || "Berita"}
                    </div>
                    
                    {event.image_path ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img 
                        src={event.image_path} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      />
                    ) : (
                      <span className="text-gray-400 font-medium text-sm flex items-center gap-2">
                        <FaCalendar /> Tanpa Gambar Banner
                      </span>
                    )}
                  </div>
                  
                  {/* Content Deskripsi */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-3 font-semibold">
                      <FaCalendar className="text-[#1864FF] w-4 h-4" />
                      {event.date}
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug line-clamp-2">
                      {event.title}
                    </h2>
                    
                    <p className="text-sm text-slate-600 mb-6 line-clamp-3 text-ellipsis flex-1 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {/* Aksi Button */}
                    <div className="mt-auto pt-2">
                      <Link 
                        href={`/event/${event.id}`} 
                        className="inline-flex items-center justify-center w-full gap-2 px-4 py-3.5 bg-blue-50/50 text-[#1864FF] font-bold rounded-xl hover:bg-[#1864FF] hover:text-white transition-colors duration-300 border border-blue-100"
                      >
                        Baca Selengkapnya
                        <FaArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
