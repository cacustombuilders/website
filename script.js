/* =========================================================
   C&A CUSTOM BUILDERS — V5
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     COPYRIGHT YEAR
  ======================================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =======================================================
     HEADER SCROLL STATE
  ======================================================= */

  const siteHeader = document.getElementById("siteHeader");

  const updateHeader = () => {
    if (!siteHeader) return;

    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const openMenu = () => {
    if (!menuButton || !mobileMenu) return;

    menuButton.classList.add("active");
    mobileMenu.classList.add("active");

    menuButton.setAttribute("aria-expanded", "true");

    document.body.classList.add("menu-open");
  };


  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;

    menuButton.classList.remove("active");
    mobileMenu.classList.remove("active");

    menuButton.setAttribute("aria-expanded", "false");

    document.body.classList.remove("menu-open");
  };


  const toggleMenu = () => {
    if (!mobileMenu) return;

    if (mobileMenu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };


  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }


  if (mobileMenu) {

    mobileMenu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {
        closeMenu();
      });

    });

  }


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


  /* =======================================================
     REVEAL ANIMATIONS
  ======================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  if (reduceMotion) {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  } else if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    revealElements.forEach((element, index) => {

      const delay = Math.min((index % 3) * 60, 120);

      element.style.transitionDelay = `${delay}ms`;

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]:not([href="#"])');


  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      const target = document.querySelector(targetId);

      if (!target) return;


      event.preventDefault();


      const headerHeight =
        siteHeader ? siteHeader.offsetHeight : 0;


      const targetTop =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;


      window.scrollTo({
        top: targetTop,
        behavior: reduceMotion ? "auto" : "smooth"
      });

    });

  });


  /* =======================================================
     MOBILE STICKY CTA
  ======================================================= */

  const mobileStickyCta =
    document.getElementById("mobileStickyCta");

  const estimateSection =
    document.getElementById("estimate");


  if (
    mobileStickyCta &&
    estimateSection &&
    "IntersectionObserver" in window
  ) {

    const estimateObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            mobileStickyCta.classList.add("hidden");

          } else {

            mobileStickyCta.classList.remove("hidden");

          }

        });

      },
      {
        threshold: 0.15
      }
    );


    estimateObserver.observe(estimateSection);

  }

});
