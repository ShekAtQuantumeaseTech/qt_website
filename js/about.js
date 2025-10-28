document.addEventListener('DOMContentLoaded', () => {
  // Timeline reveal: mirror contact page interaction style
  const milestones = document.querySelectorAll('.milestone');

  if ('IntersectionObserver' in window && milestones.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    milestones.forEach(m => obs.observe(m));
  } else {
    // fallback: make all visible
    milestones.forEach(m => m.classList.add('visible'));
  }

  // Smooth scroll for internal anchors (if any)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
