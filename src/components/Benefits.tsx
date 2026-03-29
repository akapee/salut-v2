import { FaBookOpen as BookOpen, FaUsers as Users, FaRocket as Rocket, FaUserGraduate as GraduationCap } from "react-icons/fa6";

export default function Benefits() {
  return (
    <section id="fakultas" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          <div className="max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-[1.2]">
              Pilihan <br className="hidden md:block" />
              <span className="relative inline-block">
                Fakultas Terbaik
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
              <br /> untuk masa depanmu.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Kami menyediakan berbagai pilihan fakultas dengan program studi unggulan yang dirancang untuk menjawab tantangan dunia kerja masa depan.
            </p>
          </div>

          <div className="relative h-[660px] lg:h-[720px] w-full flex justify-center items-center">
            {/* Stacked Cards */}
            <div className="absolute top-0 right-4 lg:right-12 w-[85%] max-w-[400px] z-40 p-8 rounded-3xl bg-accent text-slate-900 shadow-xl transition-transform hover:-translate-y-2">
              <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center mb-6 backdrop-blur">
                <BookOpen className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fakultas Ekonomi dan Bisnis</h3>
              <p className="text-slate-800 text-sm font-medium">Melahirkan pemimpin bisnis dan wirausahawan inovatif dengan kurikulum adaptif.</p>
            </div>

            <div className="absolute top-24 lg:top-32 right-8 lg:right-24 w-[85%] max-w-[400px] z-30 p-8 rounded-3xl bg-warning text-white shadow-xl transition-transform hover:-translate-y-2 hover:z-50">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fakultas Keguruan dan Ilmu Pendidikan</h3>
              <p className="text-white/90 text-sm font-medium">Mencetak praktisi hukum yang berintegritas dan profesional di tingkat global.</p>
            </div>

            <div className="absolute top-48 lg:top-64 right-12 lg:right-36 w-[85%] max-w-[400px] z-20 p-8 rounded-3xl bg-success text-slate-900 shadow-xl transition-transform hover:-translate-y-2 hover:z-50">
              <div className="w-12 h-12 rounded-2xl bg-white/40 flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fakultas Hukum, Ilmu Sosial dan Ilmu Politik</h3>
              <p className="text-slate-800 text-sm font-medium">Mendorong inovasi teknologi dengan fasilitas riset dan praktikum terkini.</p>
            </div>

            <div className="absolute top-72 lg:top-96 right-16 lg:right-48 w-[85%] max-w-[400px] z-10 p-8 rounded-3xl bg-primary text-white shadow-xl transition-transform hover:-translate-y-2 hover:z-50">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fakultas Sains dan Teknologi</h3>
              <p className="text-white/90 text-sm font-medium">Mendidik pengajar pahlawan tanpa tanda jasa dengan metode pengajaran inovatif.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
