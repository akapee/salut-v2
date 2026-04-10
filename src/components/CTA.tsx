import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full bg-[#007cf7] overflow-hidden relative mb-20 md:mb-32">
      <div className="max-w-6xl mx-auto px-6 h-auto md:h-[450px] lg:h-[500px] flex flex-col md:flex-row items-center justify-between">

        {/* Text Area */}
        <div className="w-full md:w-[60%] py-16 md:py-0 text-white z-20 flex flex-col justify-center">
          <h2 className="text-lg md:text-xl lg:text-4xl font-bold font-sans mb-8 leading-[1.3] text-left">
            Yuk Jadi 1 dari 500.000+ Mahasiswa <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 px-2">Universitas Terbuka</span>
            </span>
          </h2>

          <div className="text-left">
            <Link
              href="/pendaftaran"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#fbbf24] text-slate-900 text-sm md:text-base font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-md"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        {/* Right side Image Overlap */}
        <div className="w-full md:w-[40%] h-[350px] md:h-full relative flex justify-center md:justify-end items-end z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cta.png"
            alt="Mahasiswa Universitas Terbuka"
            className="absolute bottom-0 h-[200px] md:h-[500px] lg:h-[500px] w-auto object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] right-0 md:-right-8 lg:-right-16 max-w-none text-right"
            style={{ width: 'auto' }}
          />
        </div>

      </div>
    </section>
  );
}
