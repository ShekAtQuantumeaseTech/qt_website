document.addEventListener('DOMContentLoaded', () => {
    // Enable touch scrolling for services grid
    const servicesGrid = document.querySelector('.services-grid');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    servicesGrid.addEventListener('touchstart', (e) => {
        isScrolling = true;
        startX = e.touches[0].pageX - servicesGrid.offsetLeft;
        scrollLeft = servicesGrid.scrollLeft;
    });

    servicesGrid.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.touches[0].pageX - servicesGrid.offsetLeft;
        const walk = (x - startX) * 2;
        servicesGrid.scrollLeft = scrollLeft - walk;
    });

    servicesGrid.addEventListener('touchend', () => {
        isScrolling = false;
    });

    // Animate service cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Apply initial styles and observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effect to process steps
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.querySelector('.step-number').style.color = 'var(--secondary)';
        });
        
        step.addEventListener('mouseleave', () => {
            step.querySelector('.step-number').style.color = 'var(--primary)';
        });
    });
});