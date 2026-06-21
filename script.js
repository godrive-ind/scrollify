// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll("[data-target]");

const runCounter = () => {
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const increment = target / 60;

        const update = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "+";
            }
        };

        update();
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
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.querySelector(".mobile-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        mobileToggle.classList.toggle("active");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            mobileToggle.classList.remove("active");
        });
    });
}

// ===== SCROLL ANIMATIONS =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll(".card, .step, .price-card, .portfolio-item, .stat-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        observer.observe(el);
    });
};

animateOnScroll();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.06)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});