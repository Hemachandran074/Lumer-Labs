/* ===== SERVICE PAGES — SHARED JS ===== */

// --- Navbar scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// --- Mobile menu ---
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    const open = navMenu.style.display === 'flex';
    navMenu.style.display = open ? 'none' : 'flex';
    if (!open) {
      Object.assign(navMenu.style, {
        position: 'absolute', top: '100%', left: '0', right: '0',
        flexDirection: 'column', padding: '20px',
        background: 'rgba(5,5,7,0.95)', backdropFilter: 'blur(20px)',
        gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)'
      });
    }
  });
}

// --- Intersection Observer fade-up ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const d = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), d);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.dataset.delay = (i % 6) * 80;
  observer.observe(el);
});

// --- Smooth scroll nav links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.innerWidth < 768 && navMenu) navMenu.style.display = 'none';
  });
});

// --- Card cursor glow ---
document.querySelectorAll('.svc-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.background = `radial-gradient(400px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(201,168,76,0.06), rgba(255,255,255,0.03) 40%, transparent 80%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = 'rgba(255,255,255,0.05)';
  });
});

// --- Floating particles ---
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight * 3;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.15;
      this.opacity = Math.random() * 0.4 + 0.05;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// --- Hero parallax ---
const heroImg = document.querySelector('.svc-hero-img');
if (heroImg) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    heroImg.style.transform = `translate(${x}px, ${y}px)`;
  });
}

console.log('✦ Lumer Labs Service Page — Loaded');
