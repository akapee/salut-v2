"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars as Menu, FaXmark as X } from "react-icons/fa6";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/fakultas", label: "Fakultas" },
    { href: "/portal-mahasiswa", label: "Portal Mahasiswa" },
    { href: "/event", label: "Event" },
    { href: "/tentang", label: "Tentang" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl mx-auto bg-white/70 backdrop-blur-md shadow-lg border border-white/50 rounded-2xl transition-all duration-300">
      <div className="px-6 lg:px-8 flex items-center justify-between h-20 xl:px-10">
        <Link href="/" className="flex items-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/salut-logo.png"
            alt="Logo Salut"
            className="h-10 lg:h-12 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${pathname === link.href
                ? "text-primary font-semibold"
                : "text-gray-600 hover:text-primary"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/pendaftaran" className="text-sm font-medium px-6 py-2.5 rounded-full bg-primary text-white hover:bg-primary-light transition-all shadow-soft hover:-translate-y-0.5">
            Daftar Sekarang
          </Link>
        </div>

        {/* Mobile hamburger / close button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-white backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${pathname === link.href
                ? "bg-primary/10 text-primary font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-gray-200/60">
            <Link
              href="/pendaftaran"
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm font-medium px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-light transition-all shadow-soft"
            >
              Daftar Sekarang
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
