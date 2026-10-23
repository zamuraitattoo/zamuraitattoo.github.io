
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    function closeMenu() {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }

    function toggleMenu() {
      const isOpen = nav.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    }

    // Ensure the initial accessibility state is correct.
    menuButton.setAttribute(
      "aria-expanded",
      String(nav.classList.contains("is-open"))
    );
    menuButton.setAttribute(
      "aria-label",
      nav.classList.contains("is-open")
        ? "Close navigation menu"
        : "Open navigation menu"
    );

    menuButton.addEventListener("click", toggleMenu);

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu with Escape.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        menuButton.focus();
      }
    });

    // Close the menu when switching to a desktop-sized layout.
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 769px)").matches) {
        closeMenu();
      }
    });
  }

  // ==========================================
  // 2. BOOKING FORM → WHATSAPP
  // ==========================================
  const bookingForm = document.querySelector("#booking-form");

  if (bookingForm) {
    let isSubmitting = false;

    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Prevent duplicate submissions.
      if (isSubmitting) return;

      // Keep native browser validation.
      if (!bookingForm.reportValidity()) return;

      const formData = new FormData(bookingForm);

      const name = String(formData.get("name") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const date = String(formData.get("date") || "").trim();
      const details = String(formData.get("details") || "").trim();

      // Build the enquiry message.
      const lines = [
        "Hi Zamurai Tattoo! I'd like to enquire about an appointment.",
        "",
        "Name: " + (name || "Not provided"),
        "Phone: " + (phone || "Not provided"),
        "Service: " + (service || "Not specified"),
        "Preferred date: " + (date || "Flexible"),
        "Tattoo placement / details: " + (details || "Not specified")
      ];

      const whatsappURL =
        "https://wa.me/919048169666?text=" +
        encodeURIComponent(lines.join("\n"));

      isSubmitting = true;

      // Track the WhatsApp handoff, not a confirmed appointment.
      let handoffStarted = false;
      let conversionCallbackReceived = false;
      let fallbackTimer;

      function openWhatsApp() {
        if (handoffStarted) return;

        handoffStarted = true;
        window.clearTimeout(fallbackTimer);

        // Release the form lock before leaving the page.
        isSubmitting = false;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
      }

      function releaseSubmissionLock() {
        if (!handoffStarted) {
          isSubmitting = false;
        }
      }

      // Use a fallback so the enquiry can proceed if tracking is slow.
      fallbackTimer = window.setTimeout(function () {
        openWhatsApp();
      }, 1200);

      if (typeof window.gtag === "function") {
        try {
          window.gtag("event", "conversion", {
            send_to: "AW-18496446534/0J6vCIG0iZsdEMbA5fNE",

            event_callback: function () {
              conversionCallbackReceived = true;
              openWhatsApp();
            },

            event_timeout: 1000
          });

          // If the tag doesn't call back, the fallback opens WhatsApp.
        } catch (error) {
          // Tracking errors should not prevent the enquiry.
          console.warn("Google Ads conversion tracking failed.", error);
          openWhatsApp();
        }
      } else {
        openWhatsApp();
      }

      // Avoid leaving the form locked if the browser blocks the popup.
      window.setTimeout(function () {
        if (!conversionCallbackReceived || !handoffStarted) {
          releaseSubmissionLock();
        }
      }, 1800);
    });
  }

  // ==========================================
  // 3. AUTOMATIC COPYRIGHT YEAR
  // ==========================================
  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });
});
