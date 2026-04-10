"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaUserPlus, FaArrowRight, FaArrowLeft, FaCheck, FaGraduationCap, FaSpinner } from "react-icons/fa6";

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1
    namaLengkap: "",
    email: "",
    whatsapp: "",
    programStudi: "",
    jalurProgram: "",
    ukuranJas: "",
    alamatModul: "",
    alamatDomisili: "",
    // Step 2
    tempatLahir: "",
    tanggalLahir: "",
    namaIbu: "",
    nik: "",
    agama: "",
    asalSekolah: "",
    jenisKelamin: "",
    statusPernikahan: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    // Move to step 2 after basic HTML5 validation passes
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Endpoint Internal API (URL Proxy agar request script Google di-handle oleh server backend Next.js)
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.result === "success") {
        alert("Pendaftaran Berhasil Dikirim! Data Anda telah terdata di Google Sheets kami. Tim dari Salut Lentera akan segera menghubungi nomor WhatsApp Anda.");

        // Reset formulir sampai bersih 
        setFormData({
          namaLengkap: "", email: "", whatsapp: "", programStudi: "", jalurProgram: "",
          ukuranJas: "", alamatModul: "", alamatDomisili: "", tempatLahir: "",
          tanggalLahir: "", namaIbu: "", nik: "", agama: "", asalSekolah: "",
          jenisKelamin: "", statusPernikahan: ""
        });

        // Kembalikan ke step paling awal
        setStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error("Gagalan simpan data di sisi server Google.");
      }

    } catch (error) {
      console.error(error);
      alert("Maaf, terjadi gangguan jaringan/server. Silakan coba kirim ulang data Anda beberapa saat lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden">
        {/* Decorative Background Header */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[#1864FF] rounded-b-[4rem] z-0" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">

          <div className="text-center text-white mb-12">
            <div className="inline-flex items-center justify-center p-5 bg-white/20 rounded-[1.5rem] mb-6 backdrop-blur-sm shadow-inner cursor-default">
              <FaUserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">
              Formulir Pendaftaran
            </h1>
            <p className="text-lg text-blue-50 max-w-2xl mx-auto font-medium">
              Lengkapi data diri Anda dengan akurat. Cukup mengisi dua langkah pendaftaran sebelum memulai perkuliahan di Universitas Terbuka.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

            {/* Form Progress Indicator */}
            <div className="flex border-b border-gray-100 bg-slate-50/80">
              <div className={`flex-1 py-5 text-center font-bold tracking-wide flex items-center justify-center gap-3 transition-colors ${step === 1 ? 'text-[#1864FF] bg-blue-50 border-b-[3px] border-[#1864FF]' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm ${step === 1 ? 'bg-[#1864FF] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {step > 1 ? <FaCheck /> : "1"}
                </div>
                <span className="hidden sm:inline">Data Akademik</span>
              </div>
              <div className={`flex-1 py-5 text-center font-bold tracking-wide flex items-center justify-center gap-3 transition-colors ${step === 2 ? 'text-[#1864FF] bg-blue-50 border-b-[3px] border-[#1864FF]' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-sm ${step === 2 ? 'bg-[#1864FF] text-white' : 'bg-slate-200 text-slate-500'}`}>
                  2
                </div>
                <span className="hidden sm:inline">Data Pribadi</span>
              </div>
            </div>

            {/* Form Content Wrapper */}
            <div className="p-8 md:p-12">

              {/* STEP 1: Akademik & Alamat */}
              {step === 1 && (
                <form onSubmit={handleNext} className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                      <input required type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Budi Santoso" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Email Aktif <span className="text-red-500">*</span></label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="budi@gmail.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp Aktif <span className="text-red-500">*</span></label>
                      <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="081234567890" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Program Studi Tujuan <span className="text-red-500">*</span></label>
                      <select required name="programStudi" value={formData.programStudi} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700">
                        <option value="">-- Pilih Program Studi --</option>
                        <option value="S1 Manajemen">S1 Manajemen</option>
                        <option value="S1 Akuntansi">S1 Akuntansi</option>
                        <option value="S1 PGSD">S1 PGSD</option>
                        <option value="S1 Ilmu Hukum">S1 Ilmu Hukum</option>
                        <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                        <option value="S1 Ilmu Komunikasi">S1 Ilmu Komunikasi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Jalur Program <span className="text-red-500">*</span></label>
                      <select required name="jalurProgram" value={formData.jalurProgram} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700">
                        <option value="">-- Pilih Jalur --</option>
                        <option value="SIPAS (Sistem Paket Semester)">RPL</option>
                        <option value="NON-SIPAS">NON RPL</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Ukuran Jas Almamater <span className="text-red-500">*</span></label>
                      <select required name="ukuranJas" value={formData.ukuranJas} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700">
                        <option value="">-- Pilih Ukuran Jas --</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap Pengiriman Modul (Buku Materi Pokok) <span className="text-red-500">*</span></label>
                    <textarea required name="alamatModul" value={formData.alamatModul} onChange={handleChange} rows={3} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all resize-none font-medium text-slate-700 leading-relaxed" placeholder="Contoh: Jl. Merdeka No. 10, RT 01/02, Mrebet, Purbalingga, Jawa Tengah 53391..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Domisili (Untuk Sinkronisasi Lokasi Ujian/UAS) <span className="text-red-500">*</span></label>
                    <textarea required name="alamatDomisili" value={formData.alamatDomisili} onChange={handleChange} rows={2} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all resize-none font-medium text-slate-700 leading-relaxed" placeholder="Tuliskan tempat tinggal Anda saat ini (kos/kontrakan) atau ketik 'Sama dengan alamat pengiriman modul'"></textarea>
                  </div>

                  <div className="flex justify-end pt-8 border-t border-gray-100">
                    <button type="submit" className="inline-flex items-center justify-center px-10 py-4 bg-[#1864FF] text-white font-bold rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-md hover:shadow-xl gap-3 text-lg group">
                      Selanjutnya
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Data Pribadi KTP */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tempat Lahir <span className="text-red-500">*</span></label>
                      <input required type="text" name="tempatLahir" value={formData.tempatLahir} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Kabupaten/Kota sesuai KTP" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Lahir <span className="text-red-500">*</span></label>
                      <input required type="date" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nama Ibu Kandung <span className="text-red-500">*</span></label>
                      <input required type="text" name="namaIbu" value={formData.namaIbu} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Sesuai dokumen resmi Akta/KK" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nomor Induk Kependudukan (16 Digit NIK) <span className="text-red-500">*</span></label>
                      <input required type="number" name="nik" value={formData.nik} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Ketik 16 Digit Angka KTP..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Agama <span className="text-red-500">*</span></label>
                      <select required name="agama" value={formData.agama} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700">
                        <option value="">-- Pilih Keyakinan Agama --</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen Protestan">Kristen Protestan</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Buddha">Buddha</option>
                        <option value="Konghucu">Konghucu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Asal Sekolah Tinggi / SMA <span className="text-red-500">*</span></label>
                      <input required type="text" name="asalSekolah" value={formData.asalSekolah} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Contoh: SMA Negeri 1 Purbalingga" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Jenis Kelamin <span className="text-red-500">*</span></label>
                      <select required name="jenisKelamin" value={formData.jenisKelamin} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700">
                        <option value="">-- Tentukan Jenis Kelamin --</option>
                        <option value="Laki-laki">Pria (Laki-laki)</option>
                        <option value="Perempuan">Wanita (Perempuan)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Status Pernikahan <span className="text-red-500">*</span></label>
                      <select required name="statusPernikahan" value={formData.statusPernikahan} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-700">
                        <option value="">-- Status Perkawinan KTP --</option>
                        <option value="Belum Menikah">Belum Kawin / Belum Menikah</option>
                        <option value="Menikah">Kawin / Menikah</option>
                        <option value="Cerai">Pernah Menikah (Cerai Hidup/Mati)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-between pt-8 border-t border-gray-100 gap-4">
                    <button type="button" onClick={handleBack} className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-slate-600 font-bold rounded-xl hover:bg-gray-50 transition-all gap-3 text-lg group">
                      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Tahap 1
                    </button>
                    <button type="submit" disabled={isSubmitting} className={`inline-flex items-center justify-center px-10 py-4 ${isSubmitting ? 'bg-green-300 cursor-not-allowed' : 'bg-[#4ade80] hover:bg-green-500 hover:-translate-y-1'} text-slate-900 font-extrabold rounded-xl transition-all shadow-md hover:shadow-xl gap-3 text-lg`}>
                      {isSubmitting ? <FaSpinner className="w-6 h-6 animate-spin" /> : <FaGraduationCap className="w-6 h-6" />}
                      {isSubmitting ? "Mengirim Data..." : "Kirim Pendaftaran"}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
