# Spesifikasi Teknis (Technical Specification)
**Aplikasi:** Pendaftaran dan Informasi Akademik Sentra Layanan Universitas Terbuka (Salut Lentera) Purbalingga.

## 1. Stack Teknologi Utama (Core Tech Stack)
Aplikasi ini dikembangkan modern tanpa menggunakan bahasa backend tradisional seperti PHP/Laravel. Seluruh kendali dipegang oleh komponen Javascript/TypeScript.
* **Frontend Library:** React v19
* **Meta-Framework:** Next.js v16.2.1 (App Router)
* **Styling:** Tailwind CSS v4 + Vanilla CSS Modules.
* **Animasi:** GSAP (GreenSock Animation Platform) tingkat lanjut (ScrollTrigger).
* **Package Manager:** NPM (Node Package Manager).

## 2. Pangkalan Data (Database) & Autentikasi
Semua proses penyimpanan data dan keamanan memori dipindahkan ke Serverless Cloud.
* **Provider:** Supabase (BaaS)
* **Database:** PostgreSQL (berjalan di atas API PostgREST)
* **Authentication:** Supabase Auth (Native Email/Password, no magic links).
* **Storage:** Supabase Storage Bucket (`event-banners`, `team-profiles`).
* **Klien Koneksi:** `@supabase/supabase-js`.

## 3. Integrasi Pihak Ketiga Tambahan
Sistem tidak bertumpu sepenuhnya pada satu platform untuk efisiensi harga dan beban:
* **Registrasi Mahasiswa:** Google Apps Script API (Data formulir langsung terlempar ke Google Sheets admin tanpa masuk database Supabase).
* **Ikonografi:** `react-icons` (Koleksi spesifik *FontAwesome6*).

## 4. Persyaratan Infrastruktur (Deployment Environment)
* Dukungan Lingkungan: Cpanel Shared Hosting dengan fitur *Node.js App Selector* (versi LTS 18.x atau 20.x).
* **Build Modus:** Menggunakan konfigurasi `output: 'standalone'` dalam Next.js untuk memperingan *node_modules*.
* Otomatisasi (CI/CD): GitHub Actions dengan injeksi lingkungan via GitHub Secrets. Transfer FTP.
