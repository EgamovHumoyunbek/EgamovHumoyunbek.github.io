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
        
        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
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
        }
    });
    
    // ========================================
    // 2. Navigation Active Link
    // ========================================
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // ========================================
    // 3. Mobile Menu Toggle
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Close menu when clicking on a link (mobile)
        navLinks.forEach(link => {
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
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // ========================================
    // 4. Smooth Scrolling
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
    // 5. Scroll Animations (Intersection Observer)
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateItems.forEach(item => {
        observer.observe(item);
    });
    
    // ========================================
    // 6. Hero Section Initial Animation
    // ========================================
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 300);
    }
    
    // ========================================
    // 7. Skill Cards 3D Hover Effect
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
    // 8. Project Cards Hover Effect
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
    // 9. Button Ripple Effect
    // ========================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ========================================
    // 10. Back to Top Button
    // ========================================
    let backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // 11. Loading Animation
    // ========================================
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <h1 class="loader-text">HumoyunDev</h1>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.backgroundColor = 'var(--dark-bg)';
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.zIndex = '9999';
    loader.style.transition = 'opacity 0.5s ease';
    
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
    
    // ========================================
    // 12. Copy to Clipboard for Contact Info
    // ========================================
    const contactLinks = document.querySelectorAll('.contact-details a');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.startsWith('tel:') || this.href.startsWith('mailto:')) {
                e.preventDefault();
                const textToCopy = this.textContent.trim();
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Nusxalandi!';
                    tooltip.style.position = 'fixed';
                    tooltip.style.top = '20px';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                    tooltip.style.backgroundColor = 'var(--accent-gold)';
                    tooltip.style.color = 'var(--dark-bg)';
                    tooltip.style.padding = '10px 20px';
                    tooltip.style.borderRadius = '8px';
                    tooltip.style.zIndex = '10000';
                    tooltip.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                    tooltip.style.animation = 'fadeInOut 2s ease';
                    
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
    
    console.log('🚀 Portfolio JavaScript loaded successfully!');
    console.log('👨‍💻 Developed by Egamov Humoyunbek');
    
});
