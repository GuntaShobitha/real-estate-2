/**
 * STACKLY LUXURY REAL ESTATE MARKETPLACE - MAIN CONTROLLER
 * 3D Motion, Particle Grid Canvas, Interactive Widgets & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  init3DCanvas();
  initStatsCounters();
  initMortgageCalculator();
  initVirtualTour();
  initTestimonialSlider();
  initFaqAccordion();
  initMultiStepForm();
  initSocialLinks();
  initPropertyRenderer();
  initAboutHoverGalleries();
  initShowroomSuccessModal();
  initGlobalPresenceHoverPreview();
  initServicesSnapScroll();
  initBlogFormValidation();
  initScrollReveal();
  initScrollTop();
  initLuxuryImageGenerators();
});

/* ==========================================================================
   1. NAVBAR & SCROLL BEHAVIOR
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE DRAWER & STRICT SCROLL LOCK
   ========================================================================== */
function initMobileDrawer() {
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.mobile-nav-drawer');
  if (!hamburger || !drawer) return;

  const toggleMenu = (open) => {
    const shouldOpen = typeof open === 'boolean' ? open : !hamburger.classList.contains('active');
    if (shouldOpen) {
      hamburger.classList.add('active');
      drawer.classList.add('open');
      document.body.classList.add('nav-locked'); // Lock background scroll strictly
    } else {
      hamburger.classList.remove('active');
      drawer.classList.remove('open');
      document.body.classList.remove('nav-locked'); // Unlock background
    }
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking the X button inside drawer
  const closeBtn = drawer.querySelector('.mobile-drawer-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }

  // Close when clicking navigation links inside drawer
  drawer.querySelectorAll('.mobile-nav-link, .btn-mobile-login').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   3. 3D PARTICLE & GOLDEN GRID CANVAS ANIMATION
   ========================================================================== */
function init3DCanvas() {
  const canvas = document.getElementById('heroCanvas') || document.getElementById('errorCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  const resize = () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    createParticles();
  };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.4 ? '190, 163, 137' : '255, 255, 255'; // Cashmere Taupe #BEA389 & Silk White
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.baseAlpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion / parallax
      if (mouse.x !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
      this.draw();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 12000), 75);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          let alpha = (1 - dist / 130) * 0.25;
          ctx.strokeStyle = `rgba(190, 163, 137, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => p.update());
    connectLines();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resize();
  animate();
}

/* ==========================================================================
   4. STATS NUMBER COUNTERS
   ========================================================================== */
function initStatsCounters() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOutQuad = 1 - (1 - progress) * (1 - progress);
          const current = (target * easeOutQuad).toFixed(decimals);
          el.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   5. MORTGAGE & INVESTMENT ROI CALCULATOR
   ========================================================================== */
function initMortgageCalculator() {
  const priceInput = document.getElementById('calcPrice');
  const downInput = document.getElementById('calcDown');
  const rateInput = document.getElementById('calcRate');
  const termInput = document.getElementById('calcTerm');
  const monthlyDisplay = document.getElementById('calcMonthlyPayment');
  const loanDisplay = document.getElementById('calcLoanAmount');
  const principalDisplay = document.getElementById('calcPrincipalPayment');
  const interestDisplay = document.getElementById('calcInterestPayment');

  if (!priceInput || !monthlyDisplay) return;

  const updateCalculations = () => {
    const price = parseFloat(priceInput.value);
    const downPercent = parseFloat(downInput.value);
    const annualRate = parseFloat(rateInput.value);
    const years = parseFloat(termInput.value);

    // Update labels
    document.getElementById('calcPriceVal').textContent = `$${price.toLocaleString()}`;
    document.getElementById('calcDownVal').textContent = `${downPercent}% ($${((price * downPercent) / 100).toLocaleString()})`;
    document.getElementById('calcRateVal').textContent = `${annualRate}%`;
    document.getElementById('calcTermVal').textContent = `${years} Years`;

    const principal = price * (1 - downPercent / 100);
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPayment = principal / totalMonths;
    }

    const monthlyInterest = principal * monthlyRate;
    const monthlyPrincipal = monthlyPayment - monthlyInterest;

    monthlyDisplay.textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
    if (loanDisplay) loanDisplay.textContent = `$${Math.round(principal).toLocaleString()}`;
    if (principalDisplay) principalDisplay.textContent = `$${Math.round(monthlyPrincipal).toLocaleString()}`;
    if (interestDisplay) interestDisplay.textContent = `$${Math.round(monthlyInterest).toLocaleString()}`;
  };

  [priceInput, downInput, rateInput, termInput].forEach(slider => {
    if (slider) slider.addEventListener('input', updateCalculations);
  });

  updateCalculations();
}

/* ==========================================================================
   6. 3D VIRTUAL TOUR SIMULATOR
   ========================================================================== */
function initVirtualTour() {
  const canvas = document.getElementById('virtualTourCanvas');
  const roomButtons = document.querySelectorAll('.tour-btn');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let currentRoom = 'grand-salon';
  let angle = 0;
  let isDragging = false;
  let startX = 0;

  const rooms = {
    'grand-salon': {
      title: 'Grand Living Salon & Horizon View',
      color1: '#141d2e',
      color2: '#0b0f19',
      hotspots: [
        { x: 0.3, y: 0.5, label: 'Custom Italian Marble Fireplace' },
        { x: 0.7, y: 0.45, label: 'Cantilevered Horizon Terrace' }
      ]
    },
    'penthouse-terrace': {
      title: 'Private Sky Infinity Pool & Lounge',
      color1: '#1a2638',
      color2: '#0d131f',
      hotspots: [
        { x: 0.4, y: 0.6, label: 'Temperature-Controlled Plunge' },
        { x: 0.8, y: 0.4, label: 'Helipad Approach View' }
      ]
    },
    'wine-cellar': {
      title: 'Sommelier Wine Vault & Tasting Lounge',
      color1: '#261b14',
      color2: '#0d0907',
      hotspots: [
        { x: 0.5, y: 0.5, label: '1,200-Bottle Climate Vault' }
      ]
    }
  };

  const drawRoom = () => {
    const width = canvas.width = canvas.parentElement.offsetWidth;
    const height = canvas.height = canvas.parentElement.offsetHeight;
    const room = rooms[currentRoom];

    // Background gradient with pseudo-3D rotation
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, room.color1);
    grad.addColorStop(1, room.color2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw architectural perspective grid
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.lineWidth = 1;
    const horizon = height * 0.55;

    for (let i = -width; i < width * 2; i += 80) {
      let offset = (i + angle) % width;
      ctx.beginPath();
      ctx.moveTo(offset, 0);
      ctx.lineTo(width / 2 + (offset - width / 2) * 2.5, height);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(width, horizon);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.stroke();

    // Render interactive hotspots
    room.hotspots.forEach(spot => {
      let spotX = ((spot.x * width + angle) % width);
      if (spotX < 0) spotX += width;
      let spotY = spot.y * height;

      ctx.beginPath();
      ctx.arc(spotX, spotY, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#d4af37';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#d4af37';
      ctx.fill();

      // Tooltip text
      ctx.fillStyle = '#f8fafc';
      ctx.font = '600 12px "Plus Jakarta Sans"';
      ctx.shadowBlur = 0;
      ctx.fillText(spot.label, spotX - 40, spotY - 20);
    });
  };

  roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roomButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentRoom = btn.getAttribute('data-room');
      drawRoom();
    });
  });

  // Mouse drag events
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let diff = e.clientX - startX;
      angle += diff * 0.5;
      startX = e.clientX;
      drawRoom();
    }
  });

  // Mobile & Tablet Touch drag events
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      isDragging = true;
      startX = e.touches[0].clientX;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  canvas.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches[0]) {
      let diff = e.touches[0].clientX - startX;
      angle += diff * 0.5;
      startX = e.touches[0].clientX;
      drawRoom();
    }
  }, { passive: true });

  window.addEventListener('resize', drawRoom);
  drawRoom();
}

/* ==========================================================================
   7. TESTIMONIALS SLIDER
   ========================================================================== */
function initTestimonialSlider() {
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!cards.length) return;

  let currentIndex = 0;
  let timer;

  const showSlide = (index) => {
    cards.forEach((c, i) => c.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentIndex = index;
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      resetAuto();
    });
  });

  const nextSlide = () => {
    let next = (currentIndex + 1) % cards.length;
    showSlide(next);
  };

  const resetAuto = () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  };

  resetAuto();
}

/* ==========================================================================
   8. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}

/* ==========================================================================
   9. MULTI-STEP CONTACT FORM
   ========================================================================== */
function initMultiStepForm() {
  const form = document.querySelector('.contact-multi-form');
  if (!form) return;

  const steps = form.querySelectorAll('.step-panel');
  const circles = form.querySelectorAll('.step-circle');
  let currentStep = 0;

  const showStep = (stepIdx) => {
    steps.forEach((p, i) => p.classList.toggle('active', i === stepIdx));
    circles.forEach((c, i) => c.classList.toggle('active', i <= stepIdx));
    currentStep = stepIdx;
  };

  // Validation helper
  const clearFormErrors = () => {
    form.querySelectorAll('.form-error-msg').forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  };

  const showFormError = (inputId, errorId, msg) => {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('input-error');
    if (error) {
      error.textContent = msg;
      error.classList.add('visible');
    }
  };

  // Clear errors on input
  ['mandateName', 'mandateEmail', 'mandatePhone'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.classList.remove('input-error');
        const errEl = document.getElementById(id + 'Error');
        if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
      });
    }
  });

  form.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) showStep(currentStep + 1);
    });
  });

  form.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) showStep(currentStep - 1);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors();
    let isValid = true;

    const name = document.getElementById('mandateName');
    const email = document.getElementById('mandateEmail');
    const phone = document.getElementById('mandatePhone');

    if (!name || !name.value.trim()) {
      showFormError('mandateName', 'mandateNameError', 'Full legal name is required.');
      isValid = false;
    }

    if (!email || !email.value.trim()) {
      showFormError('mandateEmail', 'mandateEmailError', 'Email address is required.');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showFormError('mandateEmail', 'mandateEmailError', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!phone || !phone.value.trim()) {
      showFormError('mandatePhone', 'mandatePhoneError', 'Phone number is required.');
      isValid = false;
    }

    if (!isValid) return;

    window.location.href = './404.html';
  });
}

/* ==========================================================================
   10. SOCIAL MEDIA LINKS & 404 REDIRECTS
   ========================================================================== */
function initSocialLinks() {
  // Ensure every social media icon click redirects to 404.html
  const socialLinks = document.querySelectorAll('.footer-social-icon, .agent-social-btn, a[data-social]');
  socialLinks.forEach(link => {
    link.setAttribute('href', '404.html');
  });
}

/* ==========================================================================
   11. DYNAMIC PROPERTY RENDERING & FILTERING
   ========================================================================== */
function initPropertyRenderer() {
  const grid = document.getElementById('featuredPropertyGrid');
  const filterButtons = document.querySelectorAll('.category-filter-bar .filter-btn');
  if (!grid || typeof STACKLY_DATA === 'undefined') return;

  const renderProperties = (category = 'all') => {
    const list = category === 'all' 
      ? STACKLY_DATA.properties 
      : STACKLY_DATA.properties.filter(p => p.category === category);

    grid.innerHTML = list.map(p => `
      <div class="property-card tilt-card reveal-fade-up is-revealed" data-id="${p.id}">
        <div class="property-img-wrap">
          <img src="${p.image}" alt="${p.title}" class="property-img" loading="lazy" />
          <span class="property-badge">${p.tag}</span>
          <button class="property-fav-btn" title="Add to favorites" onclick="toggleFavorite('${p.id}', this)">
            <span class="material-symbols-outlined" style="font-size: 1.3rem;">favorite</span>
          </button>
          <div class="property-price-tag">${p.price}</div>

          <!-- LIGHT BACKGROUND HOVER OVERLAY (Displays on mouse hover) -->
          <div class="property-hover-overlay">
            <div class="property-hover-header">
              <h3 class="property-hover-title">${p.title}</h3>
              <div class="property-hover-price">${p.price}</div>
            </div>
            <div class="property-hover-location">
              <span class="material-symbols-outlined" style="color: #8E745D; font-size: 1.1rem; margin-right: 4px;">location_on</span>
              ${p.location}
            </div>
            <p class="property-hover-desc">${p.description}</p>
            <div class="property-hover-specs">
              <div class="hover-spec-item">
                <span class="material-symbols-outlined" style="font-size: 1rem; color: #8E745D;">bed</span>
                <span class="spec-val">${p.beds}</span> Beds
              </div>
              <div class="hover-spec-item">
                <span class="material-symbols-outlined" style="font-size: 1rem; color: #8E745D;">bathtub</span>
                <span class="spec-val">${p.baths}</span> Baths
              </div>
              <div class="hover-spec-item">
                <span class="material-symbols-outlined" style="font-size: 1rem; color: #8E745D;">square_foot</span>
                <span class="spec-val">${p.sqft}</span>
              </div>
            </div>
            <div class="property-hover-footer">
              <button class="btn btn-hover-tour btn-sm" onclick="openPropertyModal('${p.id}')">Private Tour</button>
              <a href="contact.html?prop=${p.id}" class="btn btn-hover-inquire btn-sm">Inquire</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    initLuxuryImageGenerators();
  };

  // Support mobile touch tap to toggle property details overlay
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.property-card');
    if (!card) return;
    if (e.target.closest('.property-fav-btn') || e.target.closest('button') || e.target.closest('a')) return;
    
    // Toggle active state on mobile
    const wasActive = card.classList.contains('touch-active');
    grid.querySelectorAll('.property-card.touch-active').forEach(c => c.classList.remove('touch-active'));
    if (!wasActive) card.classList.add('touch-active');
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProperties(btn.getAttribute('data-category'));
    });
  });

  renderProperties();
}

