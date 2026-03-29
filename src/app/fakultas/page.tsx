import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaBookOpen, FaUserGraduate, FaUsers, FaRocket } from "react-icons/fa6";

export const metadata = {
  title: "Fakultas | Universitas Terbuka",
  description: "Daftar fakultas dan program studi di Universitas Terbuka",
};

const faculties = [
  {
    id: "ekonomi",
    name: "Fakultas Ekonomi dan Bisnis",
    icon: FaBookOpen,
    colorClass: "bg-[#fbbf24]", // Accent/Yellow
    textColor: "text-slate-900",
    programs: [
      "S1 Manajemen",
      "S1 Akuntansi",
      "S1 Ekonomi Pembangunan",
      "S1 Pariwisata",
    ]
  },
  {
    id: "pendidikan",
    name: "Fakultas Keguruan dan Ilmu Pendidikan",
    icon: FaUserGraduate,
    colorClass: "bg-[#1864FF]", // Primary/Blue
    textColor: "text-white",
    programs: [
      "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
      "S1 Pendidikan Guru Pendidikan Anak Usia Dini (PGPAUD)",
      "S1 Pendidikan Bahasa Inggris",
      "S1 Teknologi Pendidikan",
    ]
  },
  {
    id: "hukum",
    name: "Fakultas Hukum, Ilmu Sosial dan Ilmu Politik",
    icon: FaUsers,
    colorClass: "bg-[#f97316]", // Warning/Orange
    textColor: "text-white",
    programs: [
      "S1 Ilmu Hukum",
      "S1 Ilmu Komunikasi",
      "S1 Ilmu Administrasi Bisnis",
      "S1 Ilmu Pemerintahan",
    ]
  },
  {
    id: "saintek",
    name: "Fakultas Sains dan Teknologi",
    icon: FaRocket,
    colorClass: "bg-[#4ade80]", // Success/Green
    textColor: "text-slate-900",
    programs: [
      "S1 Sistem Informasi",
      "S1 Perencanaan Wilayah dan Kota",
      "S1 Agribisnis",
      "S1 Matematika",
    ]
  }
];

export default function FakultasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-slate-900 font-bold mb-6">
              Pilihan Fakultas
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Jelajahi berbagai program studi dari fakultas unggulan yang siap mempersiapkan karier cemerlang Anda di masa depan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {faculties.map((faculty) => {
              const Icon = faculty.icon;
              return (
              <div 
                key={faculty.id} 
                className={`p-8 md:p-10 rounded-[2rem] shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${faculty.colorClass} ${faculty.textColor}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${faculty.textColor === 'text-white' ? 'bg-white/20' : 'bg-white/40'}`}>
                    <Icon className={`w-8 h-8 ${faculty.textColor}`} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">{faculty.name}</h2>
                </div>
                
                <div className={`pt-8 border-t ${faculty.textColor === 'text-white' ? 'border-white/20' : 'border-slate-900/10'}`}>
                  <h3 className="text-sm md:text-base uppercase tracking-wider font-bold mb-6 opacity-90">
                    Program Studi:
                  </h3>
                  <ul className="grid grid-cols-1 gap-4">
                    {faculty.programs.map((program, idx) => (
                      <li key={idx} className="flex items-center gap-4 font-medium text-base md:text-lg">
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${faculty.textColor === 'text-white' ? 'bg-white' : 'bg-slate-900'}`} />
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )})}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
