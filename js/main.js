document.addEventListener('DOMContentLoaded', () => {
  // 1. Number Counter Animation
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-counter');
    let count = 0;
    const step = Math.max(5, Math.floor(target / 40));

    const updateCounter = () => {
      count += step;
      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCounter, 25);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });

  // 2. Interactive Google Ads Offer Configurator
  const verticalButtons = document.querySelectorAll('#verticalButtons .choice-btn');
  const placementButtons = document.querySelectorAll('#placementButtons .choice-btn');
  const geoButtons = document.querySelectorAll('#geoButtons .choice-btn');
  const statusMessage = document.getElementById('statusMessage');
  const outputScreen = document.getElementById('outputScreen');
  const dynamicTgBtn = document.getElementById('dynamicTgBtn');

  let state = {
    vertical: 'Crypto / Web3 / Fintech',
    placement: 'Google Search (Поиск)',
    geo: 'Tier 1 (US, CA, UK, EU)'
  };

  function setupMatrix(buttons, key) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state[key] = btn.getAttribute('data-val');
        updateScreen();
      });
    });
  }

  setupMatrix(verticalButtons, 'vertical');
  setupMatrix(placementButtons, 'placement');
  setupMatrix(geoButtons, 'geo');

  function updateScreen() {
    statusMessage.innerHTML = `По направлению <strong>${state.vertical}</strong> через плейсмент <strong>${state.placement}</strong> в ГЕО <strong>${state.geo}</strong> инфраструктура активна. Готовы принять бриф и согласовать тест в течение 2–4 часов.`;

    // Subtle feedback animation
    outputScreen.style.transition = 'transform 0.15s ease, border-color 0.15s ease';
    outputScreen.style.transform = 'scale(1.008)';
    outputScreen.style.borderColor = '#ff007a';
    setTimeout(() => {
      outputScreen.style.transform = 'scale(1)';
    }, 150);
  }
});
