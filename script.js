/* ==========================================================
   C&A CUSTOM BUILDERS
   V2 JAVASCRIPT
========================================================== */


/* ==========================================================
   SITE CONFIGURATION

   ADD THE REAL TALLY URL HERE WHEN READY.

   Example:
   const TALLY_URL = "https://tally.so/r/xxxxxx";
========================================================== */

const TALLY_URL = "";


/* ==========================================================
   ESTIMATE LINKS
========================================================== */

const estimateLinks =
  document.querySelectorAll(".estimate-link");


estimateLinks.forEach((link) => {

  if (TALLY_URL.trim() !== "") {

    link.href = TALLY_URL;
    link.target = "_blank";
    link.rel = "noopener";

  } else {

    link.href = "#estimate";

  }

});


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const menuToggle =
  document.querySelector(".menu-toggle");

const siteNav =
  document.querySelector(".site-nav");


if (menuToggle && siteNav) {

  menuToggle.addEventListener("click", () => {

    const expanded =
      menuToggle.getAttribute("aria-expanded")
      === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!expanded)
    );

    siteNav.classList.toggle(
      "open",
      !expanded
    );

    document.body.classList.toggle(
      "menu-open",
      !expanded
    );

  });


  siteNav
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener("click", () => {

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        siteNav.classList.remove("open");
        document.body.classList.remove("menu-open");

      });

    });

}


/* ==========================================================
   ESCAPE KEY CLOSES MOBILE NAV
========================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      siteNav?.classList.contains("open")
    ) {

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      siteNav.classList.remove("open");
      document.body.classList.remove("menu-open");

      menuToggle.focus();

    }

  }
);


/* ==========================================================
   SCROLL REVEALS
========================================================== */

const revealElements =
  document.querySelectorAll(".reveal");


if (
  "IntersectionObserver"
  in window
) {

  const observer =
    new IntersectionObserver(

      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target
              .classList
              .add("visible");

            observerInstance
              .unobserve(entry.target);

          }

        });

      },

      {
        root: null,
        rootMargin:
          "0px 0px -8% 0px",

        threshold: 0.08
      }

    );


  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* ==========================================================
   MOBILE STICKY CTA

   Hide it while the main estimate section
   is visible so it doesn't compete with
   the primary CTA.
========================================================== */

const mobileCTA =
  document.querySelector(".mobile-cta");

const estimateSection =
  document.querySelector("#estimate");


if (
  mobileCTA &&
  estimateSection &&
  "IntersectionObserver"
  in window
) {

  const estimateObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          mobileCTA.classList.toggle(
            "hidden",
            entry.isIntersecting
          );

        });

      },

      {
        threshold: 0.12
      }

    );


  estimateObserver.observe(
    estimateSection
  );

}


/* ==========================================================
   COPYRIGHT YEAR
========================================================== */

const year =
  document.querySelector("#year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}
