// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Toggle Icon
        const icon = navToggle.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Hero Slider
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

if (slides.length > 0) {
    setInterval(nextSlide, 5000); // 5 Seconds
    showSlide(currentSlide);
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.padding = '10px 0';
        navbar.style.borderBottom = '1px solid rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.padding = '15px 0';
        navbar.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
    }
});

// Floating Icons Scroll Logic
window.addEventListener('scroll', () => {
    const floatingIcons = document.querySelector('.floating-icons');
    if (!floatingIcons) return;

    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (window.scrollY / scrollTotal) * 100;

    if (scrollProgress > 15) {
        floatingIcons.classList.add('show');
    } else {
        floatingIcons.classList.remove('show');
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Booking Interaction
const bookButtons = document.querySelectorAll('.btn-book, .btn-call, .btn-whatsapp');

// Simple Notification for "Demo" feel
function showNotification(message, type = 'success') {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();

    const notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.innerText = message;

    // Style
    Object.assign(notif.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'success' ? 'var(--primary)' : '#ff4444',
        color: '#000',
        padding: '12px 24px',
        borderRadius: '50px',
        fontWeight: 'bold',
        zIndex: '10000',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });

    document.body.appendChild(notif);

    // Animate In
    requestAnimationFrame(() => {
        notif.style.opacity = '1';
        notif.style.bottom = '30px';
    });

    // Remove
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.bottom = '20px';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Enhance buttons with simple feedback
bookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
            // For internal links
        }
    });
});

// Scroll Animation Observer for Revealing Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.highlight-card, .game-card, .facility, .hero-content');
    hiddenElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Dynamic Date in Footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        // Regex to find any 4-digit year and replace it, or just append if missing
        element.innerHTML = element.innerHTML.replace(/\d{4}/, currentYear);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const icon = item.querySelector('i');

        question.addEventListener('click', () => {
            // Toggle current item
            const isActive = item.classList.contains('active');

            // Close all other items (Optional - keeping multiple open might be better for UX, but requests are usually accordion style)
            // Let's default to allowing multiple open for now, or close others? 
            // User asked: "hide the answer after click the arrow mark show answer"
            // Usually this implies a toggle.

            item.classList.toggle('active');

            // Icon Switch
            if (!isActive) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-times');
                // Rotation is handled by CSS for .active, but we are changing the icon type, 
                // so we might want to suppress rotation or let it rotate.
                // For a simple X, no rotation is usually needed.
                icon.style.transform = 'rotate(0deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-chevron-down');
                icon.style.transform = '';
            }
        });
    });

    // Testimonial Slider
    const track = document.querySelector('.testimonial-track');
    if (track) {
        let index = 0;
        const cards = document.querySelectorAll('.testimonial-card');
        const totalCards = cards.length;

        function slideTestimonials() {
            index++;
            if (index >= totalCards) {
                index = 0;
            }
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        setInterval(slideTestimonials, 4000); // 4 Seconds
    }
});