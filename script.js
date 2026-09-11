// C&A Custom Builders — V3


// MOBILE NAVIGATION

const navToggle =
  document.querySelector(".nav-toggle");

const nav =
  document.querySelector(".site-nav");

const navLinks =
  document.querySelectorAll(".site-nav a");


if (navToggle && nav) {

  navToggle.addEventListener("click", () => {

    const open =
      navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute(
      "aria-expanded",
      String(!open)
    );

    nav.classList.toggle(
      "is-open",
      !open
    );

  });


  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      nav.classList.remove("is-open");

      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        nav.classList.remove("is-open");

        navToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

}



// SCROLL REVEALS

const revealItems =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.10,
        rootMargin:
          "0px 0px -35px 0px"
      }

    );


  revealItems.forEach((item) => {

    revealObserver.observe(item);

  });


} else {

  revealItems.forEach((item) => {

    item.classList.add(
      "is-visible"
    );

  });

}



// MOBILE ESTIMATE BUTTON

const mobileEstimate =
  document.querySelector(".mobile-estimate");

const estimateSection =
  document.querySelector("#estimate");


if (
  mobileEstimate &&
  estimateSection &&
  "IntersectionObserver" in window
) {

  const estimateObserver =
    new IntersectionObserver(

      ([entry]) => {

        mobileEstimate.classList.toggle(
          "is-hidden",
          entry.isIntersecting
        );

      },

      {
        threshold: 0.2
      }

    );


  estimateObserver.observe(
    estimateSection
  );

}



// COPYRIGHT YEAR

const year =
  document.querySelector("#year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}
