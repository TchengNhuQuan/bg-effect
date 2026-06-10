const config = {
  ashes: {
    count: 500,
    minSize: 3,
    maxSize: 7,
    minDuration: 5,
    maxDuration: 10,
    minDelay: 0,
    maxDelay: 10,
  },
  smokes: {
    count: 15,
    minSize: 200,
    maxSize: 280,
    minDuration: 6,
    maxDuration: 10,
    minDelay: 0,
    maxDelay: 5,
  },
  leaves: {
    leafCount: 15,
    animationDuration: 5,
    minDelay: 0,
    maxDelay: 5,
  },
  lines: {
    count: 10,
    baseLeft: 42,
    spacing: 15,
    startOffset: -30,
    rotate: -30,
    animationDuration: 4,
    baseDelay: 2,
    delayIncrement: 0.5,
  },
};

// ── Elements ──────────────────────────────────────────────
const customEffectBtn = document.getElementById('customEffectBtn');
const modalOverlay = document.getElementById('modalOverlay');
const btnCloseModal = document.getElementById('btnCloseModal');
const settingsCard = document.getElementById('settingsCard');
const mainBackground = document.getElementById('mainBackground');
const mainHeading = document.getElementById('mainHeading');
const sidebar = document.getElementById('sidebar');
const customHex = document.getElementById('customHex');
const bgSelect = document.getElementById('bgSelect');
const efSelect = document.getElementById('efSelect');
const effectContainer = document.getElementById('effectContainer');
// ── State ─────────────────────────────────────────────────
let currentTheme = 'light';
let currentAccent = '#79b533';
let currentFont = 'sans';
let currentBg = 'bg-1';

// ── Helpers ───────────────────────────────────────────────
function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// ── Apply accent color ────────────────────────────────────
function applyAccent(color) {
  if (!isValidHex(color)) return;
  currentAccent = color;
  document.documentElement.style.setProperty('--accent', color);
  customHex.value = color;
}

// ── Apply background ──────────────────────────────────────
const bgClasses = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6'];
function applyBg(bgClass) {
  currentBg = bgClass;
  bgClasses.forEach((c) => mainBackground.classList.remove(c));
  mainBackground.classList.add(bgClass);
}

// ── Modal open/close ──────────────────────────────────────
customEffectBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
});
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.style.display = 'none';
});
btnCloseModal.addEventListener('click', () => {
  modalOverlay.style.display = 'none';
});

// ── Swatch clicks ─────────────────────────────────────────
document.querySelectorAll('.swatch').forEach((swatch) => {
  swatch.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
    swatch.classList.add('active');
    applyAccent(swatch.dataset.color);
  });
});

// ── Custom hex input ──────────────────────────────────────
customHex.addEventListener('input', () => {
  const val = customHex.value.trim();
  if (isValidHex(val)) {
    document.querySelectorAll('.swatch').forEach((s) => s.classList.remove('active'));
    applyAccent(val);
  }
});

customHex.addEventListener('blur', () => {
  let val = customHex.value.trim();
  if (!val.startsWith('#')) val = '#' + val;
  if (!isValidHex(val)) customHex.value = currentAccent;
});

// ── Font button clicks ────────────────────────────────────
document.querySelectorAll('.font-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.font-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFont(btn.dataset.font);
  });
});

// ── Background select ─────────────────────────────────────
bgSelect.addEventListener('change', () => {
  applyBg(bgSelect.value);
});

// ── Snow effect ───────────────────────────────────────────
efSelect.addEventListener('change', () => {
  effectContainer.innerHTML = '';
  const ef = efSelect.value;

  if (ef === 'ef-1') {
    initSmoke(config.smokes);
  } else if (ef === 'ef-2') {
    createSnowflake();
  } else if (ef === 'ef-4') {
    initLeaves(config.leaves);
  } else if (ef === 'ef-7') {
    createAshFlake();
  } else if (ef === 'ef-3') {
    initClouds();
  } else if (ef === 'ef-5') {
    initShootingStar(config.lines);
  } else if (ef === 'ef-6') {
    initOcean();
  } else if (ef === 'ef-8') {
    initSpaceShip();
  }
});

// ── Bootstrap tooltips ────────────────────────────────────
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
[...tooltipTriggerList].map((el) => new bootstrap.Tooltip(el));
