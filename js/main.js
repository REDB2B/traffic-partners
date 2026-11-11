document.addEventListener('DOMContentLoaded', () => {
  // 1. Animated Numbers Counter
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-counter');
    let count = 0;
    const speed = Math.max(10, Math.floor(target / 40));

    const updateCount = () => {
      count += speed;
      if (count < target) {
        counter.innerText = count;
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });

  // 2. Interactive Offer Matcher Logic
  const rolePills = document.querySelectorAll('#rolePills .pill');
  const sourcePills = document.querySelectorAll('#sourcePills .pill');
  const geoPills = document.querySelectorAll('#geoPills .pill');
  const resultText = document.getElementById('resultText');
  const customCtaBtn = document.getElementById('customCtaBtn');

  let state = {
    role: 'Трафик под свой оффер',
    source: 'Meta (FB/Insta)',
    geo: 'Tier 1 (US, CA, UK, EU)'
  };

  function setupPillGroup(pills, stateKey) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state[stateKey] = pill.innerText;
        updateMatcherResponse();
      });
    });
  }

  setupPillGroup(rolePills, 'role');
  setupPillGroup(sourcePills, 'source');
  setupPillGroup(geoPills, 'geo');

  function updateMatcherResponse() {
    resultText.innerHTML = `Готовы оперативно обработать запрос: <strong>${state.role}</strong> по источнику <strong>${state.source}</strong> в направлении <strong>${state.geo}</strong>. Команда на связи, тестовые капы согласуются без бюрократии.`;
    
    // Smooth pulse animation on update
    const resultBox = document.getElementById('matcherResult');
    resultBox.style.transition = 'transform 0.15s ease';
    resultBox.style.transform = 'scale(1.01)';
    setTimeout(() => {
      resultBox.style.transform = 'scale(1)';
    }, 150);
  }

  // 3. Simulated Live Terminal Stream
  const terminalLogs = document.getElementById('terminalLogs');
  const sampleLogs = [
    { type: 'text-info', msg: 'STREAM_SYNC: Incoming stream routed through Cloudflare edge (14ms)' },
    { type: 'text-success', msg: 'CHECKOUT_EVENT: Conversion registered. Payout verified (USDT)' },
    { type: 'text-warning', msg: 'TRAFFIC_SURGE: Volume spike detected on Meta cluster (+34%)' },
    { type: 'text-info', msg: 'POSTBACK_API: Status 200 OK — Delivered to advertiser Keitaro' },
    { type: 'text-success', msg: 'OFFER_STATUS: Cap refreshed for Tier-1 campaigns' },
    { type: 'text-muted', msg: 'HEALTH_CHECK: All 8 tracking nodes operating at 99.98% efficiency' }
  ];

  let logIndex = 0;
  setInterval(() => {
    if (logIndex >= sampleLogs.length) logIndex = 0;
    const logItem = sampleLogs[logIndex];
    const now = new Date();
    const timeStr = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;

    const line = document.createElement('div');
    line.className = `log-line ${logItem.type}`;
    line.innerText = `${timeStr} ${logItem.msg}`;

    terminalLogs.appendChild(line);

    // Keep only last 8 lines
    if (terminalLogs.children.length > 8) {
      terminalLogs.removeChild(terminalLogs.children[0]);
    }

    logIndex++;
  }, 3800);

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // 5. Copy Telegram to Clipboard
  const copyBtn = document.getElementById('copyTgBtn');
  const toast = document.getElementById('toast');
  const copyBtnText = document.getElementById('copyBtnText');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const handle = copyBtn.getAttribute('data-copy');
      const textToCopy = handle.startsWith('@') ? handle : `@${handle}`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Скопировано: ${textToCopy}`);
        copyBtnText.innerText = 'Скопировано!';
        setTimeout(() => {
          copyBtnText.innerText = `Скопировать ${textToCopy}`;
        }, 2000);
      }).catch(() => {
        showToast('Не удалось скопировать контакт');
      });
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});
