/**
 * TONE / FORM — Master JavaScript
 * "Your Shade. Your Match. Your Finish."
 * Vanilla JS + GSAP + Theme Persistence + Interactive Beauty-Tech Engines
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. THEME ENGINE (Light / Dark Mode with Persistence)
  // =========================================================================
  const THEME_KEY = 'tone-form-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update toggle icons
    document.querySelectorAll('.btn-theme-toggle').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun';
          btn.setAttribute('aria-label', 'Switch to light mode');
          btn.setAttribute('title', 'Switch to light mode');
        } else {
          icon.className = 'bi bi-moon-stars';
          btn.setAttribute('aria-label', 'Switch to dark mode');
          btn.setAttribute('title', 'Switch to dark mode');
        }
      }
    });
  }

  // Initialize theme immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Listen for system theme changes if user has not set explicit preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(THEME_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Global theme toggle button listener
  document.addEventListener('click', e => {
    const toggleBtn = e.target.closest('.btn-theme-toggle');
    if (toggleBtn) {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    }
  });

  // =========================================================================
  // 2. DOM CONTENT LOADED INITIALIZATIONS
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initGSAPAnimations();
    initShadeSwatches();
    initShadeMatcherWizard();
    initUndertoneAnalyzer();
    initKitBuilder();
    initShopCatalogue();
    initReviewsGallery();
    initDashboardEngine();
    initAuthForms();
    initPasswordToggle();
  });

  // =========================================================================
  // 3. STICKY NAVBAR & MOBILE MENU
  // =========================================================================
  function initNavbar() {
    const navbar = document.querySelector('.tf-navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // ESC key closes any open dropdowns or mobile collapses
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const openedCollapse = document.querySelector('.navbar-collapse.show');
        if (openedCollapse && window.bootstrap) {
          const bsCollapse = bootstrap.Collapse.getInstance(openedCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
        const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
        openDropdowns.forEach(menu => {
          const toggle = menu.closest('.dropdown')?.querySelector('[data-bs-toggle="dropdown"]');
          if (toggle && window.bootstrap) {
            const bsDropdown = bootstrap.Dropdown.getInstance(toggle);
            if (bsDropdown) bsDropdown.hide();
          }
        });
      }
    });

    // Close mobile collapse on outside click
    document.addEventListener('click', e => {
      const navCollapse = document.querySelector('.navbar-collapse.show');
      if (navCollapse && !navCollapse.contains(e.target) && !e.target.closest('.navbar-toggler')) {
        if (window.bootstrap) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  }

  // =========================================================================
  // 4. SUBTLE GSAP ANIMATIONS
  // =========================================================================
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hero title entrance
    if (document.querySelector('.hero-headline')) {
      gsap.from('.hero-headline', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (document.querySelector('.hero-lead')) {
      gsap.from('.hero-lead', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });
    }

    if (document.querySelector('.hero-cta-group')) {
      gsap.from('.hero-cta-group', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        delay: 0.4,
        ease: 'power3.out'
      });
    }

    if (document.querySelector('.hero-visual-card')) {
      gsap.from('.hero-visual-card', {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }

    if (document.querySelector('.floating-match-card')) {
      gsap.from('.floating-match-card', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        delay: 0.6,
        ease: 'power3.out'
      });
    }
  }

  // =========================================================================
  // 5. SHADE SWATCH INTERACTION
  // =========================================================================
  function initShadeSwatches() {
    document.addEventListener('click', e => {
      const chip = e.target.closest('.swatch-chip');
      if (!chip) return;

      const group = chip.closest('.swatch-group');
      if (group) {
        group.querySelectorAll('.swatch-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        // Check if there is an associated label to update
        const shadeCode = chip.getAttribute('data-shade-code');
        const shadeName = chip.getAttribute('data-shade-name');
        const card = chip.closest('.product-card') || document.querySelector('.product-details-container');
        
        if (card) {
          const codeEl = card.querySelector('.selected-shade-code');
          const nameEl = card.querySelector('.selected-shade-name');
          if (codeEl && shadeCode) codeEl.textContent = shadeCode;
          if (nameEl && shadeName) nameEl.textContent = shadeName;
        }
      }
    });
  }

  // =========================================================================
  // 6. SHADE MATCHER WIZARD (shade-match.html & Homepage preview)
  // =========================================================================
  function initShadeMatcherWizard() {
    const wizard = document.getElementById('shade-match-wizard');
    if (!wizard) return;

    let currentStep = 1;
    const totalSteps = 5;

    const selections = {
      depth: 'Medium',
      undertone: 'Neutral',
      finish: 'Natural Luminous',
      coverage: 'Medium Buildable',
      currentBrand: ''
    };

    // Step selection cards
    wizard.addEventListener('click', e => {
      const optionCard = e.target.closest('.option-select-card');
      if (!optionCard) return;

      const stepContainer = optionCard.closest('.wizard-step-card');
      if (!stepContainer) return;

      const stepType = stepContainer.getAttribute('data-step-type');
      const val = optionCard.getAttribute('data-value');

      stepContainer.querySelectorAll('.option-select-card').forEach(c => c.classList.remove('selected'));
      optionCard.classList.add('selected');

      if (stepType && val) {
        selections[stepType] = val;
      }
    });

    // Step Navigation buttons
    const nextBtn = document.getElementById('btn-wizard-next');
    const prevBtn = document.getElementById('btn-wizard-prev');
    const progressBar = document.getElementById('wizard-progress-fill');
    const resultCard = document.getElementById('wizard-result-card');

    function updateWizardUI() {
      // Hide all step cards
      wizard.querySelectorAll('.wizard-step-card').forEach(card => card.classList.remove('active'));

      if (currentStep <= totalSteps) {
        const activeCard = wizard.querySelector(`.wizard-step-card[data-step="${currentStep}"]`);
        if (activeCard) activeCard.classList.add('active');
        if (resultCard) resultCard.classList.add('d-none');
        if (nextBtn) {
          nextBtn.textContent = currentStep === totalSteps ? 'Calculate My Match' : 'Continue';
          nextBtn.classList.remove('d-none');
        }
      } else {
        // Show result state
        if (resultCard) {
          renderShadeMatchResult(selections);
          resultCard.classList.remove('d-none');
        }
        if (nextBtn) nextBtn.classList.add('d-none');
      }

      if (prevBtn) {
        prevBtn.disabled = currentStep === 1;
      }

      if (progressBar) {
        const pct = Math.min(100, ((currentStep - 1) / (totalSteps - 1)) * 100);
        progressBar.style.width = `${pct}%`;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep <= totalSteps) {
          currentStep++;
          updateWizardUI();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateWizardUI();
        }
      });
    }

    // Try another match
    document.addEventListener('click', e => {
      if (e.target.closest('#btn-restart-match')) {
        currentStep = 1;
        updateWizardUI();
      }
    });

    updateWizardUI();
  }

  function renderShadeMatchResult(data) {
    const fShadeEl = document.getElementById('res-foundation-shade');
    const cShadeEl = document.getElementById('res-concealer-shade');
    const uToneEl = document.getElementById('res-undertone');
    const finishEl = document.getElementById('res-finish');
    const confEl = document.getElementById('res-confidence');

    // Shade database mappings
    const shadeDatabase = {
      'Very Fair': { foundation: 'F120 Neutral Ivory', concealer: 'C10 Porcelain', swatch: '#F6E4D6' },
      'Fair': { foundation: 'F220 Neutral Bisque', concealer: 'C18 Light Shell', swatch: '#ECCBB2' },
      'Light': { foundation: 'L320 Warm Sand', concealer: 'C28 Soft Sand', swatch: '#DEB393' },
      'Medium': { foundation: 'M420 Warm Neutral 320', concealer: 'C36 Honey Sand', swatch: '#C69472' },
      'Tan': { foundation: 'T520 Neutral Toffee', concealer: 'C48 Warm Almond', swatch: '#A7704C' },
      'Deep': { foundation: 'D620 Neutral Cacao', concealer: 'C62 Rich Mocha', swatch: '#7D4C30' },
      'Rich Deep': { foundation: 'R720 Neutral Mahogany', concealer: 'C74 Deep Espresso', swatch: '#543220' }
    };

    const match = shadeDatabase[data.depth] || shadeDatabase['Medium'];

    if (fShadeEl) fShadeEl.textContent = match.foundation;
    if (cShadeEl) cShadeEl.textContent = match.concealer;
    if (uToneEl) uToneEl.textContent = `${data.undertone} Undertone`;
    if (finishEl) finishEl.textContent = `${data.finish} • ${data.coverage}`;
    if (confEl) confEl.textContent = '97% Match Confidence';

    const swatchCircle = document.getElementById('res-swatch-circle');
    if (swatchCircle) {
      swatchCircle.style.backgroundColor = match.swatch;
    }
  }

  // =========================================================================
  // 7. UNDERTONE ANALYZER (undertone-analyzer.html)
  // =========================================================================
  function initUndertoneAnalyzer() {
    const quiz = document.getElementById('undertone-quiz-form');
    if (!quiz) return;

    const resultBox = document.getElementById('undertone-result-box');
    const scoreTitle = document.getElementById('undertone-result-title');
    const scoreDesc = document.getElementById('undertone-result-desc');
    const scoreBadge = document.getElementById('undertone-result-badge');

    quiz.addEventListener('submit', e => {
      e.preventDefault();

      // Collect answers
      const answers = {
        veins: quiz.querySelector('input[name="veins"]:checked')?.value || 'neutral',
        jewelry: quiz.querySelector('input[name="jewelry"]:checked')?.value || 'neutral',
        sun: quiz.querySelector('input[name="sun"]:checked')?.value || 'neutral',
        colors: quiz.querySelector('input[name="colors"]:checked')?.value || 'neutral'
      };

      const counts = { cool: 0, neutral: 0, warm: 0, olive: 0 };
      Object.values(answers).forEach(val => {
        if (counts[val] !== undefined) counts[val]++;
      });

      let winner = 'neutral';
      let maxScore = -1;
      for (const [k, v] of Object.entries(counts)) {
        if (v > maxScore) {
          maxScore = v;
          winner = k;
        }
      }

      const undertoneProfiles = {
        cool: {
          title: 'Cool Undertone (Rose & Pink Infused)',
          badge: 'COOL SPECTRUM',
          desc: 'Your visual cues point toward rosy, red, or subtle blue undertones. Foundations labeled with "C" (Cool) or "Pink Porcelain" will provide your most seamless beauty match without looking ashy or overly yellow.'
        },
        neutral: {
          title: 'Neutral Undertone (Even & Balanced)',
          badge: 'NEUTRAL SPECTRUM',
          desc: 'Your visual cues display an exquisite equilibrium between warm golden and cool pink pigments. Formulas labeled "N" (Neutral) or "Balanced" will harmonize with your skin in both natural daylight and studio lighting.'
        },
        warm: {
          title: 'Warm Undertone (Golden, Honey & Peachy)',
          badge: 'WARM SPECTRUM',
          desc: 'Your skin reflects radiant golden, amber, or peachy tones that glow especially bright in sunlight. Look for shades labeled "W" (Warm) or "Honey Golden" for a lively, skin-like radiance.'
        },
        olive: {
          title: 'Olive Undertone (Subtle Green & Neutral Balance)',
          badge: 'OLIVE SPECTRUM',
          desc: 'Your complexion carries subtle neutral-to-cool green or muted golden undertones. Our Olive shades ("O") feature balanced neutral pigments that eliminate orange or mask-like cast.'
        }
      };

      const profile = undertoneProfiles[winner] || undertoneProfiles.neutral;

      if (scoreTitle) scoreTitle.textContent = profile.title;
      if (scoreBadge) scoreBadge.textContent = profile.badge;
      if (scoreDesc) scoreDesc.textContent = profile.desc;

      if (resultBox) {
        resultBox.classList.remove('d-none');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  // =========================================================================
  // 8. KIT BUILDER ENGINE (kit-builder.html)
  // =========================================================================
  function initKitBuilder() {
    const kitContainer = document.getElementById('kit-builder-app');
    if (!kitContainer) return;

    let kitState = {
      foundation: {
        name: 'Tone Balance Fluid Foundation',
        shade: 'M420 Warm Neutral 320',
        finish: 'Natural Luminous',
        price: 48
      },
      concealer: {
        name: 'Radiant Precision Concealer',
        shade: 'C28 Soft Sand',
        coverage: 'Full Buildable',
        price: 32
      },
      addon: {
        name: 'Velvet Translucent Powder',
        price: 28,
        selected: true
      }
    };

    function updateKitSummary() {
      const fNameEl = document.getElementById('kit-sum-foundation-name');
      const fShadeEl = document.getElementById('kit-sum-foundation-shade');
      const fPriceEl = document.getElementById('kit-sum-foundation-price');

      const cNameEl = document.getElementById('kit-sum-concealer-name');
      const cShadeEl = document.getElementById('kit-sum-concealer-shade');
      const cPriceEl = document.getElementById('kit-sum-concealer-price');

      const aWrapEl = document.getElementById('kit-sum-addon-wrap');
      const aNameEl = document.getElementById('kit-sum-addon-name');
      const aPriceEl = document.getElementById('kit-sum-addon-price');

      const subtotalEl = document.getElementById('kit-sum-subtotal');
      const discountEl = document.getElementById('kit-sum-discount');
      const totalEl = document.getElementById('kit-sum-total');

      if (fNameEl) fNameEl.textContent = kitState.foundation.name;
      if (fShadeEl) fShadeEl.textContent = `${kitState.foundation.shade} • ${kitState.foundation.finish}`;
      if (fPriceEl) fPriceEl.textContent = `$${kitState.foundation.price}`;

      if (cNameEl) cNameEl.textContent = kitState.concealer.name;
      if (cShadeEl) cShadeEl.textContent = `${kitState.concealer.shade} • ${kitState.concealer.coverage}`;
      if (cPriceEl) cPriceEl.textContent = `$${kitState.concealer.price}`;

      let subtotal = kitState.foundation.price + kitState.concealer.price;

      if (kitState.addon.selected) {
        if (aWrapEl) aWrapEl.classList.remove('d-none');
        if (aNameEl) aNameEl.textContent = kitState.addon.name;
        if (aPriceEl) aPriceEl.textContent = `$${kitState.addon.price}`;
        subtotal += kitState.addon.price;
      } else {
        if (aWrapEl) aWrapEl.classList.add('d-none');
      }

      // 15% Kit discount
      const discount = Math.round(subtotal * 0.15);
      const total = subtotal - discount;

      if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;
      if (discountEl) discountEl.textContent = `-$${discount}`;
      if (totalEl) totalEl.textContent = `$${total} (Demo Price)`;
    }

    // Step switching in Kit Builder
    const stepButtons = kitContainer.querySelectorAll('.btn-kit-step-nav');
    stepButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetStep = btn.getAttribute('data-target-step');
        showKitStep(targetStep);
      });
    });

    function showKitStep(stepNum) {
      kitContainer.querySelectorAll('.kit-step-section').forEach(s => s.classList.add('d-none'));
      const activeSec = kitContainer.querySelector(`.kit-step-section[data-step="${stepNum}"]`);
      if (activeSec) activeSec.classList.remove('d-none');

      // Update indicator pills
      kitContainer.querySelectorAll('.kit-step-item').forEach(item => {
        const num = parseInt(item.getAttribute('data-step-index'), 10);
        item.classList.remove('active', 'completed');
        if (num === parseInt(stepNum, 10)) {
          item.classList.add('active');
        } else if (num < parseInt(stepNum, 10)) {
          item.classList.add('completed');
        }
      });
    }

    // Foundation shade card click
    kitContainer.addEventListener('click', e => {
      const fCard = e.target.closest('.kit-f-card');
      if (fCard) {
        kitContainer.querySelectorAll('.kit-f-card').forEach(c => c.classList.remove('selected'));
        fCard.classList.add('selected');
        kitState.foundation.shade = fCard.getAttribute('data-shade') || 'M420 Warm Neutral 320';
        kitState.foundation.finish = fCard.getAttribute('data-finish') || 'Natural Luminous';
        updateKitSummary();
      }

      const cCard = e.target.closest('.kit-c-card');
      if (cCard) {
        kitContainer.querySelectorAll('.kit-c-card').forEach(c => c.classList.remove('selected'));
        cCard.classList.add('selected');
        kitState.concealer.shade = cCard.getAttribute('data-shade') || 'C28 Soft Sand';
        updateKitSummary();
      }

      const aCard = e.target.closest('.kit-addon-card');
      if (aCard) {
        kitContainer.querySelectorAll('.kit-addon-card').forEach(c => c.classList.remove('selected'));
        aCard.classList.add('selected');
        kitState.addon.name = aCard.getAttribute('data-addon-name') || 'Velvet Translucent Powder';
        kitState.addon.price = parseInt(aCard.getAttribute('data-price') || '28', 10);
        kitState.addon.selected = true;
        updateKitSummary();
      }

      // Remove addon button
      if (e.target.closest('#btn-remove-addon')) {
        kitState.addon.selected = false;
        kitContainer.querySelectorAll('.kit-addon-card').forEach(c => c.classList.remove('selected'));
        updateKitSummary();
      }

      // Save kit demo
      if (e.target.closest('#btn-save-kit-demo')) {
        const toastEl = document.getElementById('kit-save-toast');
        if (toastEl && window.bootstrap) {
          const toast = new bootstrap.Toast(toastEl);
          toast.show();
        } else {
          alert('Kit Saved — Demo! Your custom base shade pairing has been captured.');
        }
      }
    });

    updateKitSummary();
  }

  // =========================================================================
  // 9. SHOP CATALOGUE & PRODUCT FILTERS (shop.html)
  // =========================================================================
  function initShopCatalogue() {
    const shopContainer = document.getElementById('shop-catalogue-app');
    if (!shopContainer) return;

    const cards = shopContainer.querySelectorAll('.product-shop-col');
    const typeFilters = shopContainer.querySelectorAll('.filter-type-btn');
    const undertoneSelect = document.getElementById('filter-undertone');
    const finishSelect = document.getElementById('filter-finish');
    const coverageSelect = document.getElementById('filter-coverage');
    const sortSelect = document.getElementById('sort-products');
    const activeCountEl = document.getElementById('product-match-count');

    let currentType = 'all';

    function filterProducts() {
      const uVal = undertoneSelect ? undertoneSelect.value : 'all';
      const fVal = finishSelect ? finishSelect.value : 'all';
      const cVal = coverageSelect ? coverageSelect.value : 'all';

      let visibleCount = 0;

      cards.forEach(card => {
        const cardType = card.getAttribute('data-product-type');
        const cardUndertone = card.getAttribute('data-undertone');
        const cardFinish = card.getAttribute('data-finish');
        const cardCoverage = card.getAttribute('data-coverage');

        const matchType = currentType === 'all' || cardType === currentType;
        const matchUndertone = uVal === 'all' || cardUndertone.includes(uVal);
        const matchFinish = fVal === 'all' || cardFinish === fVal;
        const matchCoverage = cVal === 'all' || cardCoverage === cVal;

        if (matchType && matchUndertone && matchFinish && matchCoverage) {
          card.classList.remove('d-none');
          visibleCount++;
        } else {
          card.classList.add('d-none');
        }
      });

      if (activeCountEl) {
        activeCountEl.textContent = `${visibleCount} Products Available`;
      }
    }

    typeFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        typeFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentType = btn.getAttribute('data-type');
        filterProducts();
      });
    });

    if (undertoneSelect) undertoneSelect.addEventListener('change', filterProducts);
    if (finishSelect) finishSelect.addEventListener('change', filterProducts);
    if (coverageSelect) coverageSelect.addEventListener('change', filterProducts);

    // Sorting
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const grid = document.getElementById('products-grid');
        if (!grid) return;
        const items = Array.from(cards);
        const sortVal = sortSelect.value;

        items.sort((a, b) => {
          const priceA = parseFloat(a.getAttribute('data-price') || '0');
          const priceB = parseFloat(b.getAttribute('data-price') || '0');
          if (sortVal === 'price-low') return priceA - priceB;
          if (sortVal === 'price-high') return priceB - priceA;
          return 0; // Default recommended
        });

        items.forEach(item => grid.appendChild(item));
      });
    }

    filterProducts();
  }

  // =========================================================================
  // 10. REVIEWS GALLERY & MASONRY (reviews.html)
  // =========================================================================
  function initReviewsGallery() {
    const gallery = document.getElementById('reviews-gallery-app');
    if (!gallery) return;

    const filterBtns = gallery.querySelectorAll('.review-filter-btn');
    const reviewCards = gallery.querySelectorAll('.review-item-col');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterDepth = btn.getAttribute('data-filter-depth');

        reviewCards.forEach(col => {
          const depth = col.getAttribute('data-depth');
          if (filterDepth === 'all' || depth === filterDepth) {
            col.classList.remove('d-none');
          } else {
            col.classList.add('d-none');
          }
        });
      });
    });

    // Write a review modal client demo
    const reviewForm = document.getElementById('write-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you! Your demo review has been logged for preview.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('writeReviewModal'));
        if (modal) modal.hide();
        reviewForm.reset();
      });
    }
  }

  // =========================================================================
  // 11. DASHBOARD INTERNAL INVENTORY ENGINE (dashboard/*.html)
  // =========================================================================
  function initDashboardEngine() {
    const invTable = document.getElementById('inventory-table-body');
    if (!invTable) return;

    const searchInput = document.getElementById('inv-search-input');
    const categoryFilter = document.getElementById('inv-category-filter');
    const statusFilter = document.getElementById('inv-status-filter');

    function applyInventoryFilters() {
      const q = (searchInput?.value || '').toLowerCase().trim();
      const cat = categoryFilter?.value || 'all';
      const stat = statusFilter?.value || 'all';

      const rows = invTable.querySelectorAll('tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const rowCat = row.getAttribute('data-category') || 'all';
        const rowStat = row.getAttribute('data-status') || 'all';

        const matchQ = !q || text.includes(q);
        const matchCat = cat === 'all' || rowCat === cat;
        const matchStat = stat === 'all' || rowStat === stat;

        if (matchQ && matchCat && matchStat) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    if (searchInput) searchInput.addEventListener('input', applyInventoryFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyInventoryFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyInventoryFilters);

    // Update Stock Modal Handler
    document.addEventListener('click', e => {
      const updateBtn = e.target.closest('.btn-update-stock');
      if (updateBtn) {
        const prod = updateBtn.getAttribute('data-product-name');
        const shade = updateBtn.getAttribute('data-shade');
        const units = updateBtn.getAttribute('data-units');

        const titleEl = document.getElementById('modal-stock-product-name');
        const shadeEl = document.getElementById('modal-stock-shade');
        const unitsInput = document.getElementById('modal-stock-units-input');

        if (titleEl) titleEl.textContent = prod;
        if (shadeEl) shadeEl.textContent = `Shade: ${shade}`;
        if (unitsInput) unitsInput.value = units;
      }
    });

    const stockForm = document.getElementById('form-update-stock-modal');
    if (stockForm) {
      stockForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Stock updated successfully! (Demo State Refreshed)');
        const modalEl = document.getElementById('updateStockModal');
        if (modalEl && window.bootstrap) {
          const bsModal = bootstrap.Modal.getInstance(modalEl);
          if (bsModal) bsModal.hide();
        }
      });
    }
  }

  // =========================================================================
  // 12. AUTH FORMS & FRONT-END VALIDATION
  // =========================================================================
  function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Signed in successfully! (Demo Authentication)');
        window.location.href = 'index.html';
      });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Account created successfully! Welcome to TONE / FORM.');
        window.location.href = 'index.html';
      });
    }

    const forgotForm = document.getElementById('forgot-password-form');
    if (forgotForm) {
      forgotForm.addEventListener('submit', e => {
        e.preventDefault();
        const successBox = document.getElementById('reset-success-alert');
        if (successBox) {
          successBox.classList.remove('d-none');
          forgotForm.classList.add('d-none');
        }
      });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you! Your message has been sent to our beauty advisory team (Demo).');
        contactForm.reset();
      });
    }
  }

  // =========================================================================
  // 13. PASSWORD VISIBILITY TOGGLE
  // =========================================================================
  function initPasswordToggle() {
    document.addEventListener('click', e => {
      const toggleBtn = e.target.closest('.btn-toggle-password');
      if (!toggleBtn) return;
      e.preventDefault();

      const targetId = toggleBtn.getAttribute('data-target-input');
      const input = targetId ? document.getElementById(targetId) : (toggleBtn.closest('.position-relative')?.querySelector('input') || toggleBtn.parentElement.querySelector('input'));
      const icon = toggleBtn.querySelector('i');

      if (input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        if (icon) {
          icon.className = isPassword ? 'bi bi-eye-slash fs-5 text-accent' : 'bi bi-eye fs-5';
        }
      }
    });
  }

})();
