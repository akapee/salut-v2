import Link from "next/link";
import { FaBars as Menu } from "react-icons/fa6";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/salut-logo.png"
            alt="Logo Salut"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/" className="text-gray-600 hover:text-primary transition-colors">Beranda</Link>
          <Link href="/fakultas" className="text-gray-600 hover:text-primary transition-colors">Fakultas</Link>
          <Link href="/portal-mahasiswa" className="text-gray-600 hover:text-primary transition-colors">Portal Mahasiswa</Link>
          <Link href="/event" className="text-gray-600 hover:text-primary transition-colors">Event</Link>
          <Link href="/tentang" className="text-gray-600 hover:text-primary transition-colors">Tentang</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/pendaftaran" className="text-sm font-medium px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary-light transition-all shadow-soft hover:-translate-y-0.5">
            Daftar Sekarang
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600 hover:text-primary">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
