document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    // Set initial state from localStorage
    if (localStorage.getItem('wouri-dark-mode') === 'true') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.querySelector('i').className = 'fas fa-sun';
    } else {
        if (darkModeToggle) darkModeToggle.querySelector('i').className = 'fas fa-moon';
    }
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('wouri-dark-mode', isDark);
            this.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
    // --- End Dark Mode Toggle ---

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link
                const navMenuEl = document.getElementById('navMenu');
                const menuToggleEl = document.getElementById('menuToggle');
                if (navMenuEl && navMenuEl.classList.contains('active')) {
                    navMenuEl.classList.remove('active');
                    const icon = menuToggleEl.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Animate on scroll logic
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Form submission (placeholder)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send this data to a server
            // e.g., using fetch API or XMLHttpRequest
            alert('Message envoyé ! Nous vous contacterons bientôt.');
            contactForm.reset(); // Clear the form
            // Optionally, disable the submit button and show a success message
        });
    }

    // Active navigation link on scroll (Advanced, optional but professional)
    const sections = document.querySelectorAll('section');
    const navHighlighter = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset to trigger slightly before the section reaches the top
            if (window.scrollY >= sectionTop - header.offsetHeight - 50) {
                current = section.getAttribute('id');
            }
        });

        const navMenuHighlight = document.getElementById('navMenu');
        if (navMenuHighlight) {
            navMenuHighlight.querySelectorAll('a').forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href').includes(current)) {
                    a.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', navHighlighter);
    navHighlighter(); // Call on load to set initial active link

    // --- Typing Effect for Hero Section (Looping) ---
    const heroTextElement = document.getElementById('svg-typing-text');
    const typingTexts = [
        "Solutions Fintech Innovantes",
        "Ingénierie Logicielle Avancée",
        "Conseil Stratégique Digital",
        "Marketing & UI/UX Excellence"
    ];
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 75;
    const deletingSpeed = 40;
    const delayBetweenTexts = 2000;

    function typeLoop() {
        const currentText = typingTexts[currentTextIndex];
        let displayText = currentText.substring(0, charIndex);
        // Highlight 'Fintech' if present
        if (displayText.includes("Fintech")) {
            displayText = displayText.replace("Fintech", '<span class="highlight-fintech">Fintech</span>');
        }
        heroTextElement.innerHTML = displayText;

        if (!isDeleting && charIndex < currentText.length) {
            charIndex++;
            setTimeout(typeLoop, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeLoop, deletingSpeed);
        } else {
            if (!isDeleting) {
                isDeleting = true;
                setTimeout(typeLoop, delayBetweenTexts);
            } else {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
                setTimeout(typeLoop, typingSpeed);
            }
        }
    }
    if (heroTextElement) typeLoop();
    // --- End Typing Effect ---
});