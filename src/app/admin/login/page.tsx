"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaUserShield, FaSpinner, FaArrowRight, FaLock } from "react-icons/fa6";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // Menembak endpoint otentikasi API Laravel
      const API_URL = "http://127.0.0.1:8000/api/login";
      
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Email atau kata sandi tidak cocok.");
      }

      if (data.token) {
        // Simpan token otentikasi di browser cookie. 
        // Masa aktif diset 1 hari (bisa diatur sesuai kebutuhan).
        Cookies.set("auth_token", data.token, { expires: 1, path: '/' });
        
        // Pindah otomatis ke Dashboard Events
        router.push("/admin/events");
      } else {
        throw new Error("Server tidak mengembalikan token akses keamanan.");
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Gagal menghubungi server API autentikasi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-slate-50 p-6">
      <div className="absolute inset-0 bg-[#1864FF] h-[400px] z-0 rounded-b-[4rem]"></div>
      
      <div className="bg-white w-full max-w-md p-10 rounded-[2rem] shadow-2xl relative z-10 border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-50 text-[#1864FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <FaUserShield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Admin Portal</h1>
          <p className="text-sm text-slate-500 mt-2">Masuk untuk mengelola data kampus.</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold p-4 rounded-xl mb-6 flex items-start gap-3">
            <FaLock className="shrink-0 mt-0.5" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF] transition-all font-medium text-slate-800"
              placeholder="admin@salutlentera.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Kata Sandi</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:border-[#1864FF] focus:ring-1 focus:ring-[#1864FF] transition-all font-medium text-slate-800"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-white transition-all shadow-md ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#1864FF] hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'}`}
          >
            {isLoading ? <FaSpinner className="w-5 h-5 animate-spin" /> : "Masuk ke Sistem"}
            {!isLoading && <FaArrowRight />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs font-semibold text-slate-400">
          <p>Restricted Area. Hanya untuk pengurus Universitas Terbuka yang sah.</p>
        </div>
      </div>
    </main>
  );
}
