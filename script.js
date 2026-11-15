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

  // Dynamic Decap CMS Portfolio Gallery Loader
  const grid = document.getElementById("portfolioGrid");
  if (grid) {
    fetch('/data/gallery.json?v=' + Date.now())
      .then(response => {
        if (!response.ok) return null;
        return response.json();
      })
      .then(data => {
        if (data && data.items && data.items.length > 0) {
          grid.innerHTML = ""; // Clear static placeholder items when CMS data loads
          data.items.forEach(item => {
            let catClass = "realism";
            if (item.style === "Fine Line" || item.style?.includes("Custom")) catClass = "custom";
            if (item.style === "Piercing") catClass = "piercing";

            const card = document.createElement("div");
            card.className = "portfolio-item group rounded-2xl overflow-hidden bg-charcoal border border-white/10";
            card.setAttribute("data-category", catClass);
            
            card.innerHTML = `
              <div class="relative h-80 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div class="absolute bottom-3 left-3 right-3 p-3 rounded-xl glass-panel text-xs">
                  <div class="flex justify-between font-mono text-[10px] text-gold">
                    <span>${item.style ? item.style.toUpperCase() : 'MASTERWORK'}</span>
                    <span>${item.category ? item.category.toUpperCase() : 'FORT KOCHI'}</span>
                  </div>
                  <p class="font-serif text-lg font-bold text-alabaster mt-0.5">${item.title}</p>
                </div>
              </div>
            `;
            grid.appendChild(card);
          });
        }
      })
      .catch(err => {
        console.log("Using static fallback portfolio grid.");
      });
  }
});

// Direct WhatsApp Consultation Dispatch
function sendQuickWhatsApp(customText) {
  const text = customText || "Hi Stevin! I visited zamuraitattoo.com and would like to book a consultation at Zamurai Tattoo & Piercing Studio in Chullikkal, Fort Kochi.";
  window.open(`https://wa.me/919048169666?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}
