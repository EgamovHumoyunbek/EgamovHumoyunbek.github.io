// ========================================
// Portfolio Sayt JavaScript Kode
// Egamov Humoyunbek
// ========================================

// DOM Content Loaded Event
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
            
            // Mobile view da menu yopilishi
            if (menuToggle && menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
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
    // 9. Typing Effect for Hero Description
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
    
    // ========================================
    // 10. Contact Form Validation (agar form bo'lsa)
    // ========================================
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            
            let isValid = true;
            
            // Name validation
            if (name === '') {
                showError('#name', 'Ismingizni kiriting');
                isValid = false;
            } else {
                clearError('#name');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('#email', 'To\'g\'ri email manzilini kiriting');
                isValid = false;
            } else {
                clearError('#email');
            }
            
            // Message validation
            if (message === '') {
                showError('#message', 'Xabarni kiriting');
                isValid = false;
            } else if (message.length < 10) {
                showError('#message', 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak');
                isValid = false;
            } else {
                clearError('#message');
            }
            
            // Form yuborish
            if (isValid) {
                // Formani yuborish kodi
                alert('Xabaringiz muvaffaqiyatli yuborildi!');
                contactForm.reset();
            }
        });
        
        function showError(inputId, message) {
            const input = document.querySelector(inputId);
            const errorDiv = input.nextElementSibling;
            
            if (errorDiv && errorDiv.classList.contains('error-message')) {
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            } else {
                const error = document.createElement('div');
                error.className = 'error-message';
                error.textContent = message;
                error.style.color = '#e74c3c';
                error.style.fontSize = '0.85rem';
                error.style.marginTop = '5px';
                input.parentNode.appendChild(error);
            }
            
            input.style.borderColor = '#e74c3c';
        }
        
        function clearError(inputId) {
            const input = document.querySelector(inputId);
            const errorDiv = input.nextElementSibling;
            
            if (errorDiv && errorDiv.classList.contains('error-message')) {
                errorDiv.style.display = 'none';
            }
            
            input.style.borderColor = '';
        }
    }
    
    // ========================================
    // 11. Back to Top Button
    // ========================================
    let backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '30px';
    backToTopBtn.style.right = '30px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.backgroundColor = 'var(--accent-gold)';
    backToTopBtn.style.color = 'var(--dark-bg)';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    backToTopBtn.style.transition = 'all 0.3s ease';
    backToTopBtn.style.zIndex = '999';
    backToTopBtn.style.fontSize = '1.2rem';
    
    document.body.appendChild(backToTopBtn);
    
    // Scroll event for back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'block';
            backToTopBtn.style.transform = 'scale(1)';
        } else {
            backToTopBtn.style.transform = 'scale(0)';
            setTimeout(() => {
                backToTopBtn.style.display = 'none';
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
    // 12. Loading Animation
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
    
    loader.querySelector('.loader-text').style.fontFamily = "'Orbitron', sans-serif";
    loader.querySelector('.loader-text').style.fontSize = '3rem';
    loader.querySelector('.loader-text').style.background = 'linear-gradient(45deg, var(--accent-gold), var(--accent-teal))';
    loader.querySelector('.loader-text').style.webkitBackgroundClip = 'text';
    loader.querySelector('.loader-text').style.backgroundClip = 'text';
    loader.querySelector('.loader-text').style.color = 'transparent';
    
    loader.querySelector('.loader-spinner').style.width = '50px';
    loader.querySelector('.loader-spinner').style.height = '50px';
    loader.querySelector('.loader-spinner').style.border = '5px solid rgba(212, 175, 55, 0.3)';
    loader.querySelector('.loader-spinner').style.borderTopColor = 'var(--accent-gold)';
    loader.querySelector('.loader-spinner').style.borderRadius = '50%';
    loader.querySelector('.loader-spinner').style.animation = 'spin 1s linear infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
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
    // 13. Section Counter Animation
    // ========================================
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            const speed = 200;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        // Counter ko'rinishida bo'lganda ishga tushirish
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
    
    // ========================================
    // 14. Dark Mode Toggle (Qo'shimcha)
    // ========================================
    // Agar kerak bo'lsa qo'shish mumkin
    
    // ========================================
    // 15. Copy to Clipboard for Contact Info
    // ========================================
    const contactLinks = document.querySelectorAll('.contact-details a');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href.startsWith('tel:') || this.href.startsWith('mailto:')) {
                const textToCopy = this.textContent.trim();
                
                // Clipboard ga nusxalash
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Tooltip ko'rsatish
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
                    
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes fadeInOut {
                            0%, 100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                            10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                        }
                    `;
                    document.head.appendChild(style);
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            }
        });
    });
    
    // ========================================
    // 16. Mouse Follower Effect (Qo'shimcha)
    // ========================================
    const mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    mouseFollower.style.position = 'fixed';
    mouseFollower.style.width = '30px';
    mouseFollower.style.height = '30px';
    mouseFollower.style.borderRadius = '50%';
    mouseFollower.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
    mouseFollower.style.pointerEvents = 'none';
    mouseFollower.style.zIndex = '9999';
    mouseFollower.style.transform = 'translate(-50%, -50%)';
    mouseFollower.style.transition = 'transform 0.1s ease';
    
    document.body.appendChild(mouseFollower);
    
    document.addEventListener('mousemove', (e) => {
        mouseFollower.style.left = `${e.clientX}px`;
        mouseFollower.style.top = `${e.clientY}px`;
    });
    
    // Links hover effect
    const links = document.querySelectorAll('a, button, .btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            mouseFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            mouseFollower.style.backgroundColor = 'rgba(0, 245, 212, 0.4)';
        });
        
        link.addEventListener('mouseleave', () => {
            mouseFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            mouseFollower.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
        });
    });
    
    console.log('🚀 Portfolio JavaScript loaded successfully!');
    console.log('👨‍💻 Developed by Egamov Humoyunbek');
    
});
