import Link from "next/link";
import { FaArrowRight as ArrowRight, FaCircleCheck as CheckCircle2 } from "react-icons/fa6";

const benefits = [
  {
    id: "fleksibel",
    title: "Dapatkan Komunitas Eksklusif",
    features: ["Akses materi 24/7", "Kuliah dari mana saja", "Jadwal yang bisa diatur"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "berkualitas",
    title: "Akademik Berkualitas",
    features: ["Kurikulum terstandar", "Tutor berpengalaman", "Modul interaktif"],
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "terjangkau",
    title: "Biaya Terjangkau",
    features: ["Tanpa uang pangkal", "Bisa dicicil", "Potongan beasiswa"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  }
];

export default function Faculties() {
  return (
    <section id="benefits" className="py-24 bg-accent relative overflow-hidden">
      {/* Decorative floating shapes based on the image style */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-primary opacity-80 rounded-tl-full rounded-br-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-warning opacity-90 rounded-t-full rotate-45 animate-bounce" style={{ animationDuration: '5s' }} />
      <div className="absolute top-40 right-40 w-12 h-12 bg-success opacity-80" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 font-bold leading-[1.2]">
            Keunggulan belajar bersama kami
          </h2>
          <p className="text-lg text-slate-800 font-medium">
            Mulai dari fleksibilitas waktu hingga kualitas akademik yang terjamin, kami hadir untuk mendukung kesuksesan belajar Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group bg-white rounded-3xl p-6 shadow-soft hover:shadow-hover transition-all duration-300"
            >
              <div className="w-full h-40 bg-gray-100 rounded-2xl mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {benefit.title}
              </h3>

              <ul className="space-y-3 mb-8">
                {benefit.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
