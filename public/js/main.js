/* ===================================================================
 * amenus 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    'use strict';

    const cfg = {

        // MailChimp URL
        mailChimpURL: 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6'

    };


    /* preloader
     * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');

        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader')) {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


    /* mobile menu
     * ---------------------------------------------------- */
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu


    /* swiper
     * ------------------------------------------------------ */
    const ssSwiper = function() {

        const homeSliderSwiper = new Swiper('.home-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1330px
                1331: {
                    slidesPerView: 3,
                    spaceBetween: 48
                },
                // when window width is > 1773px
                1774: {
                    slidesPerView: 4,
                    spaceBetween: 48
                }
            }
        });

        const pageSliderSwiper = new Swiper('.page-slider', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                // when window width is > 1240px
                1241: {
                    slidesPerView: 3,
                    spaceBetween: 48
                }
            }
        });

    }; // end ssSwiper


    /* mailchimp form
     * ---------------------------------------------------- */
    const ssMailChimpForm = function() {

        const mcForm = document.querySelector('#mc-form');

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute('novalidate', true);

        // Field validation
        function hasError(field) {

            // Don't validate submits, buttons, file and reset inputs, and disabled fields
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

            // Get validity
            let validity = field.validity;

            // If valid, return null
            if (validity.valid) return;

            // If field is required and empty
            if (validity.valueMissing) return 'Please enter an email address.';

            // If not the right type
            if (validity.typeMismatch) {
                if (field.type === 'email') return 'Please enter a valid email address.';
            }

            // If pattern doesn't match
            if (validity.patternMismatch) {

                // If pattern info is included, return custom error
                if (field.hasAttribute('title')) return field.getAttribute('title');

                // Otherwise, generic error
                return 'Please match the requested format.';
            }

            // If all else fails, return a generic catchall error
            return 'The value you entered for this field is invalid.';

        };

        // Show error message
        function showError(field, error) {

            // Get field id or name
            let id = field.id || field.name;
            if (!id) return;

            let errorMessage = field.form.querySelector('.mc-status');

            // Update error message
            errorMessage.classList.remove('success-message');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = error;

        };

        // Display form status (callback function for JSONP)
        window.displayMailChimpStatus = function(data) {

            // Make sure the data is in the right format and that there's a status container
            if (!data.result || !data.msg || !mcStatus) return;

            // Update our status message
            mcStatus.innerHTML = data.msg;

            // If error, add error class
            if (data.result === 'error') {
                mcStatus.classList.remove('success-message');
                mcStatus.classList.add('error-message');
                return;
            }

            // Otherwise, add success class
            mcStatus.classList.remove('error-message');
            mcStatus.classList.add('success-message');
        };

        // Submit the form 
        function submitMailChimpForm(form) {

            let url = cfg.mailChimpURL;
            let emailField = form.querySelector('#mce-EMAIL');
            let serialize = '&' + encodeURIComponent(emailField.name) + '=' + encodeURIComponent(emailField.value);

            if (url == '') return;

            url = url.replace('/post?u=', '/post-json?u=');
            url += serialize + '&c=displayMailChimpStatus';

            // Create script with url and callback (if specified)
            var ref = window.document.getElementsByTagName('script')[0];
            var script = window.document.createElement('script');
            script.src = url;

            // Create global variable for the status container
            window.mcStatus = form.querySelector('.mc-status');
            window.mcStatus.classList.remove('error-message', 'success-message')
            window.mcStatus.innerText = 'Submitting...';

            // Insert script tag into the DOM
            ref.parentNode.insertBefore(script, ref);

            // After the script is loaded (and executed), remove it
            script.onload = function() {
                this.remove();
            };

        };

        // Check email field on submit
        mcForm.addEventListener('submit', function(event) {

            event.preventDefault();

            let emailField = event.target.querySelector('#mce-EMAIL');
            let error = hasError(emailField);

            if (error) {
                showError(emailField, error);
                emailField.focus();
                return;
            }

            submitMailChimpForm(this);

        }, false);

    }; // end ssMailChimpForm


    /* alert boxes
     * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function(box) {

            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes


    /* Back to Top
     * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if (!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


    /* smoothscroll
     * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function(t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function(t, b, c, d) {
                t /= d;
                return -c * t * (t - 2) + b;
            },
            easeInOutQuad: function(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            },
            easeInOutCubic: function(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');

        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


    /* Initialize
     * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssSwiper();
        ssMailChimpForm();
        ssAlertBoxes();
        ssMoveTo();

    })();
    /* ================================================== 
   HEADER SCROLL EFFECT & HIGHLIGHT
   ================================================== */
    document.addEventListener("DOMContentLoaded", function() {

        // 1. SELECT ELEMENTS
        const header = document.querySelector('.s-header');
        const navLinks = document.querySelectorAll('.s-header__menu-links li a');
        const currentPage = window.location.pathname.split("/").pop();

        // 2. SCROLL LISTENER (Changes background from transparent to dark)
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky-on-scroll');
            } else {
                header.classList.remove('sticky-on-scroll');
            }
        });

        // 3. ACTIVE LINK HIGHLIGHT (Keeps your "About" highlighted)
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
                link.classList.add('active-link');
            }
        });

    });
    document.addEventListener("DOMContentLoaded", function() {

        // 1. Select all the review cards
        const cards = document.querySelectorAll('.review-card');

        // 2. Setup the "Observer" (The watcher)
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the card is in the viewport (screen)
                if (entry.isIntersecting) {
                    // Add the class that triggers the CSS transition
                    entry.target.classList.add('visible');

                    // Stop watching this card (so it doesn't animate again)
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // Trigger animation when 15% of the card is visible
        });

        // 3. Tell the observer to watch each card
        cards.forEach(card => {
            observer.observe(card);
        });

    });

    document.addEventListener("DOMContentLoaded", function() {
        const revealBooks = document.querySelectorAll('.reveal-book');
        if (!revealBooks.length) return;

        const bookObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: "0px 0px -10% 0px"
        });

        revealBooks.forEach(card => bookObserver.observe(card));
    });

    document.addEventListener("DOMContentLoaded", function() {
        const letterTargets = document.querySelectorAll('[data-animate-letters]');
        const wordTargets = document.querySelectorAll('[data-animate-words]');

        // Letters (typewriter)
        letterTargets.forEach(target => {
            if (target.dataset.lettersProcessed === 'true') return;
            const text = target.textContent.replace(/\s+/g, ' ').trim();
            if (!text) return;

            target.textContent = '';
            const fragment = document.createDocumentFragment();

            Array.from(text).forEach((char, index) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                span.style.transitionDelay = `${index * 22}ms`;
                fragment.appendChild(span);
            });

            target.appendChild(fragment);
            target.dataset.lettersProcessed = 'true';
        });

        // If About intro exists, delay the right paragraph until title finishes
        const aboutTitle = document.getElementById('about-intro-title');
        const aboutLead = document.getElementById('about-intro-lead');
        if (aboutTitle && aboutLead) {
            const charCount = aboutTitle.textContent.length;
            const totalDelay = Math.max(0, charCount * 22 + 250);
            aboutLead.dataset.delayMs = String(totalDelay);
        }

        // Words (staggered)
        wordTargets.forEach(target => {
            if (target.dataset.wordsProcessed === 'true') return;
            const text = target.textContent.trim().replace(/\s+/g, ' ');
            if (!text) return;

            const baseDelay = parseInt(target.dataset.delayMs || '0', 10);
            const words = text.split(' ');
            target.textContent = '';
            const fragment = document.createDocumentFragment();

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.className = 'word';
                span.textContent = word;
                span.style.transitionDelay = `${baseDelay + (index * 40)}ms`;
                fragment.appendChild(span);
                if (index < words.length - 1) {
                    fragment.appendChild(document.createTextNode(' '));
                }
            });

            target.appendChild(fragment);
            target.dataset.wordsProcessed = 'true';
        });

        if (letterTargets.length) {
            const letterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: "0px 0px -10% 0px"
            });

            letterTargets.forEach(target => letterObserver.observe(target));
        }

        if (wordTargets.length) {
            const wordObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: "0px 0px -10% 0px"
            });

            wordTargets.forEach(target => wordObserver.observe(target));
        }
    });

    document.addEventListener("DOMContentLoaded", function() {
        const revealTargets = [
            '.s-intro',
            '.pageheader',
            '.books-grid',
            '.pageintro',
            '.pagemain',
            '.s-pagecontent',
            '#cta .s-cta__content',
            '.s-footer'
        ];

        const nodes = document.querySelectorAll(revealTargets.join(','));
        if (!nodes.length) return;

        nodes.forEach(node => node.classList.add('page-reveal'));

        const pageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -10% 0px"
        });

        nodes.forEach(node => pageObserver.observe(node));
    });

})(document.documentElement);
