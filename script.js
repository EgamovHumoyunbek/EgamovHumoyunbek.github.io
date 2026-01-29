// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Navigation active link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// Scroll animation for elements
const animateItems = document.querySelectorAll('.animate-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

animateItems.forEach(item => {
    observer.observe(item);
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Animate hero section immediately
    document.querySelector('.hero-content').classList.add('visible');
    // Animate other elements with delay
    setTimeout(() => {
        document.querySelectorAll('.animate-item:not(.hero-content)').forEach((item, index) => {
            setTimeout(() => {
                if (!item.classList.contains('visible')) {
                    item.classList.add('visible');
                }
            }, 300 * index);
        });
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
