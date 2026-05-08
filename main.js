import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Particle System (Chaos Section)
const canvas = document.getElementById('chaos-particles');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < 0) this.reset();
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // Gold particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// 3. Scroll Animations (GSAP)
const sections = document.querySelectorAll('.section');

sections.forEach((section) => {
    const bg = section.querySelector('.background-image');
    const content = section.querySelector('.content');
    const revealTexts = section.querySelectorAll('.reveal-text, .reveal-text-large');
    const revealLines = section.querySelectorAll('.reveal-lines');
    const fades = section.querySelectorAll('.fade-in');

    // Parallax Effect
    if (bg) {
        gsap.fromTo(bg, 
            { y: "-15%" },
            {
                y: "15%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    }

    // Text Reveal Animations
    if (revealTexts.length) {
        gsap.from(revealTexts, {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            }
        });
    }

    // Line by Line Reveal
    if (revealLines.length) {
        gsap.from(revealLines, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.3,
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
            }
        });
    }

    // General Fade In
    if (fades.length) {
        gsap.from(fades, {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            }
        });
    }
});

// 4. Background Color Transitions
// Transition from Chaos to Seeking
gsap.to('body', {
    backgroundColor: '#1a1b3a',
    scrollTrigger: {
        trigger: '#searching',
        start: "top 80%",
        end: "top 20%",
        scrub: true
    }
});

// Transition to Divine Guidance
gsap.to('body', {
    backgroundColor: '#0d1b3e',
    scrollTrigger: {
        trigger: '#guidance',
        start: "top 80%",
        end: "top 20%",
        scrub: true
    }
});

// Transition to Inner Peace (Light)
gsap.to('body', {
    backgroundColor: '#f5f5f0',
    scrollTrigger: {
        trigger: '#peace',
        start: "top 80%",
        end: "top 20%",
        scrub: true
    }
});

// Transition to Devotion
gsap.to('body', {
    backgroundColor: '#e6e1f0',
    scrollTrigger: {
        trigger: '#devotion',
        start: "top 80%",
        end: "top 20%",
        scrub: true
    }
});

// 5. Product Reveal Interaction
const cards = document.querySelectorAll('.product-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -10, scale: 1.02, duration: 0.4 });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.4 });
    });
});

console.log("Divine Presence Website Loaded Successfully.");
