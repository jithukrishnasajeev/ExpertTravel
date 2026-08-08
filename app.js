/**
 * EXPERT TRAVEL SOLUTION - V2 Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
  });

  // 2. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Initialize Swiper Carousels
  // Destinations Slider (3D Coverflow or simple slides with gap)
  new Swiper('.destinations-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 30 }
    }
  });

  // Testimonials Slider
  new Swiper('.testi-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // 4. Animated Stats Counter
  const stats = document.querySelectorAll('.stat-num');
  let hasCounted = false;

  const animateStats = () => {
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const duration = 2000; 
      const increment = target / (duration / 16); 
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.innerText = Math.ceil(current) + (target > 1000 ? '+' : '');
          requestAnimationFrame(updateCounter);
        } else {
          stat.innerText = target + (target > 1000 ? '+' : (target === 99 ? '%' : ''));
        }
      };
      updateCounter();
    });
  };

  // Intersection Observer to trigger counting
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        animateStats();
        hasCounted = true;
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // 5. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    const icon = q.querySelector('i');

    q.addEventListener('click', () => {
      const isOpen = a.classList.contains('active');
      
      // Close all others
      document.querySelectorAll('.faq-a').forEach(ans => ans.classList.remove('active'));
      document.querySelectorAll('.faq-q i').forEach(ic => {
        ic.classList.remove('fa-minus');
        ic.classList.add('fa-plus');
      });

      if (!isOpen) {
        a.classList.add('active');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    });
  });
});

// 6. WhatsApp Routing Logic
function openWhatsApp(context) {
  const basePhone = "393205771501";
  const message = `Hello Expert Travel Solution, I would like to inquire about: ${context}.`;
  window.open(`https://wa.me/${basePhone}?text=${encodeURIComponent(message)}`, '_blank');
}

function launchHeroWhatsApp() {
  const dest = document.getElementById('heroDest').value;
  const service = document.getElementById('heroService').value;
  openWhatsApp(`${service} for ${dest}`);
}

// 7. Generate Checklist Logic
window.generateChecklist = function() {
  const origin = document.getElementById('docOrigin').value;
  const dest = document.getElementById('docDest').value;
  const resultBox = document.getElementById('checkResult');
  
  resultBox.style.display = 'block';
  resultBox.innerHTML = `
    <h4 style="color: var(--brand-gold); margin-bottom: 12px; font-size: 1.1rem;">
      <i class="fa-solid fa-check-double"></i> Custom Checklist Generated
    </h4>
    <p style="color: #FFF; font-size: 0.95rem; margin-bottom: 16px;">
      Based on your profile (Applying from <strong>${origin}</strong> for <strong>${dest}</strong>), you require specific financial audits and VFS appointment protocols.
    </p>
    <button class="btn btn-primary" onclick="openWhatsApp('Checklist Verification: ${dest} from ${origin}')" style="padding: 10px 20px; font-size: 0.9rem;">
      <i class="fa-brands fa-whatsapp"></i> Get Full PDF on WhatsApp
    </button>
  `;
}
