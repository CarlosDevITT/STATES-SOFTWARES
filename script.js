'use strict';

/* Header: sombra/blur ao rolar */
const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

const onScroll = () => {
  const scrolled = window.scrollY > 80;
  header?.classList.toggle('active', scrolled);
  backTopBtn?.classList.toggle('show', window.scrollY > 400);
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Menu mobile */
const navbar = document.querySelector('[data-navbar]');
const overlay = document.querySelector('[data-overlay]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');

const toggleNav = () => {
  navbar?.classList.toggle('active');
  overlay?.classList.toggle('active');
  document.body.style.overflow = navbar?.classList.contains('active') ? 'hidden' : '';
};

navTogglers.forEach((btn) => btn.addEventListener('click', toggleNav));

document.querySelectorAll('[data-nav-link]').forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar?.classList.contains('active')) toggleNav();
  });
});

/* Filtro de projetos */
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const projectItems = document.querySelectorAll('.project .grid-list > li');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectItems.forEach((item) => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

/* Revelar seções ao rolar */
const revealTargets = document.querySelectorAll(
  '.service-card, .feature-card, .project-card, .newsletter-content, .hero-content, .hero-banner'
);
revealTargets.forEach((el) => el.setAttribute('data-reveal', ''));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
} else {
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in-view'));
}

/* Newsletter — feedback simples de envio */
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const field = newsletterForm.querySelector('.email-field');
  const btn = newsletterForm.querySelector('button');
  const original = btn.querySelector('.span').textContent;
  btn.querySelector('.span').textContent = 'Inscrito ✓';
  btn.disabled = true;
  setTimeout(() => {
    btn.querySelector('.span').textContent = original;
    btn.disabled = false;
    field.value = '';
  }, 2200);
});
