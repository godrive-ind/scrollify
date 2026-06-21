// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll("[data-target]");
let counterStarted = false;

const runCounter = () => {
    if (counterStarted) return;
    counterStarted = true;

    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const duration = 1500;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            counter.innerText = current + "+";

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };

        requestAnimationFrame(update);
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector(".stats");
if (statsSection) statsObserver.observe(statsSection);

// ===== MOBILE MENU =====
const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
    ".service-card, .feature-card, .step-card, .testimonial-card, .pricing-card, .portfolio-item, .stat-item"
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("revealed");
            }, index * 50);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

revealElements.forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
});

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        navbar.style.boxShadow = "0 1px 12px rgba(0, 0, 0, 0.04)";
    } else {
        navbar.style.boxShadow = "none";
    }
}, { passive: true });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });
});