/* ==========================================================================
   12. FAVORITES TOGGLE & MODALS
   ========================================================================== */
window.toggleFavorite = function(propId, btn) {
  let favs = JSON.parse(localStorage.getItem('stackly_favorites') || '[]');
  const index = favs.indexOf(propId);
  if (index > -1) {
    favs.splice(index, 1);
    btn.classList.remove('active');
    showToast('Removed estate from your private collection.');
  } else {
    favs.push(propId);
    btn.classList.add('active');
    showToast('Estate added to your private collection.');
  }
  localStorage.setItem('stackly_favorites', JSON.stringify(favs));
};

window.openPropertyModal = function(propId) {
  if (typeof STACKLY_DATA === 'undefined') return;
  const prop = STACKLY_DATA.properties.find(p => p.id === propId);
  if (!prop) return;

  const modalHtml = `
    <div class="modal-overlay open" id="quickViewModal">
      <div class="modal-window">
        <button class="modal-close-btn" onclick="closeModal('quickViewModal')">&times;</button>
        <span class="section-tag">${prop.type}</span>
        <h2 class="section-title" style="font-size: 1.8rem; margin-bottom: 8px;">${prop.title}</h2>
        <p style="color: var(--gold-light); font-weight: 700; font-size: 1.3rem; margin-bottom: 16px;">${prop.price}</p>
        <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${prop.description}</p>
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--text-primary); margin-bottom: 10px; font-size: 0.95rem;">Key Amenities:</h4>
          <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.88rem; color: var(--text-secondary);">
            ${prop.amenities.map(a => `<li>• ${a}</li>`).join('')}
          </ul>
        </div>
        <div style="display: flex; gap: 14px;">
          <a href="contact.html?prop=${prop.id}" class="btn btn-gold btn-sm">Book VIP Showing</a>
          <button class="btn btn-outline-gold btn-sm" onclick="closeModal('quickViewModal')">Close</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.remove();
};

/* ==========================================================================
   13. TOAST NOTIFICATIONS
   ========================================================================== */
window.showToast = function(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="color: #94a3b8; font-size: 1.2rem;">&times;</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
};

/* ==========================================================================
   14. SCROLL REVEAL OBSERVER (Left to Right, Right to Left, Top to Bottom)
   ========================================================================== */
function initScrollReveal() {
  // Auto-tag sections and child elements if not explicitly tagged
  document.querySelectorAll('section').forEach((sec, idx) => {
    const header = sec.querySelector('.section-header');
    if (header && !header.classList.contains('is-revealed')) {
      header.classList.add('reveal-top');
    }

    // Alternating left/right scroll reveals for columns and cards
    const grid = sec.querySelector('.property-grid, .advantage-grid, .metro-grid, .stats-grid, .agent-grid, .blog-grid, .calc-card');
    if (grid) {
      Array.from(grid.children).forEach((child, childIdx) => {
        if (!child.classList.contains('is-revealed') && !child.classList.contains('reveal-left') && !child.classList.contains('reveal-right')) {
          if (childIdx % 2 === 0) {
            child.classList.add('reveal-left', `delay-${Math.min((childIdx + 1) * 100, 500)}`);
          } else {
            child.classList.add('reveal-right', `delay-${Math.min((childIdx + 1) * 100, 500)}`);
          }
        }
      });
    }
  });

  const elements = document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-top, .reveal-bottom, .reveal-slide-left, .reveal-slide-right, .reveal-fade-up, .reveal-fade-down, .reveal-fade-in, .reveal-scale'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   15. SCROLL TO TOP BUTTON (Matching Screenshot)
   ========================================================================== */
function initScrollTop() {
  let btn = document.querySelector('.scroll-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<span class="material-symbols-outlined">keyboard_arrow_up</span>';
    document.body.appendChild(btn);
  }

  const toggleScrollBtn = () => {
    if (window.scrollY > 280) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleScrollBtn, { passive: true });
  toggleScrollBtn();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   16. ABOUT PAGE HOVER GALLERIES (Multi-Image Cycling on Hover)
   ========================================================================== */
function initAboutHoverGalleries() {
  const galleries = document.querySelectorAll('.hover-gallery-wrap');
  galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-img');
    const dots = gallery.querySelectorAll('.gallery-dot');
    const badge = gallery.querySelector('.gallery-badge');
    if (!images.length) return;

    let currentIndex = 0;
    let hoverInterval = null;

    const showImage = (index) => {
      images.forEach((img, i) => img.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      if (badge && images[index]) {
        badge.textContent = images[index].getAttribute('data-title') || '';
      }
      currentIndex = index;
    };

    gallery.addEventListener('mouseenter', () => {
      hoverInterval = setInterval(() => {
        let next = (currentIndex + 1) % images.length;
        showImage(next);
      }, 2200);
    });

    gallery.addEventListener('mouseleave', () => {
      clearInterval(hoverInterval);
      hoverInterval = null;
      // Reset to first image on mouse leave
      showImage(0);
    });

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        showImage(idx);
      });
    });
  });
}

/* ==========================================================================
   17. GLOBAL PRESENCE SHOWROOM CARDS - HOVER TO SHOW BIG PREVIEW BOX
   ========================================================================== */
function initShowroomSuccessModal() {
  const cards = document.querySelectorAll('.showroom-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.getAttribute('data-img');
      const city = card.getAttribute('data-city');
      const addr = card.getAttribute('data-address');
      const phone = card.getAttribute('data-phone');
      const stat = card.getAttribute('data-stat');
      const director = card.getAttribute('data-director');

      const modal = document.getElementById('showroomSuccessModal');
      if (!modal) return;

      const modalImg = document.getElementById('modalShowroomImg');
      const modalTitle = document.getElementById('modalShowroomTitle');
      const modalAddr = document.getElementById('modalShowroomAddr');
      const modalPhone = document.getElementById('modalShowroomPhone');
      const modalStat = document.getElementById('modalShowroomStat');
      const modalDirector = document.getElementById('modalShowroomDirector');

      if (modalImg) modalImg.src = img;
      if (modalTitle) modalTitle.textContent = city;
      if (modalAddr) modalAddr.textContent = addr;
      if (modalPhone) modalPhone.textContent = phone;
      if (modalStat) modalStat.textContent = stat;
      if (modalDirector) modalDirector.textContent = director;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
}

function closeShowroomModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('showroomSuccessModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}
window.closeShowroomModal = closeShowroomModal;

/* ==========================================================================
   18. GLOBAL PRESENCE HOVER PREVIEW (Enhanced Card → Big Image Success Box)
   ========================================================================== */
function initGlobalPresenceHoverPreview() {
  const cards = document.querySelectorAll('.showroom-card');
  cards.forEach(card => {
    // Add subtle parallax tilt on mousemove
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-8px) scale(1.02) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==========================================================================
   19. SERVICES PAGE — FULL-SECTION SCROLL-SNAP WITH SLIDE-UP ANIMATION
   ========================================================================== */
function initServicesSnapScroll() {
  const container = document.getElementById('servicesSnapContainer');
  const sections = document.querySelectorAll('.services-snap-section');
  const dots = document.querySelectorAll('.snap-nav-dot');
  const progressBar = document.getElementById('snapProgressBar');
  if (!container || !sections.length) return;

  let currentIndex = 0;
  let isScrolling = false;
  let scrollTimeout = null;

  // Activate the first section on load
  sections[0].classList.add('snap-active');

  // Update dots and progress
  const updateUI = (index) => {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    if (progressBar) {
      progressBar.style.width = `${((index + 1) / sections.length) * 100}%`;
    }
    currentIndex = index;
  };

  // Scroll to a specific section
  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length || isScrolling) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    updateUI(index);
    // Activate section animation
    sections.forEach((sec, i) => {
      sec.classList.toggle('snap-active', i === index);
    });
    setTimeout(() => { isScrolling = false; }, 900);
  };

  // IntersectionObserver to detect which section is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const idx = Array.from(sections).indexOf(entry.target);
        if (idx !== -1) {
          updateUI(idx);
          sections.forEach((sec, i) => {
            sec.classList.toggle('snap-active', i === idx);
          });
        }
      }
    });
  }, { threshold: 0.5, root: container });

  sections.forEach(sec => observer.observe(sec));

  // Dot click navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      scrollToSection(idx);
    });
  });

  /* ------------------------------------------------------------------
     FOOTER HAND-OFF

     The slide deck is its own 100vh inner scroller, so the window only
     ever scrolls past the LAST slide to reveal the footer. That hand-off
     relies on native scroll chaining, which does not happen reliably in
     every browser / pointer position. This makes it explicit:

       • Scrolling down while the deck is at its end opens the footer,
         no matter where the pointer is.
       • Scrolling up while the footer is open closes it first; the deck
         only scrolls again once the footer is fully out of the way.
     ------------------------------------------------------------------ */
  const lastSectionIndex = sections.length - 1;
  const isFooterOpen = () => window.scrollY > 0;
  const isDeckAtBottom = () => container.scrollTop + container.clientHeight >= container.scrollHeight - 2;
  const windowMaxScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

  // The page declares `scroll-behavior: smooth` on <html>, which would make
  // per-wheel scrollBy() calls animate. Temporarily disable it while the
  // user is wheeling so boundary motion stays native and continuous.
  let smoothResetTimer = null;
  const windowScrollByPx = (dy) => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollBy(0, dy);
    clearTimeout(smoothResetTimer);
    smoothResetTimer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 150);
  };

  const revealFooter = () => {
    window.scrollTo({ top: windowMaxScroll(), behavior: 'smooth' });
  };

  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) return; // never hijack pinch-zoom gestures
    let dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;                    // lines -> px
    else if (e.deltaMode === 2) dy *= window.innerHeight; // pages -> px
    if (!dy) return;

    if (dy < 0) {
      // Upward scroll with the footer open: close the footer first,
      // regardless of pointer position. Without this, the browser would
      // scroll the hidden deck underneath instead.
      if (isFooterOpen()) {
        e.preventDefault();
        windowScrollByPx(dy);
      }
      return;
    }

    // Downward scroll once the last slide is reached: open the footer,
    // regardless of pointer position. Between slides the container's own
    // snap scrolling handles the gesture.
    if (!isFooterOpen() && isDeckAtBottom()) {
      e.preventDefault();
      windowScrollByPx(dy);
    }
  }, { passive: false });

  // Keyboard navigation (also crosses the deck -> footer boundary)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      if (isFooterOpen()) {
        // Keep scrolling through the footer
        const remaining = windowMaxScroll() - window.scrollY;
        if (remaining > 0) {
          window.scrollBy({ top: Math.min(remaining, window.innerHeight * 0.9), behavior: 'smooth' });
        }
      } else if (currentIndex < lastSectionIndex) {
        scrollToSection(currentIndex + 1);
      } else {
        revealFooter();
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      if (isFooterOpen()) {
        // Close the footer first, then the deck can scroll back up
        window.scrollBy({ top: -window.innerHeight * 0.9, behavior: 'smooth' });
      } else {
        scrollToSection(currentIndex - 1);
      }
    }
  });
}

/* ==========================================================================
   20. BLOG PAGE — JAVASCRIPT FORM VALIDATION (No HTML Validation)
   ========================================================================== */
function initBlogFormValidation() {
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  };

  const showFieldErr = (input, errEl, msg) => {
    if (input) input.classList.add('input-error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
  };

  const clearFieldErr = (input, errEl) => {
    if (input) input.classList.remove('input-error');
    if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
  };

  // --- Blog subscribe form (inline section) ---
  const blogSubForm = document.querySelector('.blog-subscribe-form');
  if (blogSubForm) {
    const blogEmail = document.getElementById('blogSubscribeEmail');
    const blogErr = document.getElementById('blogSubscribeEmailError');
    if (blogEmail) {
      blogEmail.addEventListener('input', () => clearFieldErr(blogEmail, blogErr));
    }
    blogSubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearFieldErr(blogEmail, blogErr);
      const val = blogEmail ? blogEmail.value.trim() : '';
      if (!val) {
        showFieldErr(blogEmail, blogErr, 'Email address is required.');
        return;
      }
      if (!validateEmail(val)) {
        showFieldErr(blogEmail, blogErr, 'Please enter a valid email address.');
        return;
      }
      window.location.href = './404.html';
    });
  }

  // --- All footer newsletter forms ---
  document.querySelectorAll('.footer-newsletter-form').forEach(footerForm => {
    const footerEmail = footerForm.querySelector('.newsletter-input');
    const footerErr = footerForm.querySelector('.form-error-msg');
    if (footerEmail) {
      footerEmail.addEventListener('input', () => clearFieldErr(footerEmail, footerErr));
    }
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (footerEmail) clearFieldErr(footerEmail, footerErr);
      const val = footerEmail ? footerEmail.value.trim() : '';
      if (!val) {
        showFieldErr(footerEmail, footerErr, 'Email address is required.');
        return;
      }
      if (!validateEmail(val)) {
        showFieldErr(footerEmail, footerErr, 'Please enter a valid email address.');
        return;
      }
      window.location.href = './404.html';
    });
  });
}


/* ==========================================================================
   21. LUXURY WEBP IMAGE REPOSITORY
   ========================================================================== */
const REALTIME_WEBP_IMAGES = {
  // Properties
  'penthouse-sky': 'images/penthouse-sky.webp',
  'coastal-villa': 'images/coastal-villa.webp',
  'modern-estate': 'images/modern-estate.webp',
  'dubai-residence': 'images/dubai-residence.webp',
  'aspen-chalet': 'images/aspen-chalet.webp',
  'london-townhouse': 'images/london-townhouse.webp',
  'manhattan-loft': 'images/manhattan-loft.webp',
  'monaco-harbor': 'images/monaco-harbor.webp',
  'tokyo-modern': 'images/tokyo-modern.webp',
  'hero-mansion': 'images/hero-mansion.webp',
  'architectural-gem': 'images/architectural-gem.webp',

  // Heritage & About
  'about-hero': 'images/about-hero.webp',
  'about-heritage': 'images/about-heritage.webp',

  // Interiors
  'interior-1': 'images/interior-1.webp',
  'interior-2': 'images/interior-2.webp',
  'interior-3': 'images/interior-3.webp',

  // Agents & Leadership
  'agent-1': 'images/agent-1.webp',
  'agent-2': 'images/agent-2.webp',
  'agent-3': 'images/agent-3.webp',
  'agent-4': 'images/agent-4.webp',

  // Clients
  'client-1': 'images/client-1.webp',
  'client-2': 'images/client-2.webp',
  'client-3': 'images/client-3.webp',

  // Services
  'service-buying': 'images/service-buying.webp',
  'service-selling': 'images/service-selling.webp',
  'service-invest': 'images/service-invest.webp',
  'service-mgmt': 'images/service-mgmt.webp',
  'service-legal': 'images/service-legal.webp',
  'service-design': 'images/service-design.webp',
  'service-relocation': 'images/service-relocation.webp',

  // Blog & Intelligence
  'blog-1': 'images/blog-1.webp',
  'blog-2': 'images/blog-2.webp',
  'blog-3': 'images/blog-3.webp',
  'blog-4': 'images/blog-4.webp',
  'blog-5': 'images/blog-5.webp',
  'blog-6': 'images/blog-6.webp'
};

function initLuxuryImageGenerators() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    const src = img.getAttribute('src') || '';
    
    // Match with photorealistic WebP image key
    let matchedWebp = null;
    let matchedKey = null;
    for (const [key, url] of Object.entries(REALTIME_WEBP_IMAGES)) {
      if (src.includes(key)) {
        matchedWebp = url;
        matchedKey = key;
        break;
      }
    }

    if (matchedWebp) {
      img.src = matchedWebp;
      img.loading = 'lazy';
    }
  });
}
