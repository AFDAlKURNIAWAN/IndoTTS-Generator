Berikut adalah pembaruan *Product Requirement Document* (PRD) versi 1.1 yang telah dilengkapi dengan sistem *Auto-Fallback* (Tukar Otomatis) ke **Web Speech API** sebagai rencana cadangan jika kuota ElevenLabs habis atau gagal dimuat.

---

### Product Requirement Document (PRD) v1.1

**Nama Produk:** AI Text-to-Speech Converter Web App

**Tujuan:** Menyediakan layanan konversi teks ke suara gratis dengan jaminan ketersediaan layanan 100% menggunakan sistem API cadangan otomatis (menjaga retensi pengunjung untuk AdSense).

---

### 1. Kebutuhan Fungsional (Functional Requirements)

* **Input & Validasi:**
* Field `textarea` maksimal 500 karakter dengan *character counter* real-time.


* **Sistem Ganda Konversi Suara (Dual-Engine System):**
* **Mesin Utama:** ElevenLabs API (Suara realistis dan natural).
* **Mesin Cadangan:** Web Speech API bawaan browser (`window.speechSynthesis`).


* **Sistem Tukar Otomatis (Auto-Fallback Logic):**
* Jika API ElevenLabs merespons error (contoh: status `401 Unauthorized` karena token hilang, atau `429 Too Many Requests` karena kuota habis), sistem akan **secara otomatis** memutar suara menggunakan Web Speech API.
* Memunculkan notifikasi/toast singkat kepada pengguna (contoh: *"Lalu lintas server penuh, menggunakan mode suara standar"*).


* **Audio Output & Kontrol UI:**
* Tombol play/pause untuk pemutar suara.
* Tombol **"Download MP3"** hanya aktif jika konversi menggunakan ElevenLabs. Jika masuk ke mode Web Speech API, tombol download disembunyikan (karena Web Speech API berjalan langsung di perangkat dan tidak menghasilkan file MP3 secara *native*).



---

### 2. Kebutuhan Non-Fungsional (Non-Functional Requirements)

* **Reliabilitas & Toleransi Kesalahan (Fault Tolerance):**
* Website dijamin tidak akan pernah "mati" atau menampilkan *blank error* kepada pengguna meskipun API eksternal gagal. Ini sangat penting untuk menjaga skor kualitas halaman (*Page Quality*) di mata Google AdSense.


* **Performa Eksekusi:**
* Transisi *error handling* dari API Utama ke API Cadangan harus terjadi dalam waktu kurang dari 1 detik agar pengguna tidak merasa *lag*.


* **Keamanan API:**
* Token API dipasang pada skrip front-end, namun karena dilindungi oleh sistem cadangan Web Speech API, Anda tidak perlu khawatir website rusak jika token tersebut dicuri dan kuotanya dihabiskan oleh orang lain.



---

### 3. Pembaruan Spesifikasi Teknologi

| Komponen | Teknologi Utama | Teknologi Cadangan (Fallback) |
| --- | --- | --- |
| **Engine TTS** | ElevenLabs API (Membutuhkan Fetch Request) | Web Speech API (Bawaan Browser lokal) |
| **Audio Output** | Blob ke File `.mp3` via `<audio>` tag | JavaScript `SpeechSynthesisUtterance` |
| **Pendeteksi Error** | Block `try...catch` dan HTTP Status Check | Pemicu otomatis dari *catch block* JS |
| **Framework UI** | HTML5, Tailwind CSS | Vanilla JavaScript Alert / Toast UI |

---

### 4. Alur Logika *Auto-Fallback* (Gambaran Teknis)

1. Pengguna memasukkan teks dan menekan **"Ubah Jadi Suara"**.
2. JavaScript mencoba melakukan *Fetch* ke server ElevenLabs.
3. Server merespons (Cek Status):
* **Jika Sukses (200 OK):** Ekstrak file audio, tampilkan Audio Player, dan tombol Download.
* **Jika Gagal (401/429/500):** Tangkap *error*. Alihkan teks ke `window.speechSynthesis`.


4. Browser pengguna langsung membacakan teks tersebut menggunakan suara sistem (Google Bahasa Indonesia / Microsoft Andika).

Strategi *fallback* ini sangat cerdas karena pengunjung website Anda tidak akan pernah menyadari bahwa API utama sedang kehabisan kuota, sehingga *traffic* AdSense tetap aman.

Apakah Anda ingin saya buatkan kode JavaScript-nya yang sudah memiliki logika *Auto-Fallback* (try-catch) ini?