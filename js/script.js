// ── Navbar ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.pageYOffset > 40);
  updateActiveNav();
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// ── Active nav link on scroll ──
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.pageYOffset;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const id  = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + sec.offsetHeight);
  });
}

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
  });
});

// ── Contact form ──
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn    = document.getElementById('submit-btn');
    const status = document.getElementById('form-status');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
    status.style.display = 'block';
    if (res.ok) {
      status.style.color = '#4ade80';
      status.textContent = '✅ Message sent! I\'ll get back to you soon.';
      form.reset();
    } else {
      status.style.color = '#f87171';
      status.textContent = '❌ Something went wrong. Please try again.';
    }
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  });
}

// ── Console signature ──
console.log('%cMehedi Hasan', 'color:#1A73E8;font-size:20px;font-weight:bold;');
console.log('%cAI Engineer & LLM Specialist', 'color:#4A9EFF;font-size:13px;');
