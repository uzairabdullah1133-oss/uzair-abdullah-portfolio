document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Optional: Animate hamburger icon if we had CSS for it
            navToggle.classList.toggle('open');

            // Change icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            } else {
                // Fallback if utilizing the span/CSS hamburger
                if (navLinks.classList.contains('active')) {
                    navToggle.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    }

    // --- Close Menu on Link Click (Mobile) ---
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
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

    // --- Active Link Switching on Scroll ---
    const sections = document.querySelectorAll('section, header');
    const navLi = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 90px offset helps trigger the active state just before the section hits top
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active-link');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active-link');
            }
        });
    });

    // --- Improved Scroll Animations (Intersection Observer) ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Target all elements with reveal class for professional fade-in
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Also ensure core sections are added to reveal if not manually tagged
    const sectionHeaders = document.querySelectorAll('.section-header, .edu-card, .skill-item, .exp-card, .project-card, .contact-wrapper');
    sectionHeaders.forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
            revealObserver.observe(el);
        }
    });

    // --- Performance Optimization: Navbar Scroll Effect ---
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = 'var(--shadow-md)';
            navbar.style.backgroundColor = 'rgba(10, 15, 26, 0.98)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
            navbar.style.backgroundColor = 'rgba(10, 15, 26, 0.95)';
        }

        lastScroll = currentScroll;
    });



    // --- Form Submission Handling (WhatsApp + Email) ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // 1. WhatsApp Configuration
            // Format: Name: [Name], Email: [Email], Message: [Message]
            const waNumber = "923140408651"; // International format for 03140408651
            const waText = encodeURIComponent(`*New Portfolio Contact*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`);
            const waLink = `https://wa.me/${waNumber}?text=${waText}`;

            // 2. Email Configuration (Mailto)
            const subject = encodeURIComponent("New Portfolio Contact from " + name);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:uzair.abdullah1133@gmail.com?subject=${subject}&body=${body}`;

            // Action: Open WhatsApp in new tab AND open Email client
            // We open WhatsApp first as a popup/new tab
            window.open(waLink, '_blank');

            // Then trigger email client
            // Small delay to ensure browser handles the first request
            setTimeout(() => {
                window.location.href = mailtoLink;
            }, 1000);

            // Visual feedback
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Opening WhatsApp & Email...';
            setTimeout(() => {
                btn.innerText = originalText;
                form.reset();
            }, 3000);
        });
    }

});

// --- Offer Letter Modal Logic (Global Scope) ---
let slideIndex = 1;

function openModal() {
    document.getElementById("offerModal").style.display = "block";
    showSlides(slideIndex);
}

function closeModal() {
    document.getElementById("offerModal").style.display = "none";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("modal-slide");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slides.length > 0) {
        slides[slideIndex - 1].style.display = "block";
    }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    const modal = document.getElementById('offerModal');
    if (event.target == modal) {
        closeModal();
    }
}
