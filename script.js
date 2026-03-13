/* ============================================
   Josef Pavlovic - Photography Portfolio
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = navbar.offsetHeight + 20;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll animations (Intersection Observer) ---
    var animatedElements = document.querySelectorAll(
        '.service-card, .pricing-card, .step, .step-inline, .contact-method, .split-content, .split-gallery, .centered-content, .contact-form-wrapper, .info-box, .section-header'
    );

    animatedElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Contact form handling ---
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Build mailto link as fallback (works without backend)
            var subject = encodeURIComponent('Poptávka z webu - ' + (formData.service || 'Obecný dotaz'));
            var body = encodeURIComponent(
                'Jméno: ' + formData.name + '\n' +
                'E-mail: ' + formData.email + '\n' +
                'Služba: ' + (formData.service || 'Neuvedeno') + '\n\n' +
                'Zpráva:\n' + formData.message
            );

            window.location.href = 'mailto:mail@josefpavlovic.cz?subject=' + subject + '&body=' + body;

            // Show confirmation
            var btn = contactForm.querySelector('button[type="submit"]');
            var originalText = btn.textContent;
            btn.textContent = 'Odesláno!';
            btn.style.background = '#2d8f4e';
            setTimeout(function () {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }

    // --- Active nav link highlight on scroll ---
    var sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        var scrollY = window.pageYOffset;
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 100;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            var navLink = document.querySelector('.nav-menu a[href="#' + sectionId + '"]');
            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.style.color = '#c9a96e';
                } else {
                    navLink.style.color = '';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
});
