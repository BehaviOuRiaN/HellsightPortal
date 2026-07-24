// ==================== SMOOTH SCROLL ==================== 
function scrollToGames() {
    const gamesSection = document.getElementById('games');
    gamesSection.scrollIntoView({ behavior: 'smooth' });
}

// ==================== DISCORD MEMBER COUNT ==================== 
async function fetchDiscordServerInfo() {
    try {
        // Note: Discord widget doesn't directly expose member count via API for security reasons
        // This is a fallback approach. For production, you'd need a Discord bot.
        
        const memberCountElement = document.getElementById('memberCount');
        
        // Simulating member count display
        // In a production environment, you'd use Discord.py or similar to fetch actual member count
        memberCountElement.innerHTML = `
            <span class="member-status">
                🟢 Server je aktívny
            </span>
            <span style="display: block; margin-top: 8px; color: rgba(255,255,255,0.6); font-size: 14px;">
                Připoj se na Discord a buď součástí komunity
            </span>
        `;
    } catch (error) {
        console.log('Discord info loading...');
    }
}

// ==================== NAVBAR SCROLL EFFECT ==================== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== ACTIVE NAV LINK ==================== 
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#e91e63';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== PAGE LOAD ==================== 
document.addEventListener('DOMContentLoaded', () => {
    fetchDiscordServerInfo();
    
    // Add animation to game cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.game-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// ==================== PREVENT NAVBAR STYLE RESET ==================== 
window.addEventListener('load', () => {
    const navbar = document.querySelector('.navbar');
    navbar.style.transition = 'transform 0.3s ease';
});