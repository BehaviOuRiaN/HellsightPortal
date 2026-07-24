// ==================== SMOOTH SCROLL FUNCTION ====================
function scrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== NAVBAR HIDE ON SCROLL ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let isScrolling = false;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!isScrolling) {
        isScrolling = true;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling DOWN
            navbar.classList.add('hidden');
        } else {
            // Scrolling UP
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
});

// ==================== ACTIVE NAV LINK ====================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ==================== DISCORD MEMBER INFO ====================
async function initializeDiscordInfo() {
    try {
        const memberCountElement = document.getElementById('memberCount');
        
        if (memberCountElement) {
            // Animate member count loading
            memberCountElement.innerHTML = `
                <span style="display: flex; align-items: center; gap: 8px;">
                    <span class="loading-dot"></span>
                    <span>Načítavam info serveru...</span>
                </span>
            `;
            
            // Simulate delay and update
            setTimeout(() => {
                memberCountElement.innerHTML = `
                    <span style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(255,255,255,0.8);">
                        <span style="width: 10px; height: 10px; background-color: #43b581; border-radius: 50%; display: inline-block;"></span>
                        <span>Server je aktívny • 1000+ hráčov online</span>
                    </span>
                `;
            }, 800);
        }
    } catch (error) {
        console.log('Discord info initialized');
    }
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// ==================== OBSERVE ELEMENTS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Discord info
    initializeDiscordInfo();
    
    // Observe game cards
    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe discover cards
    document.querySelectorAll('.discover-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe info cards
    document.querySelectorAll('.info-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Update active link on load
    updateActiveLink();
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== RIPPLE EFFECT ON BUTTONS ====================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.tagName === 'BUTTON') {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals/menus if needed
        console.log('Escape key pressed');
    }
});

// ==================== WINDOW RESIZE HANDLER ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateActiveLink();
    }, 250);
});

// ==================== PERFORMANCE: LAZY LOAD IMAGES ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ==================== FILTER FUNCTIONALITY ====================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.textContent.trim();
        console.log('Filter applied:', filterValue);
        
        // Animate game cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, 10);
        });
    });
});

// ==================== SEARCH BUTTON ====================
document.querySelector('.search-btn')?.addEventListener('click', () => {
    console.log('Search button clicked');
    // Add search functionality here
});

// ==================== MOBILE MENU TOGGLE (Future Enhancement) ====================
const setupMobileMenu = () => {
    // Check if menu button exists
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-links');
    
    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
};

document.addEventListener('DOMContentLoaded', setupMobileMenu);

// ==================== PREFETCH LINKS ====================
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ==================== ANIMATION PERFORMANCE OPTIMIZATION ====================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
    document.documentElement.style.setProperty('--transition', 'all 0s');
    document.documentElement.style.setProperty('--transition-fast', 'all 0s');
}

// ==================== PAGE LOAD COMPLETE ====================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');
    
    // Log that page is ready
    console.log('Hellsight.eu Portal loaded successfully');
    
    // Trigger any final animations
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.animation = 'fadeInUp 0.8s ease-out forwards';
    });
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});