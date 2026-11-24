/**
 * PORTFOLIO CONFIGURATION — Edit di sini untuk mengubah konten, foto, link, dan daftar proyek.
 */

window.PORTFOLIO_CONFIG = {
  // 1. INFORMASI PRIBADI & FOTO UTAMA
  personal: {
    name: "Muhamad Firdaus El Ghaby",
    shortName: "Firuls",
    navBrand: "Firuls",
    title: "Muhamad Firdaus El Ghaby (Firuls) — Game Artist Portofolio",
    role: "2D, 3D & Pixel Artist | Game Artist",
    profilePhoto: "assets/asset/Group 3.png",
    profilePhotoAlt: "Foto profil Muhamad Firdaus El Ghaby (Firuls)",
    heroCharacter: "assets/asset/Tak berjudul5_20261122164533.png",
    heroCharacterAlt: "Karakter Firuls",
    heroTitleArt: "assets/asset/portofolio.png",
    heroTitleAlt: "PORTfolio",
    bioHtml: `Halo, saya <strong>Muhamad Firdaus El Ghaby</strong> — seorang <strong>2D, 3D &amp; Pixel Artist</strong> sekaligus mahasiswa <strong>Teknologi Game di PENS</strong>. Saya fokus menciptakan aset <strong>Charakter game, Animasi , Environment, dan UI</strong>, serta memiliki pemahaman di bidang <strong>Charakter Desain dan Consep Art</strong>. Saat ini terbuka untuk peluang magang sebagai 2D/Pixel Artist di studio game profesional untuk terus berkembang bersama tim.`,
    resumeUrl: "https://drive.google.com/file/d/18z9NYYMRAkMzjRaq811l1wlSDZ9sGfEc/view?usp=sharing"
  },

  // 2. BACKGROUND & DEKORASI PARALLAX
  backgrounds: {
    heroSky: "assets/asset/Tak berjudul3_20261122172955.png",
    aboutSky: "assets/asset/about_sky_bg.png",
    lakeReflection: "assets/asset/about_sky_bg.png",
    aboutPoles: "assets/asset/Tak berjudul4_20261124102957.png",
    hillBack: "assets/asset/Tak berjudul4_20261124102957.png",
    hillFront: "none",
    bushDivider: "linear-gradient(to bottom, transparent, #181932)",
    crystalBack: "none",
    crystalFront: "none",
    footerRocks: "none"
  },

  // 3. ELEMEN DEKORASI BERGERAK
  decorations: {},

  // 4. KONTAK & MEDIA SOSIAL
  contacts: {
    whatsapp: "+62 83841200252",
    whatsappLink: "https://api.whatsapp.com/send/?phone=6283841200252&text&type=phone_number&app_absent=0",
    email: "firo13.aji@gmail.com",
    portfolioPdfUrl: "https://drive.google.com/file/d/18z9NYYMRAkMzjRaq811l1wlSDZ9sGfEc/view?usp=sharing",
    socials: {
      instagram: "https://www.instagram.com/yokitofiruls/",
      linkedin: "https://www.linkedin.com/in/m-firdaus-el-ghaby-14a719273",
      itchio: "https://firuls.itch.io/"
    }
  },

  // 5. DAFTAR PROYEK
  projects: [
    {
      id: "project-01",
      number: "01",
      title: "Altalis",
      label: "PROJECT FIZ STUDIO",
      category: "Pixel Art Game",
      year: "2024",
      role: "Lead 2D & Pixel Artist",
      tools: ["Aseprite", "Unity", "Photoshop"],
      playUrl: "https://store.steampowered.com/app/4696840/Altalis_Demo/",
      playLabel: "Play On Steam",
      description: "Altalis adalah proyek game petualangan pixel art yang berfokus pada eksplorasi yang mengusung konsep metroidvania. Saya bertanggung jawab penuh dalam perancangan sprite karakter, tileset lingkungan, animasi movement hingga efek pertarungan, serta antarmuka (HUD) dengan palet warna bernuansa kelam.",
      carouselImage: "ASSET GERAK/Altalis1.png",
      video: "Game 1/footage_altalis.mp4",
      gallery: [
        { src: "Game 1/Altalis1.png", alt: "Tangkapan layar judul dan karakter Altalis" },
        { src: "Game 1/Altalis2.png", alt: "Tangkapan layar dialog dan antarmuka Altalis" },
        { src: "Game 1/Altalis3.png", alt: "Tangkapan layar eksplorasi level pixel art Altalis" },
        { src: "Game 1/Altalis4.png", alt: "Tangkapan layar environment background dan level design Altalis 1" },
        { src: "Game 1/Altalis5.png", alt: "Tangkapan layar environment background dan level design Altalis 2" }
      ]
    },
    {
      id: "project-02",
      number: "02",
      title: "Dust March",
      label: "PROJECT KAMPUS",
      category: "Action Game",
      year: "2024",
      role: "UI Artist & Charakter Artist",
      tools: ["Photoshop", "Unity", "IbisPaint"],
      playUrl: "https://astreda.itch.io/dust-march",
      playLabel: "Play On Itch.io",
      description: "Dust March adalah game RTS dimana dunia telah mengalami kiamat yang menyebabkan banyak masalah politik dan rencana penyatuhan negara. Saya bertanggung jawab atas desain Charakter, Animasi, antarmuka pengguna (UI), dan penciptaan nuansa game semi militer.",
      carouselImage: "ASSET GERAK/Dust_March_IlblP3BF9l.jpg",
      video: "Game 2/2026-11-22 15-40-06 - Trim.mp4",
      gallery: [
        { src: "Game 2/Dust_March_QcekVzW46Q.png", alt: "Tangkapan layar gameplay Dust March 1" },
        { src: "Game 2/Dust_March_qodIebWg8x.png", alt: "Tangkapan layar gameplay Dust March 2" },
        { src: "Game 2/Dust_March_IlblP3BF9l.jpg", alt: "Tangkapan layar gameplay Dust March 3" }
      ]
    },
    {
      id: "project-03",
      number: "03",
      title: "Sea Fighter",
      label: "PROJECT KAMPUS",
      category: "Underwater Action RPG",
      year: "2024",
      role: "Pixel Artist & Environment Designer",
      tools: ["Aseprite", "Photoshop", "Unity"],
      playUrl: "https://fiz-studio.itch.io/sea-fighter",
      playLabel: "Play On Itch.io",
      description: "Sea Fighter adalah game endless runner namun saya membawa tema kapal yang menjelajahi lautan nusantara. Bertanggung jawab dalam perancangan animasi kapal dan obstacle, efek visual air, serta elemen antarmuka HUD dan UI.",
      carouselImage: "ASSET GERAK/Sea_Fighter_L9ZtJ1zb1b.png",
      video: "Game 3/2026-11-22 15-57-23 - Trim.mp4",
      gallery: [
        { src: "Game 3/Sea_Fighter_fQzKu9ezJB.png", alt: "Tangkapan layar gameplay Sea Fighter 1" },
        { src: "Game 3/Sea_Fighter_L9ZtJ1zb1b.png", alt: "Tangkapan layar gameplay Sea Fighter 2" },
        { src: "Game 3/Sea_Fighter_xZ3LAU3OBa.png", alt: "Tangkapan layar gameplay Sea Fighter 3" }
      ]
    },
    {
      id: "project-04",
      number: "04",
      title: "Fiz Catcher",
      label: "GIMERSIA",
      category: "Multiplayer Arcade",
      year: "2023",
      role: "2D Charakter Artist",
      tools: ["Photoshop", "Unity", "Aseprite"],
      playUrl: "https://fiz-studio.itch.io/fiz-catcher",
      playLabel: "Play On Itch.io",
      description: "Fiz Catcher reverse mekanik dari Pac-Man adalah game arcade kasual untuk 4 pemain bersama di satu layar. Saya bekerja sebagai perancang semua charakter berserta animasinya dan saya juga turun ikut andil dalam merancang desain level.",
      carouselImage: "Game 4/image (1).webp",
      video: "Game 4/footageFizCatcher.mp4",
      gallery: [
        { src: "Game 4/image.webp", alt: "Gameplay arena aksi Fiz Catcher 1" },
        { src: "Game 4/image (1).webp", alt: "Gameplay pertarungan Fiz Catcher 2" },
        { src: "Game 4/image (2).webp", alt: "Gameplay seru 4 pemain Fiz Catcher 3" },
        { src: "Game 4/FizCatcher3.png", alt: "Arena gameplay padang rumput Fiz Catcher" }
      ]
    },
    {
      id: "project-05",
      number: "05",
      title: "So You Can Rise Once Again",
      label: "ONE DAY TEAM",
      category: "Narrative RPG / Visual Novel",
      year: "2024",
      role: "Character Artist & UI Designer",
      tools: ["Photoshop", "Unity / Web", "IbisPaint"],
      playUrl: "https://firuls.itch.io/so-you-can-rise-once-again",
      playLabel: "Play On Itch.io",
      description: "So You Can Rise Once Again adalah game naratif interaktif bergaya visual novel emosional dimana player berperan sebagai seorang psikiater. Bertanggung jawab atas ilustrasi karakter, aset background interior ruang konsultasu, dan perancangan antarmuka kotak dialog bergaya robekan kertas catatan.",
      carouselImage: "ASSET GERAK/chrome_jsABIjCRUL.png",
      video: "Game 6/2026-11-22 16-05-37 - Trim.mp4",
      gallery: [
        { src: "Game 6/chrome_jsABIjCRUL.png", alt: "Layar menu utama So You Can Rise Once Again" },
        { src: "Game 6/chrome_mdvolx4sdN.png", alt: "Adegan dialog karakter Sophie" },
        { src: "Game 6/chrome_wUtQWM2Sfm.png", alt: "Pilihan percabangan dialog interaktif" }
      ]
    },
    {
      id: "project-06",
      number: "06",
      title: "Carrot Rain",
      label: "PROJECT KAMPUS",
      category: "Casual 3D Arcade",
      year: "2024",
      role: "3D Artist & Game Designer",
      tools: ["Blender", "Unity", "Photoshop"],
      playUrl: "https://ginzax.itch.io/carrot-rain",
      playLabel: "Play On Itch.io",
      description: "Carrot Rain adalah game kasual 3D menangkap wortel yang berjatuhan dari langit sebelum waktu habis. Bertanggung jawab atas pemodelan 3D low-poly karakter rubah, pemodelan asset wortel, efek pencahayaan cerah, serta elemen antarmuka skor dan timer bertema papan kayu.",
      carouselImage: "ASSET GERAK/chrome_7zxA23UDGd.png",
      video: "Game 7/2026-11-22 16-07-05 - Trim.mp4",
      gallery: [
        { src: "Game 7/chrome_7zxA23UDGd.png", alt: "Layar menu utama Carrot Rain" },
        { src: "Game 7/cover.png", alt: "Cuplikan gameplay aksi menangkap wortel Carrot Rain" }
      ]
    },
    {
      id: "project-07",
      number: "07",
      title: "Crabfish Torpedo",
      label: "GAMEJAM PLUS",
      category: "Underwater Action",
      year: "2023",
      role: "2D Artist item Update Able",
      tools: ["Aseprite", "Photoshop", "Godot"],
      playUrl: "https://ginzax.itch.io/crabfish-torpedo",
      playLabel: "Play On Itch.io",
      description: "Crabfish Torpedo menyajikan petualanggan di kedalaman laut biru, dimana kamu harus membantu kepiting untuk bisa berenang jauh ke tengah laut. saya berperan untuk membuat item upgradeable, desain antar muka (UI) dan efek ledakan .",
      carouselImage: "ASSET GERAK/Crabfish1.png",
      video: "Game 5/footage_crabfish.mp4",
      gallery: [
        { src: "Game 5/Crabfish1.png", alt: "Layar judul game bawah laut Crabfish Torpedo" },
        { src: "Game 5/Crabfish2.png", alt: "Latar terumbu karang dan kedalaman laut Crabfish Torpedo" },
        { src: "Game 5/Crabfish3.png", alt: "Antarmuka menu dan aset lingkungan Crabfish Torpedo" }
      ]
    }
  ]
};
