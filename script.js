/**
 * Shijnas Yunus Portfolio Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     STICKY HEADER & ACTIVE SECTION NAV LINKS
     ========================================================================== */
  const header = document.querySelector('.glass-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add scrolled class to header
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    } else {
      header.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    }

    // Scroll active link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

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

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.nav-link, .nav-btn-mobile');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     COPY TO CLIPBOARD UTILITY
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-clipboard');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const textToCopy = targetEl.textContent.trim();
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            // Visual success feedback
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
            setTimeout(() => {
              btn.innerHTML = originalHTML;
            }, 2000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      }
    });
  });

  /* ==========================================================================
     INTERACTIVE BUG SIMULATOR
     ========================================================================== */
  const reproduceBtn = document.getElementById('reproduce-btn');
  const simScene = document.getElementById('sim-scene');
  const consoleLogs = document.getElementById('console-logs');
  const viewportIndicator = document.querySelector('.viewport-dot');
  const actionIndicator = document.getElementById('action-indicator');
  
  // Bug Steps Elements
  const step1 = document.getElementById('sim-step-1');
  const step2 = document.getElementById('sim-step-2');
  const step3 = document.getElementById('sim-step-3');
  const step4 = document.getElementById('sim-step-4');
  const bugSteps = [step1, step2, step3, step4];

  if (reproduceBtn && simScene) {
    reproduceBtn.addEventListener('click', () => {
      if (reproduceBtn.classList.contains('disabled')) return;
      
      runBugSimulation();
    });
  }

  function runBugSimulation() {
    // Disable button
    reproduceBtn.classList.add('disabled');
    reproduceBtn.disabled = true;
    const btnText = reproduceBtn.querySelector('.btn-text');
    btnText.textContent = "SIMULATION RUNNING...";

    // Reset simulator UI & classes
    simScene.className = 'sim-scene-idle';
    viewportIndicator.className = 'viewport-dot green';
    viewportIndicator.style.color = '#10b981';
    actionIndicator.textContent = "INITIALIZING ENVIRONMENT...";
    actionIndicator.style.color = 'var(--neon-cyan)';
    
    bugSteps.forEach(step => {
      if (step) {
        step.style.color = '';
        step.style.fontWeight = '';
      }
    });

    consoleLogs.innerHTML = `<div class="log-line text-muted">[System] QA Sandbox loaded...</div>`;

    const addLog = (text, type = 'muted') => {
      let classText = 'text-muted';
      if (type === 'active') classText = 'active-log';
      if (type === 'error') classText = 'error-log';
      
      const line = document.createElement('div');
      line.className = `log-line ${classText}`;
      line.textContent = text;
      consoleLogs.appendChild(line);
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
    };

    // Step 1 Execution (1000ms delay)
    setTimeout(() => {
      simScene.className = 'sim-scene-running-1';
      actionIndicator.textContent = "STEP 1: SPAWN VEHICLE";
      addLog("[QA Console] Command executed: /spawn standard_sedan", 'active');
      addLog("[QA Console] Sedan spawned successfully [ID: 80492].", 'muted');
      if (step1) {
        step1.style.color = 'var(--neon-cyan)';
        step1.style.fontWeight = 'bold';
      }
      
      // Step 2 Execution (2200ms delay)
      setTimeout(() => {
        simScene.className = 'sim-scene-running-2';
        actionIndicator.textContent = "STEP 2: POSITION PLAYER";
        addLog("[QA Console] Moving player model adjacent to door [Driver Side].", 'active');
        if (step1) step1.style.color = 'rgba(0, 242, 254, 0.4)';
        if (step2) {
          step2.style.color = 'var(--neon-cyan)';
          step2.style.fontWeight = 'bold';
        }

        // Step 3 Execution (3400ms delay)
        setTimeout(() => {
          simScene.className = 'sim-scene-running-3';
          actionIndicator.textContent = "STEP 3: MASH ENTER KEY";
          addLog("[QA Console] Simulating inputs: Key[F] pressed repeatedly (x5)...", 'active');
          if (step2) step2.style.color = 'rgba(0, 242, 254, 0.4)';
          if (step3) {
            step3.style.color = 'var(--neon-cyan)';
            step3.style.fontWeight = 'bold';
          }

          // Step 4 Execution (4600ms delay)
          setTimeout(() => {
            simScene.className = 'sim-scene-running-4';
            viewportIndicator.className = 'viewport-dot red';
            viewportIndicator.style.color = '#ef4444';
            actionIndicator.textContent = "ERROR ENCOUNTERED";
            actionIndicator.style.color = 'var(--error)';
            
            addLog("[ERROR] Animation playback index lock exception at frame 34.", 'error');
            addLog("[ERROR] Player physics state set to KINEMATIC. Controls blocked.", 'error');
            addLog("[System] QA reproduction completed. Bug 100% verified.", 'active');
            
            if (step3) step3.style.color = 'rgba(0, 242, 254, 0.4)';
            if (step4) {
              step4.style.color = 'var(--error)';
              step4.style.fontWeight = 'bold';
            }

            // Restore button
            reproduceBtn.classList.remove('disabled');
            reproduceBtn.disabled = false;
            btnText.textContent = "RE-RUN SIMULATION";
          }, 1500);

        }, 1200);

      }, 1200);

    }, 1000);
  }

});
