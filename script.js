const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Dynamic Text Animation
const phrases = ["INNOVATION", "COMPETITION", "CREATION"];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const textElement = document.querySelector('.text-cycle');

function typeEffect() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        textElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 100 : 200;
    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect
typeEffect();

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixRain = document.querySelector('.matrix-rain');
    
    matrixRain.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = "01";
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 33);
}

createMatrixRain();

// XP Bar Animation
function animateXPBars() {
    const xpBars = document.querySelectorAll('.xp-progress');
    xpBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
}

// Trigger animations when elements are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('plan-card')) {
                animateXPBars();
            }
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Observe elements
document.querySelectorAll('.plan-card, .achievement-card').forEach(el => {
    observer.observe(el);
});

// Animate timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

timelineItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    timelineObserver.observe(item);
});

// Add hover effect to achievement icons
document.querySelectorAll('.achievement').forEach(achievement => {
    achievement.addEventListener('mouseover', (e) => {
        const title = e.target.getAttribute('title');
        // You could add a tooltip here if desired
    });
});

// Car Animation and Countdown Logic
document.addEventListener('DOMContentLoaded', () => {
    const car = document.querySelector('.car-container');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Update car position based on nearest event
    function updateCarPosition() {
        const now = new Date().getTime();
        let nearestEventDistance = Infinity;
        let nearestEventPosition = 0;
        
        eventCards.forEach((card, index) => {
            const eventDate = new Date(card.dataset.date).getTime();
            const distance = eventDate - now;
            
            if (distance > 0 && distance < nearestEventDistance) {
                nearestEventDistance = distance;
                nearestEventPosition = 30 + (index / (eventCards.length - 1)) * (document.querySelector('.track-line').offsetWidth - 60);
            }
        });
        
        car.style.left = `${nearestEventPosition}px`;
    }

    // Update countdowns
    function updateCountdowns() {
        eventCards.forEach(card => {
            const eventDate = new Date(card.dataset.date).getTime();
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                const daysEl = card.querySelector('.days');
                const hoursEl = card.querySelector('.hours');
                const minutesEl = card.querySelector('.minutes');
                
                if (daysEl && hoursEl && minutesEl) {
                    daysEl.textContent = days.toString().padStart(2, '0');
                    hoursEl.textContent = hours.toString().padStart(2, '0');
                    minutesEl.textContent = minutes.toString().padStart(2, '0');
                }
            }
        });
    }

    // Scroll handling for car direction
    const eventsContainer = document.querySelector('.events-container');
    eventsContainer.addEventListener('scroll', () => {
        const scrollDirection = eventsContainer.scrollLeft > (eventsContainer.lastScrollLeft || 0) ? 1 : -1;
        document.querySelector('.car').style.transform = `scaleX(${scrollDirection})`;
        eventsContainer.lastScrollLeft = eventsContainer.scrollLeft;
    });

    // Initialize and update
    updateCarPosition();
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
    setInterval(updateCarPosition, 1000);

    // Add resize handler for responsive updates
    window.addEventListener('resize', updateCarPosition);
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const branchCards = document.querySelectorAll('.branch-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    branchCards.forEach(card => {
        const branchName = card.querySelector('.branch-header h3').textContent.toLowerCase();
        const members = Array.from(card.querySelectorAll('.member-row'));
        
        let shouldShowCard = false;
        
        members.forEach(member => {
            const memberName = member.querySelector('.name').textContent.toLowerCase();
            const shouldShowMember = memberName.includes(searchTerm) || branchName.includes(searchTerm);
            member.style.display = shouldShowMember ? 'flex' : 'none';
            if (shouldShowMember) shouldShowCard = true;
        });
        
        card.style.display = shouldShowCard ? 'block' : 'none';
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateXPBars();
});

// Achievement hover effects
const achievementItems = document.querySelectorAll('.achievement-item');
achievementItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Guild Leader hover effect
const leaderSilhouette = document.querySelector('.leader-silhouette');
const leaderGlow = document.querySelector('.leader-glow');

leaderSilhouette.addEventListener('mouseenter', () => {
    leaderGlow.style.opacity = '0.8';
    leaderGlow.style.filter = 'blur(15px)';
});

leaderSilhouette.addEventListener('mouseleave', () => {
    leaderGlow.style.opacity = '0.5';
    leaderGlow.style.filter = 'blur(10px)';
});

// Member cards animation on scroll
const memberCards = document.querySelectorAll('.member-card');

const memberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1
});

memberCards.forEach(card => {
    card.style.transform = 'translateY(20px)';
    card.style.opacity = '0';
    card.style.transition = 'all 0.5s ease';
    memberObserver.observe(card);
});

// Random mystery icon animation
const mysteryIcon = document.querySelector('.mystery-icon');
const mysteryCharacters = ['?', '!', '*', '$', '@', '#'];
let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % mysteryCharacters.length;
    mysteryIcon.style.opacity = '0';
    
    setTimeout(() => {
        mysteryIcon.textContent = mysteryCharacters[currentIndex];
        mysteryIcon.style.opacity = '1';
    }, 500);
}, 3000);

// Resource Search Functionality
const resourceSearch = document.querySelector('.resource-search input');
const resourceCards = document.querySelectorAll('.resource-card');

resourceSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    resourceCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const level = card.dataset.level;
        
        const isVisible = 
            title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            level.includes(searchTerm);
        
        card.style.display = isVisible ? 'block' : 'none';
        card.style.opacity = isVisible ? '1' : '0';
        card.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
    });
});

// Animate XP bars on scroll
const xpBars = document.querySelectorAll('.xp-progress');

const xpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetWidth = entry.target.style.width;
            entry.target.style.width = '0%';
            
            setTimeout(() => {
                entry.target.style.width = targetWidth;
            }, 100);
        }
    });
}, {
    threshold: 0.1
});

xpBars.forEach(bar => xpObserver.observe(bar));

// Resource Card Hover Effects
resourceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 243, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Tooltip functionality
const resourceStats = document.querySelectorAll('.resource-stats span');

resourceStats.forEach(stat => {
    stat.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = stat.classList.contains('difficulty') ? 
            'Difficulty level of this resource' : 
            'Estimated time to complete';
        
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.padding = '0.5rem 1rem';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.zIndex = '1000';
        
        document.body.appendChild(tooltip);
        
        const rect = stat.getBoundingClientRect();
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        
        stat.addEventListener('mouseleave', () => tooltip.remove());
    });
});

// Animate featured cards
const featuredCards = document.querySelectorAll('.featured-card');

featuredCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.boxShadow = '0 15px 30px rgba(188, 0, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Smooth scroll for footer links
document.querySelectorAll('.footer a[href^="#"]').forEach(anchor => {
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

// Floating social icon animation
const floatingSocial = document.querySelector('.social-icon-float');
let floatAnimation;

if (floatingSocial) {
    floatAnimation = floatingSocial.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0)' }
    ], {
        duration: 2000,
        iterations: Infinity
    });
}

// Footer grid animation
const footerBg = document.querySelector('.grid-overlay');
let scrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentPosition = window.pageYOffset;
    if (footerBg) {
        footerBg.style.transform = `perspective(500px) rotateX(60deg) translateY(${currentPosition * 0.1}px)`;
    }
    scrollPosition = currentPosition;
});
