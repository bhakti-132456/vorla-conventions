/* ===========================
   VORLA CONVENTIONS — ARCHITECTURAL MONOLITH
   Smooth-scroll Physics · Staggered Reveals · Gallery Interactions
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Mobile Menu ── */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            const open = navLinks.classList.toggle('active');
            menuBtn.textContent = open ? 'Close' : 'Menu';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = 'Menu';
            });
        });
    }

    /* ── Navbar Scroll ── */
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    const handleScroll = () => {
        const y = window.scrollY;
        if (navbar) {
            navbar.classList.toggle('scrolled', y > 80);
        }
        lastScroll = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ── Staggered Scroll Reveals ── */
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        });

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        reveals.forEach(el => el.classList.add('visible'));
    }

    /* ── Smooth Scroll for Anchor Links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight + 20 : 20;
                const y = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ── Gallery Lightbox ── */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCap = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let galleryItems = [];
    let currentIndex = 0;

    if (lightbox) {
        const masonryItems = document.querySelectorAll('.masonry-item');

        masonryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.masonry-caption');

            if (img) {
                galleryItems.push({
                    src: img.src,
                    alt: img.alt,
                    caption: caption ? caption.textContent : img.alt
                });

                item.addEventListener('click', () => {
                    currentIndex = index;
                    openLightbox();
                });
            }
        });

        function openLightbox() {
            if (!galleryItems.length) return;
            const item = galleryItems[currentIndex];
            lightboxImg.src = item.src;
            lightboxImg.alt = item.alt;
            if (lightboxCap) lightboxCap.textContent = item.caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            openLightbox();
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            openLightbox();
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
        if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
    }

    /* ── FAQ Accordion ── */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const wasOpen = item.classList.contains('open');

                // Close all
                faqItems.forEach(i => i.classList.remove('open'));

                // Toggle if wasn't open
                if (!wasOpen) item.classList.add('open');
            });
        }
    });

    /* ── Contact Form ── */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value;
            const phone = document.getElementById('phone')?.value;
            const eventType = document.getElementById('event-type')?.value;
            const eventDate = document.getElementById('event-date')?.value;

            // Construct WhatsApp message
            let message = `Inquiry from ${name}%0APhone: ${phone}`;
            if (eventType) message += `%0AProgram: ${eventType}`;
            if (eventDate) message += `%0ADate: ${eventDate}`;

            const msg = document.getElementById('message')?.value;
            if (msg) message += `%0ABrief: ${msg}`;

            window.open(`https://wa.me/919393000999?text=${message}`, '_blank');
        });
    }

    /* ── Horizontal Scroll Animation ── */
    const horizontalSections = document.querySelectorAll('.horizontal-section');

    const animateHorizontal = () => {
        horizontalSections.forEach(section => {
            const sticky = section.querySelector('.horizontal-sticky');
            const scrollWrap = section.querySelector('.horizontal-scroll');
            if (!sticky || !scrollWrap) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollDistance = window.scrollY;

            // Calculate progress through the section (0 to 1)
            let progress = (scrollDistance - sectionTop) / (sectionHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));

            // Calculate translateX
            const scrollWidth = scrollWrap.scrollWidth;
            const maxTranslate = scrollWidth - window.innerWidth;
            const translateX = progress * maxTranslate;

            scrollWrap.style.transform = `translateX(-${translateX}px)`;
        });
    };

    window.addEventListener('scroll', animateHorizontal, { passive: true });
    animateHorizontal();

    /* ── Console ── */
    console.log(
        '%cVorla Conventions',
        'font-family: "Cormorant Garamond", serif; font-size: 18px; font-weight: 300; color: #0A0A0A;'
    );
    console.log(
        '%cThe Architecture of Gathering.',
        'font-family: "IBM Plex Mono", monospace; font-size: 10px; color: #888;'
    );

});
