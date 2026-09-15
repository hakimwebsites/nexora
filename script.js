/**
 * Nexora
 * Pure Vanilla JavaScript
 *
 * Handles:
 * - Dynamic year
 * - Mobile navigation
 * - Smooth navigation
 * - Active navigation state
 * - FAQ accordion
 * - Form validation
 * - Formspree AJAX submission
 * - WhatsApp links
 * - Scroll reveal animations
 */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     CONFIGURATION
  ========================================================= */

  const NEXORA_CONFIG = {
    whatsappNumber: "971558311047",

    whatsappMessage:
      "Hi Nexora, I'd like to discuss a website project for my business.",

    formEndpoint:
      "https://formspree.io/f/meaqbely"
  };


  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================================
     MOBILE MENU
  ========================================================= */

  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const mobileLinks = document.querySelectorAll(
    ".mobile-link, .mobile-cta-btn"
  );


  function openMenu() {

    if (!mobileToggle || !mobileMenu) {
      return;
    }

    mobileToggle.classList.add("active");

    mobileToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenu.classList.add("open");

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";
  }


  function closeMenu() {

    if (!mobileToggle || !mobileMenu) {
      return;
    }

    mobileToggle.classList.remove("active");

    mobileToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenu.classList.remove("open");

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";
  }


  if (mobileToggle && mobileMenu) {

    mobileToggle.addEventListener("click", () => {

      const isExpanded =
        mobileToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    document.addEventListener("keydown", (event) => {

      if (
        event.key === "Escape" &&
        mobileMenu.classList.contains("open")
      ) {

        closeMenu();

        mobileToggle.focus();
      }

    });

  }


  /* =========================================================
     CLOSE MOBILE MENU WHEN RESIZING
  ========================================================= */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 768 &&
      mobileMenu &&
      mobileMenu.classList.contains("open")
    ) {

      closeMenu();

    }

  });


  /* =========================================================
     SMOOTH ANCHOR SCROLL
  ========================================================= */

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"]:not([href="#"])'
  );

  anchorLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".nav-link"
  );


  if (sections.length && navLinks.length) {

    const navObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          const currentId = entry.target.id;

          navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
              "active",
              href === `#${currentId}`
            );

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
      }
    );


    sections.forEach((section) => {
      navObserver.observe(section);
    });

  }


  /* =========================================================
     FAQ ACCORDION
  ========================================================= */

  const faqQuestions =
    document.querySelectorAll(".faq-question");


  faqQuestions.forEach((question) => {

    question.addEventListener("click", () => {

      const item = question.closest(".faq-item");

      if (!item) {
        return;
      }

      const isOpen =
        item.classList.contains("open");


      /*
       * Close other FAQ items
       */
      document
        .querySelectorAll(".faq-item.open")
        .forEach((openItem) => {

          if (openItem !== item) {

            openItem.classList.remove("open");

            const openQuestion =
              openItem.querySelector(".faq-question");

            if (openQuestion) {

              openQuestion.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          }

        });


      /*
       * Toggle current item
       */
      item.classList.toggle(
        "open",
        !isOpen
      );

      question.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

    });

  });


  /* =========================================================
     WHATSAPP LINKS
  ========================================================= */

  const whatsappLinks =
    document.querySelectorAll(
      'a[href*="wa.me"]'
    );


  const whatsappUrl =
    `https://wa.me/${NEXORA_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      NEXORA_CONFIG.whatsappMessage
    )}`;


  whatsappLinks.forEach((link) => {

    link.setAttribute(
      "href",
      whatsappUrl
    );

  });


  /* =========================================================
     FORM ELEMENTS
  ========================================================= */

  const contactForm =
    document.getElementById("contactForm");

  const submitBtn =
    document.getElementById("submitBtn");

  const formSuccess =
    document.getElementById("formSuccess");

  const formError =
    document.getElementById("formError");


  const fullName =
    document.getElementById("fullName");

  const businessName =
    document.getElementById("businessName");

  const email =
    document.getElementById("email");

  const phone =
    document.getElementById("phone");

  const businessType =
    document.getElementById("businessType");

  const service =
    document.getElementById("service");

  const message =
    document.getElementById("message");


  /* =========================================================
     EMAIL VALIDATION
  ========================================================= */

  function validateEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );

  }


  /* =========================================================
     FIELD VALIDATION
  ========================================================= */

  function checkField(input, condition) {

    if (!input) {
      return true;
    }

    const group =
      input.closest(".form-group");


    if (!group) {
      return condition;
    }


    if (!condition) {

      group.classList.add("has-error");

      return false;

    }


    group.classList.remove("has-error");

    return true;

  }


  function clearFieldError(input) {

    if (!input) {
      return;
    }

    const group =
      input.closest(".form-group");

    if (group) {
      group.classList.remove("has-error");
    }

  }


  /*
   * Clear errors as the user edits fields
   */

  [
    fullName,
    businessName,
    email,
    phone,
    businessType,
    service,
    message
  ].forEach((field) => {

    if (!field) {
      return;
    }

    field.addEventListener("input", () => {
      clearFieldError(field);
    });

    field.addEventListener("change", () => {
      clearFieldError(field);
    });

  });


  /* =========================================================
     FORM SUBMISSION
  ========================================================= */

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        /*
         * Hide previous messages
         */

        if (formSuccess) {
          formSuccess.hidden = true;
        }

        if (formError) {
          formError.hidden = true;
        }


        /*
         * Honeypot protection
         */

        const honeypot =
          document.getElementById(
            "company_website"
          );


        if (
          honeypot &&
          honeypot.value.trim() !== ""
        ) {

          return;

        }


        /*
         * Validation
         */

        const isNameValid =
          checkField(
            fullName,
            fullName &&
            fullName.value.trim().length >= 2
          );


        const isBusinessValid =
          checkField(
            businessName,
            businessName &&
            businessName.value.trim().length >= 2
          );


        const isEmailValid =
          checkField(
            email,
            email &&
            validateEmail(
              email.value.trim()
            )
          );


        const isPhoneValid =
          checkField(
            phone,
            phone &&
            phone.value.trim().length >= 5
          );


        const isBusinessTypeValid =
          checkField(
            businessType,
            businessType &&
            businessType.value !== ""
          );


        const isServiceValid =
          checkField(
            service,
            service &&
            service.value !== ""
          );


        const isMessageValid =
          checkField(
            message,
            message &&
            message.value.trim().length >= 10
          );


        const isValid =
          isNameValid &&
          isBusinessValid &&
          isEmailValid &&
          isPhoneValid &&
          isBusinessTypeValid &&
          isServiceValid &&
          isMessageValid;


        if (!isValid) {

          const firstError =
            contactForm.querySelector(
              ".has-error .form-input, .has-error .form-select, .has-error .form-textarea"
            );

          if (firstError) {
            firstError.focus();
          }

          return;

        }


        /*
         * Form endpoint
         */

        const endpoint =
          contactForm.getAttribute("action") ||
          NEXORA_CONFIG.formEndpoint;


        if (
          !endpoint ||
          endpoint.includes("YOUR_FORM_ID")
        ) {

          if (formError) {

            formError.textContent =
              "The enquiry form is not configured yet. Please contact Nexora through WhatsApp or email.";

            formError.hidden = false;

          }

          return;

        }


        /*
         * Loading state
         */

        if (submitBtn) {

          submitBtn.classList.add(
            "loading"
          );

          submitBtn.disabled = true;

        }


        const buttonText =
          submitBtn
            ? submitBtn.querySelector(".btn-text")
            : null;


        if (buttonText) {
          buttonText.textContent =
            "Sending...";
        }


        try {

          const formData =
            new FormData(contactForm);


          const response =
            await fetch(
              endpoint,
              {
                method: "POST",

                body: formData,

                headers: {
                  Accept:
                    "application/json"
                }
              }
            );


          if (response.ok) {

            contactForm.reset();


            /*
             * Remove validation states
             */

            contactForm
              .querySelectorAll(
                ".has-error"
              )
              .forEach((group) => {

                group.classList.remove(
                  "has-error"
                );

              });


            if (formSuccess) {

              formSuccess.hidden =
                false;

              formSuccess.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
              });

            }

          } else {

            let errorMessage =
              "Submission failed. Please contact Nexora directly through WhatsApp or email.";


            /*
             * Try to read Formspree's
             * JSON error response
             */

            try {

              const data =
                await response.json();

              if (
                data &&
                Array.isArray(data.errors) &&
                data.errors.length
              ) {

                errorMessage =
                  data.errors
                    .map(
                      (error) =>
                        error.message
                    )
                    .join(" ");

              }

            } catch (parseError) {
              /*
               * Keep default error message.
               */
            }


            if (formError) {

              formError.textContent =
                errorMessage;

              formError.hidden =
                false;

            }

          }

        } catch (error) {

          if (formError) {

            formError.textContent =
              "Network error. Please try again or contact Nexora directly through WhatsApp.";

            formError.hidden =
              false;

          }

        } finally {

          if (submitBtn) {

            submitBtn.classList.remove(
              "loading"
            );

            submitBtn.disabled =
              false;

          }


          if (buttonText) {

            buttonText.textContent =
              "Send Project Enquiry";

          }

        }

      }
    );

  }


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".service-card",
        ".project-card",
        ".why-card",
        ".pricing-card",
        ".timeline-item",
        ".tech-item",
        ".faq-item",
        ".contact-form-card",
        ".about-text-col",
        ".about-image-col"
      ].join(", ")
    );


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "reveal",
              "active"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          root: null,

          rootMargin:
            "0px 0px -40px 0px",

          threshold: 0.08
        }
      );


    revealElements.forEach((element) => {

      element.classList.add(
        "reveal"
      );

      revealObserver.observe(
        element
      );

    });

  } else {

    /*
     * Fallback for browsers without
     * IntersectionObserver.
     */

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "reveal",
          "active"
        );

      }
    );

  }


  /* =========================================================
     HEADER SHADOW / BORDER ON SCROLL
  ========================================================= */

  const header =
    document.getElementById("header");


  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 10) {

      header.style.borderBottomColor =
        "rgba(255, 255, 255, 0.12)";

    } else {

      header.style.borderBottomColor =
        "rgba(255, 255, 255, 0.08)";

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  updateHeader();

});

/* =========================
   IMAGE FALLBACKS
   ========================= */

document.querySelectorAll('.project-img').forEach((img) => {
  img.addEventListener('error', () => {
    img.style.display = 'none';

    const fallback = img
      .closest('.project-media')
      ?.querySelector('.media-fallback');

    if (fallback) {
      fallback.hidden = false;
    }
  });
});