(() => {

  const menuToggle =
    document.querySelector(".menu-toggle");

  const primaryNav =
    document.querySelector(".primary-nav");

  const yearEl =
    document.querySelector("#year");

  const tallyLink =
    document.querySelector("#tally-link");

  const estimateLinks =
    document.querySelectorAll("[data-estimate-link]");


  /*
  ==========================================
  TALLY FORM
  ==========================================

  REPLACE THE BLANK VALUE BELOW WITH
  THE REAL TALLY URL.

  EXAMPLE:

  const TALLY_URL =
  "https://tally.so/r/XXXXXXXX";

  */

  const TALLY_URL = "";


  /*
  ==========================================
  COPYRIGHT YEAR
  ==========================================
  */

  if (yearEl) {

    yearEl.textContent =
      new Date().getFullYear();

  }


  /*
  ==========================================
  MOBILE NAVIGATION
  ==========================================
  */

  if (menuToggle && primaryNav) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          menuToggle.getAttribute(
            "aria-expanded"
          ) === "true";


        menuToggle.setAttribute(
          "aria-expanded",
          String(!isOpen)
        );


        menuToggle.setAttribute(
          "aria-label",
          isOpen
            ? "Open menu"
            : "Close menu"
        );


        menuToggle.classList.toggle(
          "is-open",
          !isOpen
        );


        primaryNav.classList.toggle(
          "is-open",
          !isOpen
        );

      }
    );


    primaryNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

            menuToggle.setAttribute(
              "aria-label",
              "Open menu"
            );

            menuToggle.classList.remove(
              "is-open"
            );

            primaryNav.classList.remove(
              "is-open"
            );

          }
        );

      });

  }


  /*
  ==========================================
  ESTIMATE / TALLY LINKS
  ==========================================
  */

  if (TALLY_URL) {

    if (tallyLink) {

      tallyLink.href =
        TALLY_URL;

    }


    estimateLinks.forEach(
      (link) => {

        link.href =
          TALLY_URL;

        link.target =
          "_blank";

        link.rel =
          "noopener noreferrer";

      }
    );

  }

  else if (tallyLink) {

    tallyLink.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        alert(
          "Tally form placeholder: add your real Tally URL in script.js when it is ready."
        );

      }
    );

  }


  /*
  ==========================================
  SCROLL REVEAL ANIMATIONS
  ==========================================
  */

  const revealItems =
    document.querySelectorAll(
      ".reveal"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(

        (
          entries,
          observerInstance
        ) => {

          entries.forEach(
            (entry) => {

              if (entry.isIntersecting) {

                entry.target.classList.add(
                  "is-visible"
                );

                observerInstance.unobserve(
                  entry.target
                );

              }

            }
          );

        },

        {
          threshold: 0.12,

          rootMargin:
            "0px 0px -40px 0px"
        }

      );


    revealItems.forEach(
      (item) => {

        observer.observe(item);

      }
    );

  }

  else {

    revealItems.forEach(
      (item) => {

        item.classList.add(
          "is-visible"
        );

      }
    );

  }

})();
