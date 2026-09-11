/* ============================================================
   C&A CUSTOM BUILDERS — V4
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     COPYRIGHT YEAR
     ========================================================== */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ==========================================================
     MOBILE NAVIGATION
     ========================================================== */

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  function closeMenu() {

    if (!navToggle || !mainNav) return;

    navToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");

  }


  function openMenu() {

    if (!navToggle || !mainNav) return;

    navToggle.setAttribute("aria-expanded", "true");
    mainNav.classList.add("is-open");
    document.body.classList.add("menu-open");

  }


  if (navToggle && mainNav) {

    navToggle.addEventListener("click", () => {

      const isOpen =
        navToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    mainNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });


    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 900) {
        closeMenu();
      }

    });

  }


  /* ==========================================================
     SCROLL REVEALS
     ========================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  } else if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        });

      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* ==========================================================
     MOBILE STICKY ESTIMATE CTA
     Hide while primary estimate section is visible
     ========================================================== */

  const estimateSection =
    document.querySelector("#estimate");

  const mobileEstimate =
    document.querySelector(".mobile-estimate");


  if (
    estimateSection &&
    mobileEstimate &&
    "IntersectionObserver" in window
  ) {

    const estimateObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            mobileEstimate.classList.toggle(
              "is-hidden",
              entry.isIntersecting
            );

          });

        },
        {
          threshold: 0.1
        }
      );


    estimateObserver.observe(estimateSection);

  }


  /* ==========================================================
     INTERNAL ANCHOR SCROLL OFFSET
     ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

      anchor.addEventListener("click", (event) => {

        const targetId =
          anchor.getAttribute("href");

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


        const header =
          document.querySelector(".site-header");

        const headerHeight =
          header ? header.offsetHeight : 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          12;


        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion
            ? "auto"
            : "smooth"
        });

      });

    });

});
