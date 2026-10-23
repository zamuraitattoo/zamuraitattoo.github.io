document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const navLinks = document.getElementById('navLinks');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', event => {
      event.preventDefault();
      const form = new FormData(bookingForm);
      const message = [
        'Hi Zamurai Tattoo! I’d like to enquire about an appointment.',
        `Name: ${form.get('name') || ''}`,
        `Phone: ${form.get('phone') || ''}`,
        `Interested in: ${form.get('service') || 'Not sure yet'}`,
        `Placement: ${form.get('placement') || 'Not decided'}`,
        `Preferred date: ${form.get('date') || 'Flexible'}`,
        `Idea: ${form.get('idea') || 'I’d like to discuss my idea'}`
      ].join('\\n');
      window.open('https://wa.me/919048169666?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
    });
  }
});
