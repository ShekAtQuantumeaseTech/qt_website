// Navigation Configuration
const navigationConfig = {
    mainNav: [
        { title: 'Home', path: 'index.html', available: true },
        {
            title: 'Products',
            path: 'products.html',
            available: true,
            dropdown: [
                { title: 'Edge AI Systems', path: '#', available: false },
                { title: 'Autonomous Robotics', path: '#', available: false },
                { title: 'Smart Surveillance', path: '#', available: false },
                { title: 'AI Trail Cameras', path: '#', available: false }
            ]
        },
        {
            title: 'Services',
            path: 'services.html',
            available: true,
            dropdown: [
                { title: 'Embedded System Design', path: '#', available: false },
                { title: 'AI Model Optimization', path: '#', available: false },
                { title: 'Cloud Integration', path: '#', available: false },
                { title: 'Cybersecurity Solutions', path: '#', available: false }
            ]
        },
        { title: 'About', path: 'about.html', available: true },
        { title: 'Careers', path: 'careers.html', available: false },
        { title: 'Contact', path: 'contact.html', available: true, class: 'cta' }
    ]
};

// Navigation Builder
function buildNavigation() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    navigationConfig.mainNav.forEach(item => {
        if (item.dropdown) {
            // Create dropdown container
            const dropdownContainer = document.createElement('div');
            dropdownContainer.className = 'dropdown';

            // Create main dropdown link
            const mainLink = document.createElement('a');
            mainLink.href = item.available ? item.path : '404.html';
            mainLink.textContent = `${item.title} ▾`;
            dropdownContainer.appendChild(mainLink);

            // Create dropdown menu
            const dropdownMenu = document.createElement('div');
            dropdownMenu.className = 'dropdown-menu';

            // Add dropdown items
            item.dropdown.forEach(subItem => {
                const subLink = document.createElement('a');
                subLink.href = subItem.available ? subItem.path : '404.html';
                subLink.textContent = subItem.title;
                dropdownMenu.appendChild(subLink);
            });

            dropdownContainer.appendChild(dropdownMenu);
            navLinks.appendChild(dropdownContainer);
        } else {
            // Create regular nav link
            const link = document.createElement('a');
            link.href = item.available ? item.path : '404.html';
            link.textContent = item.title;
            if (item.class) link.className = item.class;
            navLinks.appendChild(link);
        }
    });
}

// Initialize navigation after partials are loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for header to be loaded
    const headerContainer = document.querySelector('[data-include="partials/header.html"]');
    if (headerContainer) {
        // Create a MutationObserver to watch for changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Check if nav-links exists after header is loaded
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks && navLinks.children.length === 0) {
                        buildNavigation();
                        // Disconnect once navigation is built
                        observer.disconnect();
                    }
                }
            });
        });

        // Start observing the header container
        observer.observe(headerContainer, { childList: true, subtree: true });
    }
});