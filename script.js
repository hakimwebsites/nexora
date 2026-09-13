/**
 * Nexora - Pure Vanilla JavaScript
 * Handles navigation, mobile menu, Formspree submission, dynamic year, and scroll reveals
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Automatically update current year in footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Drawer Toggle & Keyboard Trap
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-btn');

  function openMenu() {
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeMenu() {
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when any mobile nav link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
        mobileToggle.focus();
      }
    });
  }

  // 3. Formspree AJAX Submission
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  // Input fields for simple client-side validation
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const service = document.getElementById('service');
  const message = document.getElementById('message');

  function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

  function checkField(input, condition) {
    const group = input.closest('.form-group');
    if (!condition) {
      group.classList.add('has-error');
      return false;
    } else {
      group.classList.remove('has-error');
      return true;
    }
  }

  // Clear errors on input
  [fullName, email, service, message].forEach(field => {
    if (field) {
      field.addEventListener('input', () => {
        field.closest('.form-group').classList.remove('has-error');
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset feedback messages
      formSuccess.style.display = 'none';
      formError.style.display = 'none';

      // Honeypot bot protection check
      const honeypot = document.getElementById('company_website');
      if (honeypot && honeypot.value.trim() !== '') {
        return; // Silently drop spam submissions
      }

      // Validate inputs
      const isNameValid = checkField(fullName, fullName.value.trim().length > 1);
      const isEmailValid = checkField(email, validateEmail(email.value.trim()));
      const isServiceValid = checkField(service, service.value !== '');
      const isMessageValid = checkField(message, message.value.trim().length > 3);

      if (!isNameValid || !isEmailValid || !isServiceValid || !isMessageValid) {
        return;
      }

      // Check if user still has default placeholder Formspree ID
      if (contactForm.action.includes('YOUR_FORM_ID')) {
        formError.textContent = 'Please replace YOUR_FORM_ID in index.html with your actual Formspree ID.';
        formError.style.display = 'block';
        return;
      }

      // Loading state
      submitBtn.classList.add('loading');

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formSuccess.style.display = 'block';
          contactForm.reset();
        } else {
          formError.textContent = 'Submission failed. Please reach out via WhatsApp or email directly.';
          formError.style.display = 'block';
        }
      } catch (err) {
        formError.textContent = 'Network error. Please try again or reach out directly on WhatsApp.';
        formError.style.display = 'block';
      } finally {
        submitBtn.classList.remove('loading');
      }
    });
  }

  // 4. Subtle Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(
    '.service-card, .project-card, .why-card, .timeline-item, .contact-form-card'
  );

  elementsToReveal.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
});
