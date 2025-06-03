// script.js - Consolidated scripts from all HTML pages

// ===============================
// Hamburger Menu Toggle
// ===============================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    }
  });
}

// ===============================
// Gallery Auto Switch (index.html)
// ===============================
const galleryImages = document.querySelectorAll(".gallery-image");
let currentIndex = 0;
if (galleryImages.length > 0) {
  function showNextImage() {
    galleryImages.forEach((img) => img.classList.remove("active"));
    galleryImages[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % galleryImages.length;
  }
  showNextImage();
  setInterval(showNextImage, 3000);
}

// ===============================
// FAQ Accordion (faq.html)
// ===============================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
    item.classList.toggle('active');
  });
});

// ===============================
// FAQ Keyboard Accessibility
// ===============================
faqItems.forEach(item => {      
  const question = item.querySelector('.faq-question');
  question.setAttribute('tabindex', '0'); // Make question focusable

  question.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent page scroll on space
      faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
      item.classList.toggle('active');
    }
  });
});


// ===============================
// WhatsApp Form Submit (contact.html)
// ===============================
function sendToWhatsApp() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const message = document.getElementById("message")?.value.trim();
  if (!name || !phone || !message) {
    alert("Please fill in all fields.");
    return;
  }
  const text = `Hello, my name is *${name}*.
Phone: ${phone}

${message}`;
  const encodedMessage = encodeURIComponent(text);
  const whatsappNumber = "919043109734";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
}

// ===============================
// Scroll-Triggered Counter (products.html)
// ===============================
let hasAnimated = false;

function animateCount(id, target, duration = 1500) {
  const el = document.getElementById(id);
  if (!el) return;

  const start = 0;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    el.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  requestAnimationFrame(updateCount);
}

function isVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

window.addEventListener('scroll', () => {
  const banner = document.getElementById('stats-banner');
  if (!hasAnimated && banner && isVisible(banner)) {
    animateCount("kg-counter", 100000, 1800);      // 1.8 sec smooth animation
    animateCount("customers-counter", 3500, 1500); // 1.5 sec smooth animation
    hasAnimated = true;
  }
});
