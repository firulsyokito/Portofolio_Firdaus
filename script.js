(() => {
  'use strict';

  /* ========================================================================
     CAROUSEL TUNABLE PARAMETERS
     Adjust these constants to customize speed, curvature, and stretch.
     ======================================================================== */
  const CAROUSEL_CONFIG = {
    autoSpeed: 42,           // Pixels per second for continuous auto-rotation
    maxRotateDeg: 40,        // Max inward Y-tilt (degrees) at viewport edges
    maxStretchX: 1.46,       // Max horizontal scale at viewport edges
    maxStretchY: 1.12,       // Max vertical scale at viewport edges
    outwardCurve: 0.42,      // Extra horizontal spacing factor so stretched cards never overlap
    minOpacity: 0.86,        // Minimum opacity at viewport edges
    inertiaDecay: 0.94,      // Momentum damping per frame after drag release
    resumeDelayMs: 1100,     // Idle wait (ms) after drag/key before auto-scroll resumes
    dragThresholdPx: 6,      // Movement threshold to distinguish drag from click
    keyboardStepScale: 0.85  // Fraction of a card step per ArrowLeft/ArrowRight press
  };

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. ACTIVE NAVIGATION HIGHLIGHTING */
  function initActiveNavigation() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link[data-nav]'));
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    const sectionTargets = [
      { el: document.getElementById('home'), navKey: 'home' },
      { el: document.getElementById('about'), navKey: 'about' },
      { el: document.getElementById('portofolio'), navKey: 'portofolio' },
      ...Array.from(document.querySelectorAll('.project-section')).map((el) => ({
        el,
        navKey: 'portofolio'
      })),
      { el: document.getElementById('contact'), navKey: 'contact' }
    ].filter((item) => item.el);

    const visibleRatios = new Map();

    function setActiveNav(navKey) {
      navLinks.forEach((link) => {
        const isMatch = link.dataset.nav === navKey;
        link.classList.toggle('is-active', isMatch);
        if (isMatch) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestKey = 'home';
        let bestScore = -1;

        sectionTargets.forEach(({ el, navKey }) => {
          const ratio = visibleRatios.get(el) || 0;
          if (ratio > bestScore) {
            bestScore = ratio;
            bestKey = navKey;
          }
        });

        if (bestScore > 0) {
          setActiveNav(bestKey);
        }
      },
      {
        rootMargin: '-18% 0px -35% 0px',
        threshold: [0, 0.15, 0.35, 0.6]
      }
    );

    sectionTargets.forEach(({ el }) => observer.observe(el));
  }

  /* 2. SCROLL REVEAL ANIMATIONS */
  function initScrollReveal() {
    const groups = document.querySelectorAll('.reveal-group');
    groups.forEach((group) => {
      const items = group.querySelectorAll('.reveal-item');
      items.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index * 75, 300)}ms`);
      });
    });

    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) return;

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.classList.add('is-visible');
      }
    });

    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.06
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  /* 3. FEATURED BANNER SLIDER (#portofolio) — Layout Foto 2 */
  function initPortfolioCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.carousel-card'));
    const total = cards.length;
    if (!total) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    let touchStartX = 0;
    let touchStartY = 0;

    function updateSlider(newIndex) {
      currentIndex = ((newIndex % total) + total) % total;

      cards.forEach((card, idx) => {
        let diff = (idx - currentIndex) % total;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        card.classList.remove('is-active', 'is-prev', 'is-next', 'is-far-prev', 'is-far-next', 'is-hidden');

        if (diff === 0) {
          card.classList.add('is-active');
        } else if (diff === -1) {
          card.classList.add('is-prev');
        } else if (diff === 1) {
          card.classList.add('is-next');
        } else if (diff === -2) {
          card.classList.add('is-far-prev');
        } else if (diff === 2) {
          card.classList.add('is-far-next');
        } else {
          card.classList.add('is-hidden');
        }
      });

      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
        resetAutoPlay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateSlider(idx);
        resetAutoPlay();
      });
    });

    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        if (card.classList.contains('is-prev')) {
          e.preventDefault();
          updateSlider(currentIndex - 1);
          resetAutoPlay();
        } else if (card.classList.contains('is-next')) {
          e.preventDefault();
          updateSlider(currentIndex + 1);
          resetAutoPlay();
        }
        // When .is-active, allows default anchor jump to #project-0X
      });
    });

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          updateSlider(currentIndex - 1);
        } else {
          updateSlider(currentIndex + 1);
        }
        resetAutoPlay();
      }
    }, { passive: true });

    function startAutoPlay() {
      if (reducedMotionQuery.matches) return;
      stopAutoPlay();
      autoPlayTimer = setInterval(() => {
        updateSlider(currentIndex + 1);
      }, 4500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    const sliderContainer = document.getElementById('portfolio-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    updateSlider(0);
    startAutoPlay();
  }

  /* 4. AUTO-PLAYING PROJECT VIDEOS (PAUSE WHEN OFF-SCREEN) */
  function initProjectVideos() {
    const videos = Array.from(document.querySelectorAll('.project-video'));
    if (!videos.length) return;

    const blockedVideos = new Set();

    function tryPlay(video) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          blockedVideos.add(video);
        });
      }
    }

    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              tryPlay(video);
            } else {
              video.pause();
            }
          });
        },
        { rootMargin: '220px 0px' }
      );

      videos.forEach((video) => videoObserver.observe(video));
    } else {
      videos.forEach((video) => tryPlay(video));
    }

    function retryBlockedVideos() {
      if (!blockedVideos.size) return;
      blockedVideos.forEach((video) => {
        tryPlay(video);
      });
      blockedVideos.clear();
    }

    window.addEventListener('pointerdown', retryBlockedVideos, { once: true, passive: true });
    window.addEventListener('keydown', retryBlockedVideos, { once: true, passive: true });
  }

  /* 5. SUBTLE SEAM-SAFE BACKGROUND PARALLAX */
  function initParallaxLayers() {
    const layers = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!layers.length || reducedMotionQuery.matches) return;

    let ticking = false;

    function updateParallax() {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset;

      // Read parent bounds first, then write clamped translate3d
      const updates = layers.map((layer) => {
        const parent = layer.parentElement;
        const rect = parent ? parent.getBoundingClientRect() : layer.getBoundingClientRect();
        const factor = parseFloat(layer.dataset.parallax) || 0;
        const centerOffset = rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
        const shift = Math.max(-18, Math.min(18, -centerOffset * factor));
        return { layer, shift, scrollY };
      });

      updates.forEach(({ layer, shift }) => {
        layer.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      });
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateParallax);
        }
      },
      { passive: true }
    );

    updateParallax();
  }

  /* 5b. HERO CHARACTER SCROLL PARALLAX — scroll down → character floats up */
  function initHeroCharParallax() {
    if (reducedMotionQuery.matches) return;
    const wrap = document.querySelector('.hero-character-wrap');
    if (!wrap) return;

    let ticking = false;
    let baseScrollY = 0; // captured once so the char starts at neutral

    function update() {
      ticking = false;
      const scrollY = window.scrollY || window.pageYOffset;
      // Move up at 0.38× scroll speed, clamped so it doesn't fly off-screen
      const lift = Math.min(scrollY * 0.38, 140);
      wrap.style.transform = `translateY(${-lift.toFixed(1)}px)`;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  }

  /* 6. THUMBNAIL LIGHTBOX VIEWER */
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const thumbButtons = Array.from(document.querySelectorAll('.thumb-btn'));

    if (!lightbox || !lightboxImg || !lightboxCaption || !thumbButtons.length) return;

    let activeGroup = [];
    let activeIndex = 0;
    let lastTrigger = null;

    function showSlide(index) {
      if (!activeGroup.length) return;
      activeIndex = (index + activeGroup.length) % activeGroup.length;
      const btn = activeGroup[activeIndex];
      lightboxImg.src = btn.dataset.lightboxSrc || '';
      lightboxImg.alt = btn.dataset.lightboxAlt || '';
      lightboxCaption.textContent = btn.dataset.lightboxAlt || '';
    }

    function openLightbox(triggerBtn) {
      const groupName = triggerBtn.dataset.lightboxGroup;
      activeGroup = thumbButtons.filter((btn) => btn.dataset.lightboxGroup === groupName);
      activeIndex = Math.max(0, activeGroup.indexOf(triggerBtn));
      lastTrigger = triggerBtn;

      showSlide(activeIndex);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';

      const closeBtn = lightbox.querySelector('.lightbox-close');
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.hidden = true;
      lightboxImg.src = '';
      document.body.style.overflow = '';
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    thumbButtons.forEach((btn) => {
      btn.addEventListener('click', () => openLightbox(btn));
    });

    window.openDirectLightbox = function(items, startIndex) {
      if (!items || !items.length) return;
      activeGroup = items.map(function(it) {
        return {
          dataset: {
            lightboxSrc: it.path,
            lightboxAlt: it.fileName + ' (' + it.category + ')'
          }
        };
      });
      activeIndex = Math.max(0, Math.min(startIndex || 0, activeGroup.length - 1));
      lastTrigger = null;
      showSlide(activeIndex);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      var closeBtn = lightbox.querySelector('.lightbox-close');
      if (closeBtn) closeBtn.focus();
    };

    lightbox.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-lightbox-close')) {
        closeLightbox();
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => showSlide(activeIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => showSlide(activeIndex + 1));
    }

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showSlide(activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        showSlide(activeIndex + 1);
      }
    });
  }

  /* 0. EASY CONFIGURATION LOADER (reads portfolio-config.js) */
  function applyPortfolioConfig() {
    if (!window.PORTFOLIO_CONFIG) return;
    const cfg = window.PORTFOLIO_CONFIG;

    // 1. Dynamic Background Decorations (Update CSS variables)
    if (cfg.backgrounds) {
      const rootStyle = document.documentElement.style;
      const bgMap = {
        heroSky: ['--bg-hero-sky'],
        aboutSky: ['--bg-about-sky', '--bg-reflection'],
        lakeReflection: ['--bg-about-sky', '--bg-reflection'],
        aboutPoles: ['--bg-about-poles', '--bg-hill-back'],
        hillBack: ['--bg-about-poles', '--bg-hill-back'],
        hillFront: ['--bg-hill-front'],
        bushDivider: ['--bg-bush-divider'],
        crystalBack: ['--bg-crystal-back'],
        crystalFront: ['--bg-crystal-front'],
        footerRocks: ['--bg-footer-rocks']
      };
      Object.keys(bgMap).forEach((key) => {
        if (cfg.backgrounds[key] !== undefined) {
          const val = cfg.backgrounds[key];
          const cssVal = (!val || val === 'none')
            ? 'none'
            : (val.startsWith('linear-gradient') ? val : `url("${val}")`);
          bgMap[key].forEach((prop) => {
            rootStyle.setProperty(prop, cssVal);
          });
        }
      });
    }

    // 2. Personal Information & Photos
    if (cfg.personal) {
      const p = cfg.personal;
      if (p.title) document.title = p.title;
      if (p.navBrand) {
        const brand = document.querySelector('.nav-brand');
        if (brand) brand.textContent = p.navBrand;
      }
      if (p.heroCharacter) {
        const heroChar = document.querySelector('.hero-character-art');
        if (heroChar) {
          heroChar.src = p.heroCharacter;
          if (p.heroCharacterAlt) heroChar.alt = p.heroCharacterAlt;
        }
      }
      if (p.heroTitleArt) {
        const heroArt = document.querySelector('.hero-title-art');
        if (heroArt) {
          heroArt.src = p.heroTitleArt;
          if (p.heroTitleAlt) heroArt.alt = p.heroTitleAlt;
        }
      }
      if (p.profilePhoto) {
        const portrait = document.querySelector('.portrait-img');
        if (portrait) {
          portrait.src = p.profilePhoto;
          if (p.profilePhotoAlt) portrait.alt = p.profilePhotoAlt;
        }
      }
      if (p.bioHtml) {
        const bio = document.querySelector('.about-text');
        if (bio) bio.innerHTML = p.bioHtml;
      }
      if (p.resumeUrl) {
        const resumeBtn = document.querySelector('.btn-resume');
        if (resumeBtn) resumeBtn.href = p.resumeUrl;
      }
    }

    // 3. Floating Animated Decorations
    if (cfg.decorations) {
      const d = cfg.decorations;
      if (d.characterIdle) {
        const rachel = document.querySelector('.project-deco-rachel img');
        if (rachel) rachel.src = d.characterIdle;
      }
      if (d.spaceStation) {
        const station = document.querySelector('.project-deco-station img');
        if (station) station.src = d.spaceStation;
      }
      if (d.birdGif) {
        document.querySelectorAll('.eden-bird').forEach((el) => {
          el.src = d.birdGif;
        });
      }
      if (d.cursorGif) {
        const cursor = document.querySelector('.eden-hand-gif');
        if (cursor) cursor.src = d.cursorGif;
      }
    }

    // 4. Contact & Social Links
    if (cfg.contacts) {
      const c = cfg.contacts;
      
      // Modern Contact Cards
      const waCard = document.querySelector('.contact-card--wa');
      if (waCard) {
        if (c.whatsappLink) waCard.href = c.whatsappLink;
        const val = waCard.querySelector('.contact-card-value');
        if (val && c.whatsapp) val.textContent = c.whatsapp;
      }
      const mailCard = document.querySelector('.contact-card--mail');
      if (mailCard) {
        if (c.email) {
          mailCard.href = `mailto:${c.email}`;
          const val = mailCard.querySelector('.contact-card-value');
          if (val) val.textContent = c.email;
        }
      }
      const pdfCard = document.querySelector('.contact-card--pdf');
      if (pdfCard && c.portfolioPdfUrl) {
        pdfCard.href = c.portfolioPdfUrl;
      }

      // Legacy fallback
      const contactLinks = document.querySelectorAll('.footer-contacts a');
      if (contactLinks.length >= 3) {
        if (c.whatsapp) {
          contactLinks[0].textContent = c.whatsapp;
          if (c.whatsappLink) contactLinks[0].href = c.whatsappLink;
        }
        if (c.email) {
          contactLinks[1].textContent = c.email;
          contactLinks[1].href = `mailto:${c.email}`;
        }
        if (c.portfolioPdfUrl) {
          contactLinks[2].href = c.portfolioPdfUrl;
        }
      }
      if (c.socials) {
        const socialBtns = document.querySelectorAll('.social-list a');
        if (socialBtns.length >= 3) {
          if (c.socials.instagram) socialBtns[0].href = c.socials.instagram;
          if (c.socials.linkedin) socialBtns[1].href = c.socials.linkedin;
          if (c.socials.itchio) {
            socialBtns[2].href = c.socials.itchio;
            const moreGamesBtn = document.querySelector('.more-games-btn');
            if (moreGamesBtn) moreGamesBtn.href = c.socials.itchio;
          }
        }
      }
    }

    // 5. Projects Sync
    if (Array.isArray(cfg.projects) && cfg.projects.length) {
      cfg.projects.forEach((proj) => {
        const targetId = proj.id;
        // Carousel card
        const card = document.querySelector(`.carousel-card[href="#${targetId}"]`);
        if (card) {
          if (proj.carouselImage) {
            const cardImg = card.querySelector('img');
            if (cardImg) {
              cardImg.src = proj.carouselImage;
              if (proj.title) cardImg.alt = proj.title;
            }
          }
          if (proj.title) {
            const cardTitle = card.querySelector('.carousel-card-title');
            if (cardTitle) {
              cardTitle.textContent = proj.title;
            }
          }
        }

        // Project section
        const section = document.getElementById(targetId);
        if (section) {
          if (proj.label) {
            const labelSpan = section.querySelector('.project-label span:last-child');
            if (labelSpan) labelSpan.textContent = proj.label;
          }
          if (proj.title) {
            const h = section.querySelector('.project-title');
            if (h) h.textContent = proj.title;
          }
          if (proj.description) {
            const desc = section.querySelector('.project-desc');
            if (desc) desc.textContent = proj.description;
          }
          if (proj.role) {
            const metaRole = section.querySelector('.project-role') || section.querySelector('.project-meta-item:nth-child(2) dd');
            if (metaRole) {
              const roleText = proj.role.trim();
              metaRole.textContent = /^role\s*:/i.test(roleText) ? roleText : `Role: ${roleText}`;
            }
          }
          if (proj.playUrl) {
            const playLink = section.querySelector('.media-footer-link .yellow-link');
            if (playLink) {
              playLink.href = proj.playUrl;
              if (proj.playLabel) playLink.textContent = proj.playLabel;
            }
          }
          if (proj.video) {
            const videoEl = section.querySelector('video');
            const videoSource = section.querySelector('video source');
            if (proj.carouselImage && videoEl) {
              videoEl.poster = proj.carouselImage;
            }
            if (videoSource) {
              videoSource.src = proj.video;
              if (videoEl) videoEl.load();
            }
          }
          if (Array.isArray(proj.gallery)) {
            const thumbBtns = section.querySelectorAll('.thumb-btn');
            thumbBtns.forEach((btn, idx) => {
              if (idx < proj.gallery.length) {
                btn.style.display = '';
                const gItem = proj.gallery[idx];
                btn.setAttribute('data-lightbox-src', gItem.src);
                if (gItem.alt) btn.setAttribute('data-lightbox-alt', gItem.alt);
                const thumbImg = btn.querySelector('img');
                if (thumbImg) {
                  thumbImg.src = gItem.src;
                  if (gItem.alt) thumbImg.alt = gItem.alt;
                }
              } else {
                btn.style.display = 'none';
              }
            });
          }
        }
      });
    }
  }

  /* INLINE GAME ASSETS SHOWCASE BOARD (Raw Artwork on Canvas, No Clutter) */
  function initInlineGameAssets() {
    const catalog = window.GAME_ASSETS_CATALOG;
    if (!catalog) return;

    const containers = document.querySelectorAll('.project-inline-assets[data-project-id]');
    if (!containers.length) return;

    // Pixel art games where sprites should use pixelated rendering
    const pixelArtGames = new Set(['p01', 'p03']);

    containers.forEach((container) => {
      const pId = container.dataset.projectId;
      const game = catalog[pId];
      if (!game || !game.assets || !game.assets.length) return;

      container.innerHTML = '';

      // Group assets by consolidated category (UI merged into 1!)
      const catMap = {};
      game.assets.forEach((a) => {
        const cat = a.category;
        if (!catMap[cat]) catMap[cat] = [];
        catMap[cat].push(a);
      });

      // Preferred order: Character/Player first, then Enemies/Bosses, Environment, then UI Assets
      const categoryOrder = [
        'Character & Animation',
        'Character & Roles',
        'Character',
        'Player & Characters',
        'Game Assets & Props',
        'Game Assets',
        'Boss & Enemies',
        'Enemies & Bosses',
        'Level Design & Environment',
        'Room Objects & Interior',
        'Ships & Obstacles',
        'Walls & Obstacles',
        'Environment & Props',
        'UI Assets',
        'UI & Ability Assets'
      ];

      const categories = Object.keys(catMap).sort((a, b) => {
        let idxA = categoryOrder.indexOf(a);
        let idxB = categoryOrder.indexOf(b);
        if (idxA === -1) idxA = 99;
        if (idxB === -1) idxB = 99;
        return idxA - idxB;
      });

      categories.forEach((catName) => {
        const items = catMap[catName];
        if (!items || !items.length) return;

        const groupEl = document.createElement('div');
        groupEl.className = 'raw-showcase-group';

        const isCharCategory = /character|boss|enem|role|player|harakter|animasi/i.test(catName);
        if (isCharCategory && items.length > 1) {
          groupEl.classList.add('raw-showcase-group--character');
        }

        // Title Row ABOVE the board ("jenis kategori assetnya di atas gambar")
        const titleRow = document.createElement('div');
        titleRow.className = 'raw-showcase-title-row';
        titleRow.innerHTML = `
          <h4 class="raw-showcase-title">${catName}</h4>
        `;
        groupEl.appendChild(titleRow);

        // Canvas / Board
        const board = document.createElement('div');
        board.className = 'raw-showcase-board';
        if (pixelArtGames.has(pId)) {
          board.classList.add('pixelated');
        }

        const grid = document.createElement('div');
        grid.className = 'raw-showcase-grid';
        if (isCharCategory && items.length > 1) {
          grid.classList.add('raw-showcase-grid--character');
        }
        board.appendChild(grid);

        let isExpanded = false;
        const maxInitial = 14;

        function renderBoardItems() {
          grid.innerHTML = '';
          const displayItems = (items.length <= maxInitial || isExpanded)
            ? items
            : items.slice(0, maxInitial);

          displayItems.forEach((asset, idx) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'raw-asset-item';
            const isCharAsset = /character|boss|enem|role|player|harakter|animasi/i.test(catName);
            if (isCharAsset) {
              itemEl.classList.add('raw-asset-item--character');
            }
            const isTallAsset = /wall|obstacle/i.test(catName);
            if (isTallAsset) {
              itemEl.classList.add('raw-asset-item--tall');
            }
            if (items.length === 1) {
              itemEl.classList.add('raw-asset-item--solo');
            }
            if (asset.fileName.toLowerCase().includes('ui_asset')) {
              itemEl.classList.add('raw-asset-item--banner');
            }
            itemEl.setAttribute('role', 'button');
            itemEl.setAttribute('tabindex', '0');
            itemEl.setAttribute('aria-label', `Lihat aset ${asset.fileName}`);

            const isVideo = asset.type === 'video';
            if (isVideo) {
              const video = document.createElement('video');
              video.src = asset.path;
              video.muted = true;
              video.loop = true;
              video.playsInline = true;
              video.preload = 'metadata';
              itemEl.appendChild(video);
            } else {
              const img = document.createElement('img');
              img.src = asset.path;
              img.alt = asset.fileName;
              img.loading = 'lazy';
              itemEl.appendChild(img);
            }

            function triggerPreview() {
              if (typeof window.openDirectLightbox === 'function') {
                window.openDirectLightbox(items, idx);
              }
            }

            itemEl.addEventListener('click', triggerPreview);
            itemEl.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerPreview();
              }
            });

            grid.appendChild(itemEl);
          });

          const existingFooter = board.querySelector('.raw-showcase-footer');
          if (existingFooter) existingFooter.remove();

          if (items.length > maxInitial) {
            const footer = document.createElement('div');
            footer.className = 'raw-showcase-footer';
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'raw-btn-expand';
            btn.textContent = isExpanded 
              ? 'Tampilkan Lebih Sedikit' 
              : `+ Lihat Semua (${items.length - maxInitial} Aset Lagi)`;
            btn.addEventListener('click', () => {
              isExpanded = !isExpanded;
              renderBoardItems();
            });
            footer.appendChild(btn);
            board.appendChild(footer);
          }
        }

        renderBoardItems();
        groupEl.appendChild(board);
        container.appendChild(groupEl);
      });
    });
  }

  /* BOOTSTRAP */
  document.addEventListener('DOMContentLoaded', () => {
    applyPortfolioConfig();
    initActiveNavigation();
    initScrollReveal();
    initPortfolioCarousel();
    initProjectVideos();
    initParallaxLayers();
    initHeroCharParallax();
    initLightbox();
    initInlineGameAssets();

    const urlParams = new URLSearchParams(window.location.search);
    const scrollToId = urlParams.get('scroll');
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, el.offsetTop);
      }
    } else if (window.location.hash) {
      try {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'auto' });
        }
      } catch (e) {}
    }
  });
})();
