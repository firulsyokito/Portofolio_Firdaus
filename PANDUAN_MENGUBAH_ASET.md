# 🎨 Panduan Mengubah Foto, Background Dekorasi, Font, dan Proyek Game

Website portofolio **Muhamad Firdaus El Ghaby (Firuls)** kini mengusung tema **Cosmic Deep Space & Purple Twilight Aesthetic** dengan tipografi khusus `ZOYAM.ttf` dan tampilan yang disesuaikan persis dengan rancangan mockup Anda.

---

## ⚡ Cara Termudah: Cukup Edit `portfolio-config.js`

Semua pengaturan foto, nama, bio, background, dekorasi animasi, dan 7 proyek game sudah disatukan di dalam satu file:
📂 **`portfolio-config.js`**

Anda tidak perlu mengedit kode HTML atau CSS. Cukup buka `portfolio-config.js` di text editor (VS Code, Notepad, dll) dan sesuaikan nilainya:

```javascript
window.PORTFOLIO_CONFIG = {
  personal: {
    name: "Muhamad Firdaus El Ghaby",
    shortName: "Firuls",
    navBrand: "Firuls",
    profilePhoto: "assets/asset/firdaus_portrait.png", // Foto diri di papan billboard
    heroCharacter: "assets/asset/Tak berjudul5_20261122164533.png", // Karakter mengapung di Hero
    bioHtml: `Halo, saya <strong>Muhamad Firdaus El Ghaby</strong>...`,
    resumeUrl: "https://drive.google.com/file/d/..."
  },
  
  backgrounds: {
    heroSky: "assets/asset/Tak berjudul3_20261122172955.png", // Langit Hero Luar Angkasa
    lakeReflection: "assets/asset/about_sky_bg.png",            // Langit Senja Ungu di About
    hillBack: "assets/asset/about_poles_horizon.png",          // Tiang listrik & jembatan di About
    bushDivider: "linear-gradient(to bottom, transparent, #181932)", // Transisi gradien kosmik
    crystalBack: "assets/asset/batu transparan fix 3.png",     // Kristal transparan
    crystalFront: "assets/asset/Batu Depan 3.png",             // Kristal depan
    footerRocks: "assets/asset/Batu karang fix 2.png"          // Karang kosmik atas footer
  },

  decorations: {},

  projects: [
    // 7 Game Proyek:
    // 01: Altalis
    // 02: Dust March
    // 03: Sea Fighter
    // 04: Fiz Catcher
    // 05: So You Can Rise Once Again
    // 06: Carrot Rain
    // 07: Crabfish Torpedo (Urutan terakhir)
  ]
};
```

---

## 📸 1. Mengganti Foto Billboard (About Me) & Karakter Hero

### Mengganti Foto Diri di Papan Billboard (Halaman 2)
1. Siapkan foto Anda.
2. Masukkan ke folder `assets/asset/` (misalnya `assets/asset/foto_baru.png`).
3. Buka `portfolio-config.js`, ubah:
   ```javascript
   profilePhoto: "assets/asset/foto_baru.png",
   ```
4. Atau langsung timpa file `assets/asset/firdaus_portrait.png`.

### Mengganti Karakter Anime Mengapung (Halaman 1)
1. Siapkan ilustrasi karakter Anda berlatar belakang transparan (PNG).
2. Simpan di `assets/asset/karakter_baru.png`.
3. Buka `portfolio-config.js`, ubah:
   ```javascript
   heroCharacter: "assets/asset/karakter_baru.png",
   ```

---

## 🌌 2. Mengganti Background & Dekorasi Parallax

