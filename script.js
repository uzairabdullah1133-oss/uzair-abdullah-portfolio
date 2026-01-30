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


    // --- Scroll Animations (Intersection Observer) ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove if you want animations to replay on scroll up
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    const animatedElements = document.querySelectorAll(`
        .reveal, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .stagger-item,
        .section-header, .project-card, .edu-card, .exp-card, .skills-category,
        .contact-wrapper, .about-content
    `);

    animatedElements.forEach(el => revealObserver.observe(el));

    // Special handling for Hero section
    const heroElements = document.querySelectorAll('[class*="hero-animate-"]');

    // Trigger hero animations immediately on load
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add('active'));
    }, 100);

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Re-enable animation on scroll back
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.1 });

    heroElements.forEach(el => heroObserver.observe(el));

    // Progressive reveal for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(skillItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    skillItems.forEach(item => skillObserver.observe(item));

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
        // --- Newsletter Form Handling (Footer) ---
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function (e) {
                e.preventDefault();

                const emailInput = this.querySelector('input[name="email"]');
                const submitBtn = this.querySelector('button');
                const originalBtnContent = submitBtn.innerHTML;

                // Visual feedback - loading
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;

                const formData = new FormData(this);

                // Using fetch to submit without page reload
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            // Success
                            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                            submitBtn.style.backgroundColor = '#25D366';
                            emailInput.value = '';
                            emailInput.placeholder = 'Message Sent! ✨';

                            setTimeout(() => {
                                submitBtn.innerHTML = originalBtnContent;
                                submitBtn.style.backgroundColor = '';
                                submitBtn.disabled = false;
                                emailInput.placeholder = 'Email address';
                            }, 4000);
                        } else {
                            throw new Error('Submission failed');
                        }
                    })
                    .catch(error => {
                        // Usually fails locally due to CORS or 'file://' protocol
                        console.log('FormSubmit Error:', error);

                        // Fallback for local testing: Inform user it will work on host
                        submitBtn.innerHTML = '<i class="fas fa-info-circle"></i>';
                        emailInput.value = '';
                        emailInput.placeholder = 'Host required for Mail!';

                        setTimeout(() => {
                            submitBtn.innerHTML = originalBtnContent;
                            submitBtn.disabled = false;
                            emailInput.placeholder = 'Email address';
                        }, 4000);
                    });
            });
        }
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

// --- Chatbot Widget Logic ---
const chatbotBtn = document.getElementById('chatbotBtn');
const chatWidget = document.getElementById('chatWidget');
const closeChat = document.getElementById('closeChat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

if (chatbotBtn && chatWidget) {
    // Toggle Chat visibility
    chatbotBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
        if (chatWidget.classList.contains('active')) {
            // Stop jumping animation when open
            chatbotBtn.style.animation = 'none';
            // Focus input
            setTimeout(() => chatInput.focus(), 100);
        } else {
            // Resume jumping animation when closed
            chatbotBtn.style.animation = 'jump 2s infinite ease-in-out';
        }
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
        chatbotBtn.style.animation = 'jump 2s infinite ease-in-out';
    });

    // Send Message Logic
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // 1. Add User Message
            addMessage(message, 'user');
            chatInput.value = '';

            // 2. Simulate Bot Response (Simple "Real-time" effect)
            // Show typing indicator or just delay
            setTimeout(() => {
                const botReply = getBotResponse(message);
                addMessage(botReply, 'bot');
            }, 1000); // 1 second delay for realism
        }
    }

    sendMessage.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message', sender);
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getBotResponse(input) {
        input = input.toLowerCase();

        // Simple predefined responses
        if (input.includes('hello') || input.includes('hi')) {
            return "Hello! Thank you for visiting my portfolio. How can I help you today?";
        } else if (input.includes('project') || input.includes('work')) {
            return "I have worked on several exciting projects including a School Management System and an E-commerce platform. You can check them out in the Projects section!";
        } else if (input.includes('contact') || input.includes('email') || input.includes('hire')) {
            return "You can contact me via the form below or email me directly at uzair.abdullah1133@gmail.com.";
        } else if (input.includes('skill') || input.includes('tech')) {
            return "I am proficient in MERN Stack, Python, Java, and modern web technologies.";
        } else {
            return "Thanks for your message! I'm a simple AI demo right now, but feel free to explore the site or contact me directly.";
        }
    }
}
