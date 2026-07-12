/**
 * Liquid Glass UI/UX Portfolio Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    const navLinks = document.querySelectorAll('.nav-link, .nav-btn-mobile');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     ACTIVE NAVIGATION LINK STATE
     ========================================================================== */
  const sections = document.querySelectorAll('section');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     INTERACTIVE DESIGN SANDBOX
     ========================================================================== */
  // Slider Controls
  const blurSlider = document.getElementById('blur-slider');
  const opacitySlider = document.getElementById('opacity-slider');
  const speedSlider = document.getElementById('speed-slider');
  
  // Slider Values Displays
  const blurVal = document.getElementById('blur-val');
  const opacityVal = document.getElementById('opacity-val');
  const speedVal = document.getElementById('speed-val');
  
  // Spec Metric Metrics
  const specBlur = document.getElementById('spec-blur');
  const specOpacity = document.getElementById('spec-opacity');
  
  // Target Elements
  const sandboxGlassCard = document.getElementById('sandbox-glass-card');
  const sandboxBlob = document.getElementById('sandbox-blob');
  
  // Color Picker Buttons
  const colorBtns = document.querySelectorAll('.color-btn');

  // 1. Blur Slider Update
  if (blurSlider) {
    blurSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      blurVal.textContent = `${val}px`;
      specBlur.textContent = `${val}px`;
      // Update custom property
      sandboxGlassCard.style.setProperty('--glass-blur', `${val}px`);
    });
  }

  // 2. Opacity Slider Update
  if (opacitySlider) {
    opacitySlider.addEventListener('input', (e) => {
      const val = (e.target.value / 100).toFixed(2);
      opacityVal.textContent = val;
      specOpacity.textContent = val;
      // Update custom property
      sandboxGlassCard.style.setProperty('--glass-opacity', val);
    });
  }

  // 3. Speed Slider Update
  if (speedSlider) {
    speedSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      speedVal.textContent = `${val}s`;
      // Update anim drift speed
      sandboxBlob.style.animationDuration = `${val}s`;
    });
  }

  // 4. Liquid Core Color Theme Picker
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from other buttons
      colorBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked button
      btn.classList.add('active');
      
      const gradientVal = btn.getAttribute('data-gradient');
      // Update gradient on custom elements
      document.documentElement.style.setProperty('--liquid-gradient', gradientVal);
    });
  });

});
