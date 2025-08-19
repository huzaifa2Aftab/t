// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      var el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Reveal on scroll
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(function(el) { observer.observe(el); });

// Simple tilt/parallax for cards
function addTiltEffect(el) {
  var bounds = null;
  function reset() {
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(-2px)';
  }
  el.addEventListener('mouseenter', function() { bounds = el.getBoundingClientRect(); });
  el.addEventListener('mousemove', function(e) {
    if (!bounds) bounds = el.getBoundingClientRect();
    var relX = (e.clientX - bounds.left) / bounds.width;
    var relY = (e.clientY - bounds.top) / bounds.height;
    var rotY = (relX - 0.5) * 16;
    var rotX = (0.5 - relY) * 16;
    el.style.transform = 'perspective(800px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg)';
  });
  el.addEventListener('mouseleave', function() { reset(); });
}

document.querySelectorAll('.tilt, .service-card').forEach(function(card) { addTiltEffect(card); });

// Optional: bounce orb subtly with scroll
var orb = document.querySelector('.hero-visual .orb');
if (orb) {
  window.addEventListener('scroll', function() {
    var y = window.scrollY * 0.05;
    orb.style.transform = 'translateY(' + (-10 + y).toFixed(1) + 'px)';
  }, { passive: true });
}

// Count up for clients stat
var countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  document.querySelectorAll('.counter').forEach(function(counter) {
    var target = parseInt(counter.getAttribute('data-count') || '0', 10);
    var current = 0;
    var step = Math.max(1, Math.round(target / 60));
    var timer = setInterval(function() {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      counter.textContent = current.toString();
    }, 20);
  });
}

var clientObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) { if (entry.isIntersecting) { startCounters(); clientObserver.disconnect(); } });
}, { threshold: 0.3 });
var bigstat = document.querySelector('.bigstat');
if (bigstat) { clientObserver.observe(bigstat); }

