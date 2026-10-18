
document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Booking form: prepare a WhatsApp enquiry
  const bookingForm = document.querySelector("#booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.reportValidity()) return;

      const formData = new FormData(bookingForm);
      const lines = [
        "Hi Zamurai Tattoo! I'd like to enquire about an appointment.",
        "",
        "Name: " + (formData.get("name") || ""),
        "Phone: " + (formData.get("phone") || ""),
        "Service: " + (formData.get("service") || ""),
        "Preferred date: " + (formData.get("date") || "Flexible"),
        "Tattoo placement / details: " + (formData.get("details") || "Not specified")
      ];

      const message = lines.join("\n");
      const whatsappURL =
        "https://wa.me/919048169666?text=" + encodeURIComponent(message);

      // Record a conversion only when the Google tag is available.
      // This tracks the WhatsApp handoff, not a confirmed booking.
      let conversionSent = false;

      function openWhatsApp() {
        if (conversionSent) return;
        conversionSent = true;
        window.open(whatsappURL, "_blank", "noopener,noreferrer");
      }

      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", {
          send_to: "AW-18496446534/0J6vCIG0iZsdEMbA5fNE",
          event_callback: openWhatsApp,
          event_timeout: 1500
        });

        window.setTimeout(openWhatsApp, 1600);
      } else {
        openWhatsApp();
      }
    });
  }
});
