# 🤖 Otomatisasi Deploy CI/CD Menggunakan GitHub Actions

Anda baru saja menyulap proyek ini berstandar Web Modern! File penggerak robot (*Workflow*) telah saya simpan secara otomatis di **`.github/workflows/deploy.yml`**.

Mulai detik ini, setiap kali Anda melakukan **`git push`** ke server GitHub di branch `main`, GitHub akan meracit (*Build*) program Anda dan mengirimkan perubahannya ke hosting cPanel **tanpa perlu campur tangan manual sedikit pun!** Sistem juga dirancang untuk langsung mendaratkan file `tmp/restart.txt` untuk memastikan server Node.js *restart* otomatis dan membaca kode yang baru.

Lakukan konfigurasi satu kali seumur hidup di bawah ini agar robot GitHub punya "Kunci" masuk ke server Anda.

---

## 🔑 Langkah 1: Kumpulkan Informasi Jalur Akses (FTP)
Buka kontrol panel (cPanel) Hosting Anda untuk mencatat 3 informasi berikut:
- **Alamat IP FTP**: (Misal: `ftp.salutlentera.id` atau `103.xxx.yyy.zzz`)
- **Username Akun FTP**: (Biasanya sama dengan username login cPanel Anda)
- **Password FTP**: (Password yang dibuat saat menyewa hosting / mengubah sandi FTP)

## 🔐 Langkah 2: Pasang Kunci API di Repository GitHub
Karena kode Github Anda mungkin bersifat rahasia, Jangan PERNAH menulis password hosting di dalam struktur *codingan*. Kita akan memanfaatkan fitur **GitHub Secrets**.

1. Buka halaman _Repository_ proyek Anda di [GitHub.com](https://github.com).
2. Klik tab menu **Settings** ⚙️.
3. Di panel sebelah kiri (kolom panjang), gulir turun dan cari menu **Security** > klik **Secrets and variables** > pilih **Actions**.
4. Di tengah layar, klik tombol hijau bertuliskan **New repository secret**.
5. Tambahkan seluruh kunci berikut secara satu per satu (Ketik persis Huruf Besarnya):

| Judul Name rahasia di Github | Nilai "Secret" yang harus diisi | Peringatan |
| --- | --- | --- |
| `FTP_SERVER` | Isi dengan alamat FTP (contoh: `ftp.salutlentera.id`) | Jangan taruh awalan `ftp://` |
| `FTP_USERNAME` | Username FTP cPanel Anda (contoh: `u1234567`) | |
| `FTP_PASSWORD` | Kata sandi rahasia CPanel/FTP Anda | |
| `NEXT_PUBLIC_SUPABASE_URL` | Copas dari file `.env.local` Supabase URL | |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`| Copas kunci panjang dari `.env.local` Anda | |

## 🕹️ Langkah 3: Sesuaikan Folder Tujuan di cPanel
Secara *default*, file YML yang saya buat mengekspor direktori tujuan ke root dengan nama `/salutlentera_app/`.
1. Jika ketika membuat **Setup Node.js App** Anda mengetikkan nama `public_html/app` atau yang lainnya,
2. **Mohon edit** tulisan `server-dir: /salutlentera_app/` yang ada di Baris Terakhir di file `deploy.yml`. Ganti agar sesuai dengan penamaan folder Anda di *File Manager* hosting!

---
🥳 **Selesai!**
Untuk menguji coba, cobalah edit warna latar / tombol terkecil sebuah file, lakukan `git commit` dan `git push` ke GitHub.

Pergi ke halaman **Actions** di repo Github Anda, lalu nikmati pemandangan *robot* yang akan mengerjakan semua langkah build Node.js yang meletihkan, memaketkan file, sambil men-transfer setiap file via FTP, hingga akhirnya merestart Server Anda di akhir proses, murni dari udara! (Durasi rata-rata 2 - 3 Menit).
