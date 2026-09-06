# IndoTTS Generator

Aplikasi web sederhana untuk mengubah teks menjadi suara menggunakan Web Speech API yang tersedia di browser.

## Fitur

- Membaca teks berbahasa Indonesia atau Inggris.
- Pilihan kecepatan: 0.75x, 1.0x, 1.25x, dan 1.5x.
- Tombol untuk memutar dan menghentikan suara.
- Tidak memerlukan server, API key, atau instalasi package.
- Menampilkan status proses dan pesan ketika browser tidak mendukung text-to-speech.

## Cara Menjalankan

1. Buka `index.html` di browser modern.
2. Pilih bahasa suara.
3. Masukkan teks.
4. Pilih kecepatan suara.
5. Klik **Putar Suara**.
6. Klik **Hentikan** untuk menghentikan suara.

Untuk hasil yang lebih konsisten, jalankan melalui server lokal, misalnya ekstensi Live Server di VS Code. Membuka file HTML secara langsung juga dapat bekerja pada sebagian besar browser.

## Struktur File

- `index.html`: struktur halaman dan kontrol aplikasi.
- `style.css`: tampilan dan tata letak.
- `script.js`: pemrosesan text-to-speech, pemilihan bahasa, status, dan validasi dukungan browser.

## Catatan Penting

Nama seperti Gwyneth, Ida, Ardi, Joanna, Matthew, dan Brian adalah label pilihan bahasa. Web Speech API tidak menjamin voice tertentu tersedia di setiap perangkat. Aplikasi akan memilih voice yang tersedia dengan bahasa yang sesuai, lalu menggunakan voice bawaan browser jika tidak ada voice yang cocok.

Browser dan sistem operasi yang berbeda dapat menghasilkan suara yang berbeda. Sebagian browser juga baru mengisi daftar voice beberapa saat setelah halaman dibuka.

Aplikasi ini tidak menghasilkan atau mengunduh file MP3. Web Speech API hanya memutar suara secara langsung dan tidak menyediakan hasil audio sebagai file unduhan.

## Pemeriksaan Error

Pemeriksaan yang dapat dijalankan dari folder proyek:

```bash
node --check script.js
git diff --check
```

Selain itu, buka Developer Tools browser dengan `F12`, pilih tab **Console**, lalu pastikan tidak ada error JavaScript saat menekan tombol **Putar Suara**.

## Jika Suara Tidak Keluar

- Pastikan volume perangkat dan tab browser tidak dimatikan.
- Gunakan browser modern seperti Chrome, Edge, atau Safari.
- Coba teks yang lebih pendek.
- Pastikan bahasa yang dipilih didukung oleh sistem operasi.
- Muat ulang halaman agar daftar voice diperbarui.
