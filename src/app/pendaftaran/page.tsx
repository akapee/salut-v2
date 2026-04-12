"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaUserPlus, FaArrowRight, FaArrowLeft, FaCheck, FaGraduationCap, FaSpinner } from "react-icons/fa6";

const PROGRAMS = [
  "S1 - Ekonomi Pembangunan", "S1 - Ekonomi Syariah", "S1 - Akuntansi", "S1 - Akuntansi Keuangan Publik", "S1 - Manajemen", "S1 - Pariwisata", "S1 - Kewirausahaan",
  "S1 - Matematika", "S1 - Statistika", "S1 - Biologi", "S1 - Teknologi Pangan", "S1 - Perencanaan Wilayah dan Kota", "S1 - Sistem Informasi", "S1 - Agribisnis", "S1 - Sains Data",
  "S1 - Pendidikan Bahasa dan Sastra Indonesia", "S1 - Pendidikan Bahasa Inggris", "S1 - Pendidikan Matematika", "S1 - Pendidikan Biologi", "S1 - Pendidikan Fisika", "S1 - Pendidikan Kimia", "S1 - Pendidikan Ekonomi", "S1 - Pendidikan Teknologi", "S1 - Pendidikan Agama Islam", "S1 - Pendidikan Guru Sekolah Dasar (PGSD)", "S1 - Pendidikan Guru Anak Usia Dini (PGPAUD)", "S1 - Pendidikan Pancasila dan Kewarganegaraan",
  "S1 - Ilmu Administrasi Negara", "S1 - Ilmu Administrasi Bisnis", "S1 - Ilmu Pemerintahan", "S1 - Sosiologi", "S1 - Sastra Inggris Bid. Penerjemah", "S1 - Hukum", "S1 - Ilmu Komunikasi", "S1 - Ilmu Perpustakaan", "S1 - Perpajakan", "D3 - Perpajakan"
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Custom Combo-box States
  const [prodiSearch, setProdiSearch] = useState("");
  const [isProdiOpen, setIsProdiOpen] = useState(false);
  const filteredPrograms = PROGRAMS.filter(p => p.toLowerCase().includes(prodiSearch.toLowerCase()));

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
      // Endpoint Apps Script (Spreadsheet)
      const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykMuKmLDFMjaXchenjjlHk4W30FbFLHQ-cMY9iyR9DlbH-P_GLC_mXqTBK2qAbxnI/exec";

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        // Mode text/plain digunakan khusus untuk mengelabui (bypass) blokir CORS Google
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.result === "success") {
        // Tampilkan Popup Modal menggantikan alert() kuno
        setIsSuccessModalOpen(true);

        // Reset formulir sampai bersih 
        setFormData({
          namaLengkap: "", email: "", whatsapp: "", programStudi: "", jalurProgram: "",
          ukuranJas: "", alamatModul: "", alamatDomisili: "", tempatLahir: "",
          tanggalLahir: "", namaIbu: "", nik: "", agama: "", asalSekolah: "",
          jenisKelamin: "", statusPernikahan: ""
        });

        // Kembalikan ke step paling awal
        setStep(1);
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
                      <input required type="text" name="namaLengkap" value={formData.namaLengkap} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Nama Lengkap Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Email Aktif <span className="text-red-500">*</span></label>
                      <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Masukkan Email Anda" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Nomor WhatsApp<span className="text-red-500">*</span></label>
                      <input required type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Masukkan No. Whatsapp" />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Program Studi Tujuan <span className="text-red-500">*</span></label>

                      {/* Input Cerdas / Combobox */}
                      <div className="relative">
                        <input
                          type="text"
                          required={!formData.programStudi}
                          placeholder={formData.programStudi || "Ketik nama program studi..."}
                          value={isProdiOpen ? prodiSearch : formData.programStudi}
                          onChange={(e) => {
                            setProdiSearch(e.target.value);
                            if (!isProdiOpen) setIsProdiOpen(true);
                            // Jika mengetik sesuatu, batalkan pilihan sebelumnya yang tersimpan di form
                            if (formData.programStudi) setFormData({ ...formData, programStudi: "" });
                          }}
                          onClick={() => {
                            setIsProdiOpen(true);
                            setProdiSearch("");
                          }}
                          className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium text-slate-800 placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setIsProdiOpen(!isProdiOpen)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1864FF] transition-colors"
                        >
                          ▼
                        </button>
                      </div>

                      {/* Dropdown Menu Mengambang */}
                      {isProdiOpen && (
                        <>
                          {/* Background transparan untuk mendeteksi klik di luar menu */}
                          <div className="fixed inset-0 z-30" onClick={() => setIsProdiOpen(false)}></div>

                          <div className="absolute z-40 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-gray-50">
                            {filteredPrograms.length > 0 ? filteredPrograms.map(p => (
                              <div
                                key={p}
                                className="px-5 py-3.5 hover:bg-blue-50 cursor-pointer font-medium text-slate-700 hover:text-[#1864FF] transition-colors"
                                onClick={() => {
                                  setFormData({ ...formData, programStudi: p });
                                  setProdiSearch(""); // Reset pencarian
                                  setIsProdiOpen(false); // Tutup popup
                                }}
                              >
                                {p}
                              </div>
                            )) : (
                              <div className="px-5 py-4 text-slate-500 italic text-center"> Program studi tidak ditemukan. Silakan periksa ulang namanya.</div>
                            )}
                          </div>
                        </>
                      )}
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
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap Untuk Pengiriman Modul <span className="text-red-500">*</span></label>
                    <textarea required name="alamatModul" value={formData.alamatModul} onChange={handleChange} rows={3} className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all resize-none font-medium text-slate-700 leading-relaxed" placeholder="Contoh: Jl. Merdeka No. 10, RT 01/02, Mrebet, Purbalingga, Jawa Tengah 53391..."></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Domisili (Untuk Lokasi Ujian) <span className="text-red-500">*</span></label>
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
                      <input required type="text" name="namaIbu" value={formData.namaIbu} onChange={handleChange} className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1864FF]/50 focus:border-[#1864FF] transition-all font-medium" placeholder="Nama Ibu kandung" />
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

        {/* =========================================
            MODAL POPUP BERHASIL DAFTAR 
            ========================================= */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Blur Gelap */}
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsSuccessModalOpen(false)}
            />

            {/* Kotak Modal */}
            <div className="bg-white max-w-md w-full rounded-[2rem] shadow-2xl relative z-10 p-8 text-center animate-in zoom-in-95 duration-300">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4 font-serif">Selamat! Formulir Sukses Terkirim</h2>
              <p className="text-slate-600 mb-8 font-medium leading-relaxed">
                Data Anda telah aman dikirim dan tercatat dalam sistem pendaftaran Universitas Terbuka kami.
                <br /><br />
                Pihak administrasi <strong>Salut Lentera</strong> akan segera memverifikasi dan menghubungi Anda melalui nomor WhatsApp yang telah Anda cantumkan.
              </p>

              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 px-6 bg-[#1864FF] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:-translate-y-1 inline-flex justify-center items-center gap-3 group"
              >
                Kembali ke Form <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
