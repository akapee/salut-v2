import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaRegBuilding, FaBullseye, FaPaperPlane, FaUserShield, FaUserGraduate, FaUserTie, FaUserCheck, FaUserAstronaut } from "react-icons/fa6";

export const metadata = {
  title: "Tentang Kami | Salut Lentera",
  description: "Profil organisasi, Visi Misi, Tim Pengurus, dan Hubungi Kami.",
};

const team = [
  {
    name: "Farah Sukma Wardani",
    role: "Direktur Utama",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Rifa Ulfa Ribadi",
    role: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Andy Kris Perdawan",
    role: "IT",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mela Cintyawati",
    role: "Layanan Konsultasi Mahasiswa",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Aziz ",
    role: "Humas dan Promosi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Yulita",
    role: "Administrasi",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  }
];

export default function TentangPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white pt-24 pb-0">

        {/* Section 1: Profil Salut Lentera */}
        <section className="py-20 lg:py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-xl bg-blue-50 border border-blue-100 text-[#1864FF] font-bold text-sm tracking-wide shadow-sm">
                  <FaRegBuilding className="mr-2" /> PROFIL LEMBAGA
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-8 leading-[1.15]">
                  Mengenal Lebih Dekat <br />
                  <span className="text-[#1864FF] relative inline-block">
                    Salut Lentera
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                    </svg>
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed font-medium">
                  Sentra Layanan Universitas Terbuka (SALUT) Lentera Purbalingga adalah pusat layanan pendidikan jarak jauh yang berdedikasi tinggi untuk memberikan pelayanan administratif dan pendampingan akademik terbaik.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Kami menjadi jembatan antara mahasiswa di daerah dengan seluruh fasilitas pusat UT, memastikan tidak asimetris informasi, serta meningkatkan motivasi, kualitas pembelajaran mandiri, dan kelulusan tepat waktu melalui layanan terpadu yang ramah dan suportif.
                </p>
              </div>
              <div className="w-full lg:w-1/2 relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#1864FF] rounded-full mix-blend-multiply opacity-50 blur-xl"></div>

                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Kegiatan Belajar Kampus"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Profil Pengurus (3 Columns, 2 Rows) */}
        <section className="bg-slate-50 py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Profil Pengurus Kami</h2>
              <p className="text-lg text-slate-600">
                Di balik layanan prima Salut Lentera, terdapat tim profesional yang penuh dedikasi dan tanggap dalam mendampingi perjalanan akademik seluruh mahasiswa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group text-center p-10 hover:-translate-y-2 relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1864FF] to-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-blue-50 group-hover:border-[#1864FF]/20 transition-colors p-1 bg-gray-50 drop-shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={`Foto pengurus - ${member.name}`}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#1864FF] font-bold text-sm">
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Visi Misi */}
        <section className="py-24 bg-[#1864FF] text-white relative overflow-hidden">
          {/* Subtle pattern background wrapper for solid contrast */}
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-5 bg-white/10 rounded-2xl mb-8 backdrop-blur shadow-inner">
                <FaBullseye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 drop-shadow-md">Visi & Misi Lembaga</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Visi */}
              <div className="bg-white/10 p-10 md:p-12 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-lg relative overflow-hidden group hover:bg-white/15 transition-colors">
                <div className="absolute -inset-10 bg-gradient-to-br from-yellow-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0 pointer-events-none" />
                <h3 className="text-3xl font-bold mb-6 text-[#fbbf24] relative z-10">Visi Kami</h3>
                <p className="text-lg md:text-xl leading-relaxed text-blue-50 font-medium relative z-10 drop-shadow-sm">
                  Menjadi penyedia layanan pendidikan tinggi jarak jauh yang paling diunggulkan, tepercaya, dan terdepan dalam mencetak lulusan cendekia yang berdaya saing global melalui sistem layanan mahasiswa yang fleksibel, inovatif, dan berintegritas.
                </p>
              </div>

              {/* Misi */}
              <div className="bg-white/10 p-10 md:p-12 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-lg relative overflow-hidden group hover:bg-white/15 transition-colors">
                <div className="absolute -inset-10 bg-gradient-to-br from-[#4ade80]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl z-0 pointer-events-none" />
                <h3 className="text-3xl font-bold mb-6 text-[#4ade80] relative z-10">Misi Kami</h3>
                <ul className="space-y-5 text-base md:text-lg leading-relaxed text-blue-50 font-medium list-none relative z-10">
                  <li className="flex gap-4">
                    <span className="text-[#4ade80] font-black text-xl">1.</span>
                    Memberikan layanan administrasi akademik yang serba cepat, sangat responsif, dan mutlak akurat.
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#4ade80] font-black text-xl">2.</span>
                    Memfasilitasi kegiatan belajar mengajar secara optimal dengan teknologi modern yang user-friendly.
                  </li>
                  <li className="flex gap-4">
                    <span className="text-[#4ade80] font-black text-xl">3.</span>
                    Menjalin kemitraan dan kolaborasi strategis dengan berbagai instansi demi pengembangan karier nyata untuk lulusan.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Form Kontak Email */}
        <section className="py-24 bg-white relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -z-10 rounded-l-[5rem]" />
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 drop-shadow-sm">
                Hubungi Kami
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Punya pertanyaan seputar teknis pendaftaran, jadwal, atau layanan perkuliahan lainnya? Jangan ragu mengirim pesan langsung kepada spesialis kami melalui form di bawah ini.
              </p>
            </div>

            <form className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 relative">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold tracking-wide text-slate-700 mb-2 ml-1">Nama Lengkap</label>
                  <input type="text" id="name" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold tracking-wide text-slate-700 mb-2 ml-1">Alamat Email Aktif</label>
                  <input type="email" id="email" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="contoh: budi@gmail.com" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-bold tracking-wide text-slate-700 mb-2 ml-1">Subjek / Topik</label>
                <input type="text" id="subject" className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Contoh: Info Pendaftaran Mahasiswa Baru 2026" />
              </div>

              <div className="mb-10">
                <label htmlFor="message" className="block text-sm font-bold tracking-wide text-slate-700 mb-2 ml-1">Pesan Lengkap</label>
                <textarea id="message" rows={5} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all resize-none font-medium leading-relaxed" placeholder="Tuliskan detail pertanyaan atau keluhan Anda di sini..."></textarea>
              </div>

              <button type="button" className="w-full inline-flex items-center justify-center px-10 py-5 bg-[#1864FF] text-white font-bold rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-md hover:shadow-xl gap-3 text-lg group">
                Kirim Pesan Sekarang
                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
