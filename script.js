/* ==========================================================================
   ZAMURAI TATTOO & PIERCING STUDIO — GLOBAL INTERACTION CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for smooth scroll reveals
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // Mobile Menu Drawer Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }
});

// Direct WhatsApp Consultation Dispatch
function sendQuickWhatsApp(customText) {
  const text = customText || "Hi Stevin! I visited zamuraitattoo.com and would like to book a consultation at Zamurai Tattoo & Piercing Studio in Chullikkal, Fort Kochi.";
  window.open(`https://wa.me/919048169666?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}
