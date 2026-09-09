# SuaraNusa

Converter text-to-speech ringan berbahasa Indonesia dengan ElevenLabs sebagai mesin utama dan Web Speech API sebagai fallback otomatis. Audio hanya mulai setelah pengguna menekan tombol, sehingga tidak ada autoplay.

## Fitur

- Player artikel dengan tombol putar, jeda, lanjutkan, hentikan, dan putar ulang.
- Progress bar, estimasi durasi, dan pilihan kecepatan 0.75x sampai 1.5x.
- Input teks maksimal 500 karakter dengan penghitung karakter real-time.
- ElevenLabs menghasilkan MP3 yang dapat diunduh; Web Speech API menjadi fallback saat API gagal atau kuota habis.
- Pemecahan teks menjadi beberapa bagian agar lebih stabil pada browser yang memiliki batas panjang utterance.
- Layout responsif dengan jarak jelas antara player dan slot iklan.
- Jangan menaruh API key ElevenLabs di frontend. Gunakan backend proxy dengan environment variable; key yang pernah terekspos harus segera di-revoke dan diganti.

## Menjalankan

Buka `index.html` di browser modern. Untuk hasil daftar voice yang lebih konsisten, jalankan lewat server lokal seperti Live Server di VS Code.

## Tentang FreeTTS

FreeTTS memiliki REST API di `https://freetts.org/api/v1/tts`. Dokumentasinya menyebut penggunaan `x-api-key`, batas rate request, dan file audio sementara. API juga tidak menyediakan CORS header secara default, sehingga jangan menaruh API key di `script.js` atau memanggil endpoint tersebut langsung dari browser.

Untuk fase berikutnya, gunakan backend proxy:

1. Backend menerima teks dan id artikel dari frontend.
2. Backend membersihkan teks, memanggil FreeTTS dengan secret dari environment, lalu menyimpan `file_id` atau MP3 di cache server.
3. Frontend menerima URL audio dan menggunakan elemen `<audio>` sebagai jalur utama.
4. Jika backend gagal, player kembali ke Web Speech API seperti implementasi MVP ini.

FreeTTS free tier memiliki batas karakter/rate dan audio non-komersial dapat menyertakan watermark. Periksa Terms of Service dan lisensi sebelum digunakan untuk situs bermonetisasi.

## Pemeriksaan

```bash
node --check script.js
git diff --check
```
