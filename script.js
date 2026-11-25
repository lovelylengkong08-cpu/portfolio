// Typing effect
const roles = ['Web Developer', 'Information Systems Student', 'Content Creator', 'Java Developer'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typing');
function type() {
  const current = roles[roleIndex];
  typingEl.textContent = isDeleting ? current.substring(0, charIndex--) : current.substring(0, charIndex++);
  let speed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === current.length + 1) { speed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
  setTimeout(type, speed);
}
if (typingEl) type();

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 200) current = s.id; });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Custom cursor glow
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { glow.style.width = '40px'; glow.style.height = '40px'; });
  el.addEventListener('mouseleave', () => { glow.style.width = '20px'; glow.style.height = '20px'; });
});

// Project filters
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// Modal
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.modal-close');
cards.forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('modal-title').textContent = card.dataset.title;
    document.getElementById('modal-desc').textContent = card.dataset.desc;
    document.getElementById('modal-stack').textContent = card.dataset.stack;
    document.getElementById('modal-demo').href = card.dataset.demo;
    document.getElementById('modal-github').href = card.dataset.github;
    modal.classList.add('active');
  });
});
closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

// 3D tilt
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});