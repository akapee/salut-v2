# Arsitektur Aplikasi (Software Architecture)
Proyek ini mengadopsi pola **Desain Serverless API Berbasis Komponen** *(Serverless Component-Based Architecture)*.

## 1. Topologi Dasar
```text
[ Browser Klien (UI) ] 
        ⬇️ ⬆️  (Koneksi via RPC/PostgREST - RestAPI Supabase JS)
[ Database PostgreSQL Cloud ] (Pusat Kebenaran Data) 
        ⬇️ ⬆️  (Koneksi Server-to-Server)
[ Node.js V20 / Next.js Server ] (Menyimpan State Render Awal SSR & Rute Dinamis)
```

## 2. Struktur Data dan Repositori
Struktur proyek Next.js disusun berdasarkan standar konvensi *App Router*:
- `/public` : Aset-aset statis seperti favicon, gambar, font lokal.
- `/src/app` : Entri routing yang dipetakan satu-banding-satu dengan URL. Rangkuman sistem utama mencakup:
  - `/(publik)` : Halaman `/tentang`, `/event`, dan Formulir Pendaftaran `/apply` merender fungsi secara *Server-Side* via 'force-dynamic'.
  - `/admin` : Aplikasi berlapis *State-Client* tertutup yang digunakan admin. Beroperasi ala *Single-Page Application* dengan manipulasi `Tab DOM`.
- `/src/components` : Abstraksi elemen mikro yang bisa digunakan lebih dari sekali (Navbar, Footer, Hero, CTA).
- `/src/lib` : Pangkalan inisialisasi koneksi SDK (Berisi pengikat/konektor utama `supabase.ts`).

## 3. Alur Kerja Autentikasi (Authentication Flow)
1. Klien memasukkan Email & Password di `/admin/login`.
2. Supabase memvalidasi ke server Oauth dan mengirim *Session JWT* balik ke Browser (*Local Storage*).
3. Browser melakukan Push Router ke Dasbor `/admin`.
4. Berbeda dengan pendekatan Laravel/Express kuno, tidak ada validasi keamanan *Cookie Middleware Server* dari sisi Next.js. Keamanan mengandalkan *Row-Level Security (RLS)* di Engine DB Supabase secara langsung agar lebih absolut.

## 4. Alur Integrasi (CI/CD)
1. Developer -> `git commit` -> `git push origin main`.
2. Platform pengkaji otomatis (GitHub Actions) membaca skrip konfigurasi yml di `.github/workflows/deploy.yml`.
3. Node.JS berjalan di Cloud Runner GitHub merakit paket `standalone` murni (tanpa dependencies *devDependencies*).
4. Robot Github menyedot `.env` dari ruang rahasia dan melampirkannya bersama.
5. GitHub Action mentransfer seluruh rakitan matang via protokol FTP tradisional ke server cPanel tujuan.
6. Server mencetak `tmp/restart.txt` untuk memulai ulang PM2 / Passenger Engine Node.js. Web berhasil diperbarui 100% otomatis.
