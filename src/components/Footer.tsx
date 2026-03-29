import Link from "next/link";
import { FaTiktok as Tiktok, FaUserGraduate as GraduationCap, FaEnvelope as Mail, FaPhone as Phone, FaComment as MessageCircle, FaGlobe as Globe, FaInstagram as Instagram, FaFacebook as Facebook } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/salut-logo-white.png"
                alt="Logo Salut"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-blue-100 max-w-sm mb-8 leading-relaxed">
              Jl. Raya Selanegara, Dusun 3, Kaligondang, Kec. Kaligondang, Kabupaten Purbalingga, Jawa Tengah 53391
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                <Tiktok className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Fakultas</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors">Fakultas Ekonomi dan Bisnis</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors">Fakultas Keguruan dan Ilmu Pendidikan</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors">Fakultas Hukum, Ilmu Sosial dan Ilmu Politik</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors">Fakultas Sains dan Teknologi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Info Mahasiswa</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors">My UT</Link></li>
              <li><Link href="#" className="text-blue-100 hover:text-white transition-colors">UT Perpus</Link></li>

            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Kontak Kami</h4>
            <ul className="space-y-4">
              <li className="text-blue-100">+62 831-5761-0895</li>
              <li className="text-blue-100">salutlentera@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-200">
            © {currentYear} Salut Lentera. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
