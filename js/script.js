// Framecore Systems - Modern IT Solutions
// JavaScript for enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Header Scroll Effect (Mitech Style)
    // ============================================
    const pageHeaderInner = document.getElementById('page-header-inner');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            pageHeaderInner.classList.add('held');
        } else {
            pageHeaderInner.classList.remove('held');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // ============================================
    // Mobile Menu Toggle (Mitech Style)
    // ============================================
    const mobileMenuToggle = document.getElementById('page-open-mobile-menu');
    const menuContainer = document.getElementById('menu-primary');
    
    if (mobileMenuToggle && menuContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            menuContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on a link (non-dropdown links)
        const menuLinks = menuContainer.querySelectorAll('.menu-item > a:not(.has-submenu)');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuContainer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !menuContainer.contains(e.target)) {
                menuContainer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // Dropdown Menu Toggle (Mobile)
    // ============================================
    const dropdownLinks = document.querySelectorAll('.menu-item-has-children > a.has-submenu');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if we're on mobile (menu is visible)
            const isMobile = window.innerWidth <= 1199;
            
            if (isMobile) {
                e.preventDefault();
                const parent = this.parentElement;
                const subMenu = parent.querySelector('.sub-menu');
                
                // Toggle active class
                parent.classList.toggle('active');
                
                // Close other dropdowns
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== this) {
                        const otherParent = otherLink.parentElement;
                        otherParent.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // ============================================
    // Desktop Dropdown Menu Hover
    // ============================================
    function handleDropdownHover() {
        const menuItems = document.querySelectorAll('.menu-item-has-children');
        const isDesktop = window.innerWidth > 1199;
        
        if (isDesktop) {
            menuItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.classList.add('hover');
                });
                
                item.addEventListener('mouseleave', function() {
                    this.classList.remove('hover');
                });
            });
        }
    }
    
    handleDropdownHover();
    
    // Re-initialize on window resize
    window.addEventListener('resize', handleDropdownHover);
    
    // ============================================
    // Language Switcher
    // ============================================
    const languageToggle = document.querySelector('.js-wpml-ls-item-toggle');
    const languageSubMenu = document.querySelector('.wpml-ls-sub-menu');
    
    if (languageToggle && languageSubMenu) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            languageSubMenu.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageToggle.contains(e.target) && !languageSubMenu.contains(e.target)) {
                languageSubMenu.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // Search Form Toggle
    // ============================================
    const searchForm = document.querySelector('.header-search-form');
    const searchField = document.querySelector('.search-field');
    
    if (searchField) {
        searchField.addEventListener('focus', function() {
            this.style.width = '250px';
        });
        
        searchField.addEventListener('blur', function() {
            if (!this.value) {
                this.style.width = '200px';
            }
        });
    }
    
    // ============================================
    // Header Right More Toggle
    // ============================================
    const headerRightMore = document.getElementById('header-right-more');
    const headerRightInner = document.getElementById('header-right-inner');
    
    if (headerRightMore && headerRightInner) {
        headerRightMore.addEventListener('click', function() {
            headerRightInner.classList.toggle('active');
        });
    }
    
    // ============================================
    // Legacy Header Support (for backward compatibility)
    // ============================================
    const legacyHeader = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (legacyHeader && hamburger && navMenu) {
        function handleLegacyScroll() {
            if (window.scrollY > 50) {
                legacyHeader.classList.add('scrolled');
            } else {
                legacyHeader.classList.remove('scrolled');
            }
        }
        
        window.addEventListener('scroll', handleLegacyScroll);
        handleLegacyScroll();
        
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // Swiper - Clients Carousel
    // ============================================
    if (document.querySelector('.clients-swiper')) {
        const clientsSwiper = new Swiper('.clients-swiper', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                },
                1200: {
                    slidesPerView: 6,
                },
            },
        });
    }
    
    // ============================================
    // Counter Animation
    // ============================================
    const counters = document.querySelectorAll('.counter-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // Smooth Scrolling for Anchor Links
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Form Handling
    // ============================================
    const consultationForm = document.querySelector('.consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const inquiry = this.querySelector('select').value;
            
            if (!email || !inquiry) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you within 24 hours.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const animateElements = document.querySelectorAll('.service-box, .feature-box, .counter-item');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(el);
    });
    
    // ============================================
    // Active Navigation Link
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ============================================
    // Add Ripple Effect to Buttons
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation to CSS
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // Add Loading Animation
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // ============================================
    // Console Message
    // ============================================
    console.log('%cFramecore Systems', 'color: #086ad8; font-size: 20px; font-weight: bold;');
    console.log('%cModern IT Solutions & Services', 'color: #696969; font-size: 14px;');
    console.log('%cWebsite loaded successfully!', 'color: #28a745; font-size: 12px;');
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
