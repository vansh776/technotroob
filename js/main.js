// Dark Mode Toggle
const modeToggle = document.querySelector('.mode-toggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
}

// Toggle dark mode
modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Save user preference
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Animated Counter
const counters = document.querySelectorAll('.number');
const speed = 200;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if(count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Run counters when in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function checkCounters() {
  counters.forEach(counter => {
    if (isInViewport(counter)) {
      animateCounters();
      window.removeEventListener('scroll', checkCounters);
    }
  });
}

window.addEventListener('scroll', checkCounters);
checkCounters(); // Check on load

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
  testimonials.forEach(testimonial => {
    testimonial.classList.remove('active');
  });
  testimonials[index].classList.add('active');
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.reason-card, .step, .stat');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state for animated elements
  document.querySelectorAll('.reason-card, .step, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run once on load
  animateOnScroll();
});

// Run on scroll
window.addEventListener('scroll', animateOnScroll);

// Form Submission
const toolRequestForm = document.querySelector('.tool-request-form');
if (toolRequestForm) {
  toolRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your suggestion! We\'ll review your tool request.');
    this.reset();
  });
}