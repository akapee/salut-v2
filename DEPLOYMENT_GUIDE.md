# 🚀 Panduan Deploy Next.js App ke Shared Hosting (cPanel)

Kabar baik! Saya telah mengecek berkas konfigurasi `next.config.ts` pada proyek Anda, dan proyek ini **sudah 100% siap** (sudah menggunakan fitur `output: 'standalone'`) untuk didorong masuk ke _Shared Hosting_ manapun (seperti Hostinger, Niagahoster, DomaiNesia, dll) yang menggunakan **cPanel** dan fitur **"Setup Node.js App"**.

Ikuti langkah-langkah *copy-paste* berurutan di bawah ini untuk membuat web Anda *Online*.

---

## TAHAP 1: *Build* Proyek Anda di Komputer Lokal
Karena web Anda terhubung ke Supabase secara langsung, proyek Anda harus dikompilasi ke bentuk `Standalone` (sebuah bentuk server mini Node.js super ringan).

1. Buka Terminal lokal Anda yang saat ini menserver `npm run dev`.
2. Hentikan servernya dengan menekan `Ctrl + C`.
3. Jalankan perintah ini:
   ```bash
   npm run build
   ```
4. Biarkan terminal memproses selama ± 1–3 menit sampai memunculkan pesan centang sempurna *(Compiled successfully)*.

## TAHAP 2: Bikin Folder Siap-Upload
Next.js membuat banyak file sampahan. Untuk hosting ringan, kita **HANYA** butuh 3 komponen dari hasil _build_. Mari merakitnya:

1. Buat sebuah folder baru yang kosong di mana saja (misalnya di Desktop atau Root Folder Anda dengan nama `Hanya_Untuk_Hosting`).
2. Masuk ke proyek Anda, lalu pergi ke alamat file tersembunyi/hidden: `/.next/standalone/`.
   - **Copy semua isi di dalam folder `standalone/` tersebut** (termasuk foldernya yang ada `server.js`-nya).
   - **Paste** ke dalam folder `Hanya_Untuk_Hosting` yang Anda buat.
3. Sekarang, kembali ke folder awal web Anda, masuk ke dalam folder `public/`.
   - **Copy** seluruh folder `public`-nya, dan **Paste** langsung berdampingan di dalam root folder `Hanya_Untuk_Hosting`.
4. Terakhir, masuk kembali ke folder `/.next/static/` di web asli Anda.
   - Pergi ke dalam folder rincian hasil _Paste_ Anda di: `Hanya_Untuk_Hosting/.next/`. Anda akan sadar di sana tidak ada folder bernama `static`.
   - **Paste** folder `static` itu ke dalam `Hanya_Untuk_Hosting/.next/` tersebut. (Sehingga urutannya menjadi: `.next/static/`).
5. Blok Semua file di dalam folder `Hanya_Untuk_Hosting`, lalu *Klik Kanan* dan pilih *Zip / Compress* menjadi file **`upload.zip`**.

---

## TAHAP 3: Konfigurasi di cPanel Hosting Anda

1. Login ke Akun cPanel layanan Hosting Anda (contoh: Domainesia / Niagahoster).
2. Cari dan klik menu **"Setup Node.js App"** di bilah cPanel.
3. Klik tombol biru **[CREATE APPLICATION]**.
   - **Node.js Version:** Pilih versi `20.x.x` (18+ atau yang lebih tinggi, disarankan 20 LTS).
   - **Application Mode:** Pilih `Production`.
   - **Application Root:** Ketik folder nama *root* untuk file Anda, contoh `salutlentera_app`.
   - **Application URL:** Pilih nama domain internet yang Anda inginkan (misal: `salutlentera.id`).
   - **Application Startup File:** Ketik persis seperti ini: `server.js` *(Sangat krusial)*.
4. Klik tombol **Create** / **Simpan**.

## TAHAP 4: Upload dan Lingkungan API
Sekarang *Shell Node.js* sudah tercipta di cPanel. Kita tinggal melemparkan filenya:
1. Buka fitur **File Manager** bawaan cPanel.
2. Temukan folder baru bernama `salutlentera_app` (sesuai yang diketik di Langkap 3.3).
3. Hapus isinya bila ada (kecuali `.htaccess` dan `app.js` buatan cPanel bawaan).
4. Klik tombol **Upload** di bagian atas, lalu *Drop* file `upload.zip` milik Anda tadi.
5. Bila sudah 100%, kembali ke _File Manager_, _Klik Kanan_ pada file ZIP tersebut -> **Extract**.
6. **(Penting)** Klik menu "*+ File*" (Bikin file baru), beri nama persis: `.env`.
   - Masukkan salinan variabel Supabase *Local* Anda ke dalamnya seperti ini:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=Isi_URL_Dashboard_Supabase_Anda_Disini
     NEXT_PUBLIC_SUPABASE_ANON_KEY=Isi_Kode_JWT_Panjang_Anda_Disini
     PORT=3000
     ```

## TAHAP 5: Nyalakan Mesin Roketnya!
1. Kembali ke tab **Setup Node.js App** di awal tadi.
2. Cari nama aplikasi `salutlentera_app` Anda di dalam daftar.
3. **Klik "*Restart*"** atau Tombol Stop lalu Start ulang.
4. Selesai! Web Next.js Full Stack berfitur Supabase Anda kini telah mengudara di semesta maya tanpa sewa *server Cloud/VPS* mahal.
