# Muhamad Firdaus El Ghaby — Game Artist Portfolio

Website portofolio pribadi milik **Muhamad Firdaus El Ghaby (Firuls)**, seorang **2D, 3D & Pixel Artist** sekaligus mahasiswa Teknologi Game di **PENS (Politeknik Elektronika Negeri Surabaya)**. Website ini dirancang untuk memamerkan karya dan pengalaman profesional di bidang game art, mencakup tujuh proyek game yang telah selesai dikerjakan.

---

## Tentang Portofolio Ini

Website ini dibangun sepenuhnya dengan **HTML5, CSS3, dan JavaScript vanilla** — tanpa framework eksternal — dengan fokus pada performa, estetika visual, dan kemudahan pembaruan konten.

### Fitur Utama

| Fitur | Deskripsi |
|---|---|
| **Layered Parallax Scenery** | Latar berlapis (langit, bebatuan, siluet) yang bergerak halus saat scroll, menciptakan kedalaman visual bertema Cosmic Deep Space. |
| **Curved 3D Infinite Carousel** | Galeri proyek berbentuk silinder 3D interaktif, mendukung drag, swipe, scroll, dan navigasi keyboard. |
| **Video Showcase Player** | Pemutar video gameplay `.mp4` responsif dengan fitur mute/unmute dan auto-pause otomatis saat tidak terlihat. |
| **Full-screen Lightbox Gallery** | Galeri tangkapan layar beresolusi penuh dengan navigasi slide (tombol, keyboard, dan swipe). |
| **Konfigurasi Terpusat** | Seluruh konten — nama, bio, foto, background, dan data proyek — dikelola dari satu file: `portfolio-config.js`. |

---

## Daftar Proyek yang Ditampilkan

| # | Judul | Genre | Peran | Studio / Event |
|---|---|---|---|---|
| 01 | **Altalis** | Pixel Art Metroidvania | Lead 2D & Pixel Artist | Fiz Studio |
| 02 | **Dust March** | Action RTS | UI & Character Artist | Proyek Kampus |
| 03 | **Sea Fighter** | Endless Runner | Pixel Artist & Environment Designer | Proyek Kampus |
| 04 | **Fiz Catcher** | Multiplayer Arcade | 2D Character Artist | Gimersia |
| 05 | **So You Can Rise Once Again** | Narrative RPG / Visual Novel | Character Artist & UI Designer | One Day Team |
| 06 | **Carrot Rain** | Casual 3D Arcade | 3D Artist & Game Designer | Proyek Kampus |
| 07 | **Crabfish Torpedo** | Underwater Action | 2D Artist | Game Jam Plus |

---

## Struktur Proyek

```text
Portofolio_Firdaus/
├── index.html              # Markup utama (HTML5 semantik)
├── style.css               # Styling, layout fluid, 3D carousel, parallax, dan tipografi
├── script.js               # Logika interaktif: carousel, parallax, video player, lightbox
├── portfolio-config.js     # File konfigurasi utama — edit konten di sini
├── PANDUAN_MENGUBAH_ASET.md # Panduan lengkap pengelolaan aset
├── game-assets-catalog.js  # Katalog aset game terindeks
├── server.js               # Server lokal Node.js untuk pengembangan
├── Game 1–7/               # Folder aset per proyek (screenshot & video)
├── ASSET GERAK/            # Sprite sheet dan aset animasi GIF carousel
├── assets/
│   └── asset/              # Foto profil, background parallax, ilustrasi karakter
└── scripts/
    └── build_catalog.js    # Skrip build untuk menghasilkan katalog aset
```

---

## Cara Menjalankan

**Tanpa server (cara cepat):**
Buka langsung file `index.html` di browser (Chrome, Edge, Firefox, Brave).

**Dengan local server (direkomendasikan):**

```bash
# Node.js
node server.js

# atau via npx
npx serve .

# atau Python
python -m http.server 8000
```

Lalu akses `http://localhost:8000` di browser.

---

## Pembaruan Konten

Semua konten portofolio — foto, bio, background, dan daftar proyek — dapat diperbarui **tanpa menyentuh kode HTML atau CSS**. Cukup edit file `portfolio-config.js`.

Panduan lengkap tersedia di: **[PANDUAN_MENGUBAH_ASET.md](PANDUAN_MENGUBAH_ASET.md)**

---

## Kontak

| Platform | Detail |
|---|---|
| Email | firo13.aji@gmail.com |
| WhatsApp | +62 838-4120-0252 |
| LinkedIn | [m-firdaus-el-ghaby](https://www.linkedin.com/in/m-firdaus-el-ghaby-14a719273) |
| Instagram | [@yokitofiruls](https://www.instagram.com/yokitofiruls/) |
| Itch.io | [firuls.itch.io](https://firuls.itch.io/) |

