import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaIdCard, FaBookOpenReader, FaLaptopCode, FaBriefcase } from "react-icons/fa6";
import Link from "next/link";

export const metadata = {
  title: "Portal Mahasiswa | Universitas Terbuka",
  description: "Akses layanan akademik, e-learning, perpustakaan, dan pengembangan karier.",
};

const portalLinks = [
  {
    title: "My UT",
    icon: FaIdCard,
    description: "Sistem Informasi Akademik Mahasiswa terpadu untuk registrasi dan nilai.",
    href: "#",
    color: "text-[#1864FF]", // Primary blue
    bgColor: "bg-blue-50",
  },
  {
    title: "Perpustakaan Digital",
    icon: FaBookOpenReader,
    description: "Akses mutakhir ribuan buku, jurnal, dan modul interaktif digital.",
    href: "#",
    color: "text-[#fbbf24]", // Accent yellow
    bgColor: "bg-amber-50",
  },
  {
    title: "E-Learning UT",
    icon: FaLaptopCode,
    description: "Platform belajar online tatap maya untuk seluruh materi program studi.",
    href: "#",
    color: "text-[#4ade80]", // Success green
    bgColor: "bg-green-50",
  },
  {
    title: "Pusat Karir",
    icon: FaBriefcase,
    description: "Layanan informasi lowongan kerja, magang, dan pengembangan karier alumni.",
    href: "#",
    color: "text-[#f97316]", // Warning orange
    bgColor: "bg-orange-50",
  }
];

export default function PortalMahasiswaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fafc] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 font-bold mb-6">
              Portal Layanan Mahasiswa
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Akses cepat terpusat ke seluruh platform dan fasilitas sistem akademik pendukung perkuliahan di Universitas Terbuka.
            </p>
          </div>

          {/* 4 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portalLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link 
                  href={item.href}
                  key={index}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col items-center text-center"
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-transform duration-300 group-hover:scale-110 ${item.bgColor}`}>
                    <Icon className={`w-10 h-10 ${item.color}`} />
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h2>
                  
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-8 font-bold text-sm tracking-wide flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#1864FF]">
                    MASUK PORTAL <span className="text-lg">→</span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
