document.addEventListener("DOMContentLoaded", () => {

  /*
   * NEXORA CONFIGURATION
   * Change these values here if your contact details ever change.
   */

  const CONFIG = {
    whatsappNumber: "971558311047",

    whatsappMessage:
      "Hi Nexora, I'd like to discuss a website project for my business.",

    email: "hakimwebsites.ug@gmail.com"
  };


  /* =========================
     CONTACT URLS
  ========================== */

  const whatsappUrl =
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
      CONFIG.whatsappMessage
    )}`;


  document.querySelectorAll(
    'a[href^="https://wa.me/"]'
  ).forEach((link) => {
    link.href = whatsappUrl;
  });


  document.querySelectorAll(
    'a[href^="mailto:"]'
  ).forEach((link) => {
    link.href = `mailto:${CONFIG.email}`;
  });


  /* =========================
     HEADER SCROLL EFFECT
  ========================== */

  const header = document.getElementById("header");


  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };


  handleHeaderScroll();

  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
  );


  /* =========================
     MOBILE NAVIGATION
  ========================== */

  const mobileToggle =
    document.getElementById("mobileToggle");

  const mobileMenu =
    document.getElementById("mobileMenu");

  const mobileLinks =
    document.querySelectorAll(".mobile-link");


  const closeMobileMenu = () => {

    if (!mobileMenu || !mobileToggle) return;

    mobileMenu.classList.remove("open");

    mobileToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove("menu-open");

  };


  const openMobileMenu = () => {

    if (!mobileMenu || !mobileToggle) return;

    mobileMenu.classList.add("open");

    mobileToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileToggle.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("menu-open");

  };


  if (mobileToggle) {

    mobileToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileMenu?.classList.contains("open");

        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }

      }
    );

  }


  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 900) {
        closeMobileMenu();
      }

    }
  );


  /* =========================
     ESCAPE KEY
  ========================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMobileMenu();
      }

    }
  );


  /* =========================
     SCROLL REVEAL
  ========================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("active");
    });

  }


  /* =========================
     ACTIVE NAVIGATION
  ========================== */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-link"
    );


  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const id =
              entry.target.getAttribute("id");

            navLinks.forEach((link) => {

              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${id}`
              );

            });

          });

        },
        {
          threshold: 0.25,
          rootMargin: "-20% 0px -65% 0px"
        }
      );


    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

  }


  /* =========================
     FAQ ACCORDION
  ========================== */

  const faqQuestions =
    document.querySelectorAll(
      ".faq-question"
    );


  faqQuestions.forEach((question) => {

    question.addEventListener(
      "click",
      () => {

        const item =
          question.closest(".faq-item");

        if (!item) return;

        const isOpen =
          item.classList.contains("open");


        document
          .querySelectorAll(".faq-item.open")
          .forEach((openItem) => {

            if (openItem !== item) {

              openItem.classList.remove("open");

              const openButton =
                openItem.querySelector(".faq-question");

              if (openButton) {
                openButton.setAttribute(
                  "aria-expanded",
                  "false"
                );
              }

            }

          });


        item.classList.toggle(
          "open",
          !isOpen
        );

        question.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );

      }
    );

  });


  /* =========================
     IMAGE FALLBACKS
  ========================== */

  document
    .querySelectorAll(".project-img")
    .forEach((image) => {

      const fallback =
        image
          .closest(".project-media")
          ?.querySelector(".media-fallback");


      const showFallback = () => {

        image.style.display = "none";

        if (fallback) {
          fallback.hidden = false;
        }

      };


      image.addEventListener(
        "error",
        showFallback
      );


      /*
       * Handles cached/failed images.
       */

      if (
        image.complete &&
        image.naturalWidth === 0
      ) {
        showFallback();
      }

    });


  /* =========================
     STUDIO IMAGE FALLBACK
  ========================== */

  document
    .querySelectorAll(".studio-img")
    .forEach((image) => {

      const fallback =
        image
          .closest(".studio-placeholder")
          ?.querySelector(".studio-fallback");


      const showFallback = () => {

        image.style.display = "none";

        if (fallback) {
          fallback.hidden = false;
        }

      };


      image.addEventListener(
        "error",
        showFallback
      );


      if (
        image.complete &&
        image.naturalWidth === 0
      ) {
        showFallback();
      }

    });


  /* =========================
     FORM VALIDATION
  ========================== */

  const form =
    document.getElementById("contactForm");

  const submitButton =
    document.getElementById("submitBtn");

  const successMessage =
    document.getElementById("formSuccess");

  const errorMessage =
    document.getElementById("formError");


  if (!form) return;


  const getFieldGroup = (field) =>
    field.closest(".form-group");


  const setInvalid = (
    field,
    invalid = true
  ) => {

    const group =
      getFieldGroup(field);

    if (!group) return;

    group.classList.toggle(
      "invalid",
      invalid
    );

  };


  const validateField = (field) => {

    if (!field) return true;


    const value =
      field.value.trim();


    if (
      field.required &&
      !value
    ) {

      setInvalid(field, true);

      return false;

    }


    if (
      field.type === "email" &&
      value
    ) {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailRegex.test(value)) {

        setInvalid(field, true);

        return false;

      }

    }


    if (
      field.minLength > 0 &&
      value.length < field.minLength
    ) {

      setInvalid(field, true);

      return false;

    }


    setInvalid(field, false);

    return true;

  };


  const fields =
    form.querySelectorAll(
      "input:not([type='hidden']):not([type='text'][name='_gotcha']), select, textarea"
    );


  fields.forEach((field) => {

    field.addEventListener(
      "blur",
      () => validateField(field)
    );


    field.addEventListener(
      "input",
      () => {

        if (
          getFieldGroup(field)?.classList.contains(
            "invalid"
          )
        ) {
          validateField(field);
        }

      }
    );


    field.addEventListener(
      "change",
      () => validateField(field)
    );

  });


  /* =========================
     FORM SUBMISSION
  ========================== */

  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      if (successMessage) {
        successMessage.hidden = true;
      }

      if (errorMessage) {
        errorMessage.hidden = true;
      }


      /*
       * Honeypot protection.
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


      let formIsValid = true;


      fields.forEach((field) => {

        if (!validateField(field)) {
          formIsValid = false;
        }

      });


      if (!formIsValid) {

        const firstInvalid =
          form.querySelector(
            ".form-group.invalid .form-input, .form-group.invalid .form-select, .form-group.invalid .form-textarea"
          );


        if (firstInvalid) {
          firstInvalid.focus();
        }

        return;

      }


      if (submitButton) {

        submitButton.disabled = true;

        submitButton.classList.add(
          "is-loading"
        );

      }


      try {

        const formData =
          new FormData(form);


        const response =
          await fetch(
            form.action,
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json"
              }
            }
          );


        if (!response.ok) {
          throw new Error(
            "Form submission failed."
          );
        }


        form.reset();


        form.querySelectorAll(
          ".form-group.invalid"
        ).forEach((group) => {
          group.classList.remove("invalid");
        });


        if (successMessage) {
          successMessage.hidden = false;
        }


        if (errorMessage) {
          errorMessage.hidden = true;
        }


        successMessage?.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });


      } catch (error) {

        if (successMessage) {
          successMessage.hidden = true;
        }

        if (errorMessage) {
          errorMessage.hidden = false;
        }

      } finally {

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.classList.remove(
            "is-loading"
          );

        }

      }

    }
  );


  /* =========================
     CURRENT YEAR
  ========================== */

  const year =
    document.getElementById(
      "current-year"
    );


  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =========================
     SMOOTH ANCHOR FALLBACK
  ========================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(targetId);


          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

});