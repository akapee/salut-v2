"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const words = ["Inovatif", "Trendy", "Accessible"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white text-slate-900 flex flex-col items-center justify-center min-h-[90vh]">
      <div className="max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center w-full">

        {/* Top Badge */}
        <div className="inline-flex items-center justify-center px-6 py-2 mb-10 rounded-full bg-blue-50/80 border border-blue-100">
          <span className="text-sm md:text-base font-semibold text-primary">
            Ayo menjadi bagian dari mahasiswa Universitas Terbuka
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight mb-14 text-[#1a1a1a] leading-tight flex flex-col items-center">
          <span>Wujudkan Pendidikan</span>
          <span className="inline-flex items-center justify-center gap-3 md:gap-5 mt-2 md:mt-4">
            <span>Semakin</span>
            <span className="bg-primary text-white px-6 md:px-8 py-1 md:py-2 rounded-lg relative overflow-hidden inline-flex items-center justify-center min-w-[150px]">
              {/* Invisible placeholder to maintain consistent box width */}
              <span className="invisible opacity-0 pointer-events-none">
                Accessible
              </span>

              {words.map((word, i) => {
                const isCurrent = index === i;
                const isPrevious = i === (index - 1 + words.length) % words.length;

                return (
                  <span
                    key={word}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isCurrent
                      ? "opacity-100 translate-y-0"
                      : isPrevious
                        ? "opacity-0 -translate-y-full"
                        : "opacity-0 translate-y-full"
                      }`}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          </span>
        </h1>

        {/* Subheadline Box */}
        <div className="max-w-3xl mx-auto mt-4 mb-14 p-6 md:p-10 rounded-2xl border border-gray-200/80 bg-white">
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
            Kuliah susah bagi waktu? Bergabunglah dengan Universitas Terbuka melalui Salut Perwira untuk mendapatkan pengalaman berkuliah tanpa takut waktu tersita
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link href="/pendaftaran" className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors shadow-sm text-base">
            Daftar Sekarang
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors shadow-sm text-base">
            Lihat Jurusan
          </button>
        </div>

      </div>
    </section>
  );
}
