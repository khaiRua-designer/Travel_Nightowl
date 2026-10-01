document.addEventListener('DOMContentLoaded', () => {
const decryptTargets = document.querySelectorAll('.cyber-decrypt');
const glyphs = 'ABCDEF0123456789!@#$%^&*<>_+-~/[]{}';
const runDecrypt = (el) => {
  if (el.dataset.running === 'true') return;
  el.dataset.running = 'true';

  if (!el.dataset.original) {
    el.dataset.original = el.innerText.trim();
  }
  const originalText = el.dataset.original;
  let iteration = 0;

  const interval = setInterval(() => {
    el.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (letter === ' ') return ' ';
        if (index < iteration) {
          return originalText[index];
        }
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join('');

    if (iteration >= originalText.length) {
      clearInterval(interval);
      el.innerText = originalText;
      el.dataset.running = 'false';
    }

    iteration += 1 / 2;
  }, 35);
};
const observerOptions = {
  root: null,
  threshold: 0.3
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runDecrypt(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
decryptTargets.forEach((el) => {
  scrollObserver.observe(el);
  el.addEventListener('mouseenter', () => {
    runDecrypt(el);
  });
});
  const tourCards = document.querySelectorAll('.tour-box');

  tourCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.12), #121622 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '#121622';
    });
  });

  const header = document.querySelector('header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.backgroundColor = 'rgba(7, 8, 12, 0.96)';
        header.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.25)';
        header.style.borderBottom = '1px solid #00f0ff';
      } else {
        header.style.backgroundColor = 'rgba(11, 13, 20, 0.95)';
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid rgba(0, 240, 255, 0.3)';
      }
    });
  }

  const countdownBox = document.querySelector('.hero-badge');

  if (countdownBox) {
    let targetTime = new Date().getTime() + 6 * 60 * 60 * 1000;

    setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownBox.innerHTML = `<i class="ri-flashlight-line"></i> SĂN VÉ ĐÊM: ${hours}h ${minutes}m ${seconds}s`;
      } else {
        countdownBox.innerHTML = '<i class="ri-radar-line"></i> 24/7 OPEN';
      }
    }, 1000);
  }
  const asideLinks = document.querySelectorAll('aside ul li a');

  asideLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      asideLinks.forEach((l) => (l.style.color = '#94a3b8'));
      link.style.color = '#ff007f';
      tourCards.forEach((card) => {
        card.style.opacity = '0.3';
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 200);
      });
    });
  });
  const navLinks = document.querySelectorAll('.menu ul li a');

  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});