// ========================================
// Portfolio Sayt JavaScript Kode
// Egamov Humoyunbek
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 1. Header Scroll Effect
    // ========================================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // 2. Navigation Active Link
    // ========================================
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Barcha linklardan active class ni olib tashlash
            navLinks.forEach(a => a.classList.remove('active'));
            // Bosilgan linkga active class qo'shish
            this.classList.add('active');
        });
    });
    
    // ========================================
    // 3. Smooth Scrolling
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // 4. Scroll Animations (Intersection Observer)
    // ========================================
    const animateItems = document.querySelectorAll('.animate-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Bir marta animatsiya qilish
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateItems.forEach(item => {
        observer.observe(item);
    });
    
    // ========================================
    // 5. Hero Section Initial Animation
    // ========================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 300);
    }
    
    // ========================================
    // 6. Skill Cards 3D Hover Effect
    // ========================================
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // ========================================
    // 7. Project Cards Hover Effect
    // ========================================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ========================================
    // 8. Button Ripple Effect
    // ========================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Ripple effect yaratish
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Ripple ni o'chirish
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ========================================
    // 9. Back to Top Button
    // ========================================
    let backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-gold);
        color: var(--dark-bg);
        border: none;
        cursor: pointer;
        display: none;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transition: var(--transition);
        z-index: 999;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Scroll event for back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.transform = 'scale(1)';
        } else {
            backToTopBtn.style.transform = 'scale(0)';
            setTimeout(() => {
                if (window.scrollY < 500) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Back to top button click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // 10. Loading Animation
    // ========================================
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h1 class="loader-text">HumoyunDev</h1>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-text {
            font-family: 'Orbitron', sans-serif;
            font-size: 3rem;
            background: linear-gradient(45deg, var(--accent-gold), var(--accent-teal));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            margin-bottom: 20px;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(212, 175, 55, 0.3);
            border-top-color: var(--accent-gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);
    
    document.body.appendChild(loader);
    
    // Loading tugagach o'chirish
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
    
    // ========================================
    // 11. Copy to Clipboard for Contact Info
    // ========================================
    const contactLinks = document.querySelectorAll('.contact-details a');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.startsWith('tel:') || this.href.startsWith('mailto:')) {
                e.preventDefault();
                const textToCopy = this.textContent.trim();
                
                // Clipboard ga nusxalash
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Tooltip ko'rsatish
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Nusxalandi!';
                    tooltip.style.cssText = `
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: var(--accent-gold);
                        color: var(--dark-bg);
                        padding: 10px 20px;
                        border-radius: 8px;
                        z-index: 10000;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                        animation: fadeInOut 2s ease;
                    `;
                    
                    const tooltipStyle = document.createElement('style');
                    tooltipStyle.textContent = `
                        @keyframes fadeInOut {
                            0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                            10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                        }
                    `;
                    document.head.appendChild(tooltipStyle);
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            }
        });
    });
    
    // ========================================
    // 12. Mobile Menu Toggle
    // ========================================
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
        display: none;
        background: var(--card-bg);
        border: 1px solid rgba(212, 175, 55, 0.3);
        color: var(--accent-gold);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1001;
        font-size: 1.5rem;
        transition: var(--transition);
    `;
    
    header.appendChild(menuToggle);
    
    const navMenu = document.querySelector('nav ul');
    
    // Menu toggle
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Responsive menu
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navMenu.style.display = 'none';
            
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'block';
            }
        } else {
            menuToggle.style.display = 'none';
            navMenu.style.display = 'flex';
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    // Initial check
    checkScreenSize();
    
    // Window resize event
    window.addEventListener('resize', checkScreenSize);
    
    // Menu link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // ========================================
    // 13. Typing Effect for Hero Description
    // ========================================
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        const originalText = heroDesc.textContent;
        heroDesc.textContent = '';
        
        let charIndex = 0;
        const typeSpeed = 50;
        
        setTimeout(() => {
            const typeWriter = setInterval(() => {
                if (charIndex < originalText.length) {
                    heroDesc.textContent += originalText.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeWriter);
                }
            }, typeSpeed);
        }, 1000);
    }
    
    console.log('🚀 Portfolio JavaScript loaded successfully!');
    console.log('👨‍💻 Developed by Egamov Humoyunbek');
    
});