| Nama Lapisan | Letak di Website | File Aktif | Rekomendasi Format |
|---|---|---|---|
| **`heroSky`** | Background langit luar angkasa di section Home | `Tak berjudul3_20261122172955.png` | JPG / PNG (1920×1080) |
| **`lakeReflection`** | Langit awan senja ungu di section About | `about_sky_bg.png` | PNG (1920×1080) |
| **`hillBack`** | Siluet tiang listrik, jembatan & billboard di About | `about_billboard_foreground.png` | PNG Transparan (1920×1080) |
| **`bushDivider`** | Gradien transisi pemisah About dan Portfolio | Gradien CSS `#181932` | CSS / PNG |
| **`crystalBack`** | Bebatuan kristal transparan belakang | `batu transparan fix 3.png` | PNG Transparan |
| **`crystalFront`** | Bebatuan kristal depan ungu | `Batu Depan 3.png` | PNG Transparan |
| **`footerRocks`** | Bebatuan karang ungu di atas footer | `Batu karang fix 2.png` | PNG Transparan |
| **`footerRocks`** | Tebing karang ungu di atas footer | `Batu karang fix 2.png` | PNG Transparan |

### Cara Mengganti:
1. **Via `portfolio-config.js`**:
   Cukup ganti path file pada bagian `backgrounds: { ... }`.
2. **Via `style.css` (CSS Variables)**:
   Buka file `style.css`, di bagian paling atas (baris 10-20) sudah disediakan variabel resmi:
   ```css
   :root {
     --bg-hero-sky: url("assets/asset/LangitBaru.png");
     --bg-reflection: url("assets/asset/AirBaru.png");
     --bg-hill-back: url("assets/asset/BukitBelakang.png");
     --bg-hill-front: url("assets/asset/BukitDepan.png");
     --bg-bush-divider: url("assets/asset/SemakBaru.png");
     --bg-crystal-back: url("assets/asset/BatuBelakang.png");
     --bg-crystal-front: url("assets/asset/BatuDepan.png");
     --bg-footer-rocks: url("assets/asset/KarangFooter.png");
   }
   ```
3. **Via Replace File Langsung**:
   Ganti file yang ada di dalam folder `assets/asset/` dengan gambar baru memakai nama file yang sama.

---

## 🎮 3. Mengganti Proyek, Screenshot, dan Video Gameplay

### Struktur Aset Proyek:
- **Screenshot Proyek** berada di folder: `assets/photo/`
- **Video Gameplay (.mp4)** berada di folder: `assets/footage/`

### Cara Mengubah Data Proyek:
Buka `portfolio-config.js`, cari bagian `projects`:
```javascript
{
  id: "project-01",
  number: "01",
  title: "Nama Game Anda",
  category: "Pixel Art Action RPG",
  year: "2025",
  role: "Lead 2D & Pixel Artist",
  tools: ["Aseprite", "Unity", "Photoshop"],
  description: "Deskripsi singkat tentang proyek game Anda...",
  
  // Gambar yang muncul pada 3D Carousel di atas
  carouselImage: "assets/photo/GameSaya_Cover.png",

  // Video gameplay looping
  video: "assets/footage/GameSaya_Video.mp4",

  // Galeri gambar popup (Lightbox Modal saat diklik)
  gallery: [
    { src: "assets/photo/GameSaya_1.png", alt: "Screenshot gameplay 1" },
    { src: "assets/photo/GameSaya_2.png", alt: "Screenshot gameplay 2" },
    { src: "assets/photo/GameSaya_3.png", alt: "Screenshot menu UI" }
  ]
}
```

---

## 🪶 4. Dekorasi Karakter
Semua dekorasi animasi mengapung (karakter pixel Rachel, stasiun luar angkasa, burung, dan kursor) telah dihapus agar desain showcase game lebih bersih, profesional, dan fokus pada konten proyek.

---

## 🚀 5. Cara Menjalankan Portofolio di Komputer Lokal

1. **Cara Cepat**:
   Cukup klik dua kali (double click) file **`index.html`**. File langsung terbuka di browser favorit Anda (Google Chrome, Edge, Firefox, Brave).
2. **Cara Menjalankan dengan Local Web Server (Direkomendasikan)**:
   - Jika memakai **VS Code**: Install ekstensi *Live Server*, lalu klik kanan `index.html` -> *Open with Live Server*.
   - Jika memakai **Node.js**:
     Buka PowerShell / Terminal di folder ini dan ketik:
     ```bash
     npx serve .
     ```
   - Jika memakai **Python**:
     ```bash
     python -m http.server 8000
     ```
     Lalu buka `http://localhost:8000` di browser.

