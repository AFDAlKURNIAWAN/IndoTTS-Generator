# IndoTTS Generator

Aplikasi React + Vite sederhana untuk mengubah teks menjadi audio menggunakan API ElevenLabs.

## Persyaratan

- Node.js 18 atau lebih baru
- API key ElevenLabs

## Instalasi

1. Install dependency:

   ```bash
   npm install
   ```

2. Buat atau edit file `.env.local` di root project:

   ```env
   VITE_ELEVENLABS_API_KEY=your_api_key_here
   ```

   Ganti `your_api_key_here` dengan API key ElevenLabs Anda.

3. Jalankan server development:

   ```bash
   npm run dev
   ```

   Buka URL yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Penggunaan

1. Masukkan teks ke dalam textarea.
2. Klik **Buat audio**.
3. Tunggu proses selesai. Audio akan muncul dan diputar otomatis melalui pemutar audio.

Aplikasi menggunakan voice ID bawaan `JBFqnCBsd6RMkjVDRZzb` dan model `eleven_flash_v2_5`. Integrasi API berada di `src/services/elevenlabs.js`, sedangkan antarmuka berada di `src/components/AudioGenerator.jsx`.

## Perintah tersedia

```bash
npm run dev      # Jalankan server development
npm run lint     # Periksa kode dengan ESLint
npm run build    # Buat build production
npm run preview  # Preview build production
```

## Keamanan API key

File `.env.local` sudah diabaikan oleh Git melalui `.gitignore`. Jangan commit API key ke repository atau membagikannya di kode sumber. Karena variabel `VITE_*` terekspos ke browser, penggunaan langsung dari frontend cocok untuk development atau penggunaan terbatas. Untuk production, pertimbangkan membuat backend/proxy agar API key tetap tersimpan di server.
