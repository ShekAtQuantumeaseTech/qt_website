document.addEventListener('DOMContentLoaded', () => {
    // Add scroll indicator to hero sections
    const heroSections = document.querySelectorAll('.hero');
    heroSections.forEach(hero => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.innerHTML = '↓';
        indicator.setAttribute('aria-label', 'Scroll to content');
        hero.appendChild(indicator);

        // Scroll to content when indicator is clicked
        indicator.addEventListener('click', () => {
            const nextSection = hero.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Hide/show scroll indicator based on scroll position
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollPosition = window.scrollY;
                const indicators = document.querySelectorAll('.scroll-indicator');
                indicators.forEach(indicator => {
                    indicator.style.opacity = scrollPosition > 50 ? '0' : '0.8';
                });
                ticking = false;
            });
            ticking = true;
        }
    });
});