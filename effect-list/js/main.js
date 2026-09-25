// ── Config for effects ─────────────────────────────────
const config = {
  ashes: { count: 500, minSize: 3, maxSize: 7, minDuration: 5, maxDuration: 10, minDelay: 0, maxDelay: 10 },
  smokes: { count: 15, minSize: 200, maxSize: 280, minDuration: 6, maxDuration: 10, minDelay: 0, maxDelay: 5 },
  leaves: { leafCount: 50, animationDuration: 5, minDelay: 0, maxDelay: 5 },
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
  fireflies: {
    count: 40,
    size: { min: 3, max: 7 },
    position: { minX: 0, maxX: 100, minY: 0, maxY: 100 },
    movement: { durationMin: 6, durationMax: 14, distanceX: 80, distanceY: 120 },
    delay: { min: 0, max: 5 },
  },
};

// ── Catalog ───────────────────────────────────────────────
const CATALOG = {
  types: [
    {
      name: 'atmosphere',
      effects: [
        { id: 1, name: 'clouds' },
        { id: 2, name: 'snow' },
        { id: 3, name: 'rains' },
        { id: 4, name: 'fog' },
        { id: 5, name: 'thunder' },
      ],
    },
    {
      name: 'animations',
      effects: [
        { id: 6, name: 'shooting-star' },
        { id: 7, name: 'light-rays' },
        { id: 8, name: 'falling-ash' },
        { id: 9, name: 'falling-leaves' },
        { id: 10, name: 'fireflies' },
        { id: 11, name: 'bird-flying' },
        { id: 12, name: 'ember' },
        { id: 13, name: 'smoke' },
        { id: 14, name: 'crow-flying' },
      ],
    },
    {
      name: 'musics',
      effects: [
        { id: 15, name: 'birds', file: '../images/sounds/birds-final.MP3' },
        { id: 16, name: 'rain', file: '../images/sounds/rain-final.MP3' },
        { id: 17, name: 'fire', file: '../images/sounds/fire-ember-final.MP3' },
        { id: 18, name: 'thunder', file: '../images/sounds/thunder-final.MP3' },
        { id: 19, name: 'serenity', file: '../images/sounds/sound-night-ambience-final.MP3' },
        { id: 20, name: 'crows', file: '../images/sounds/crows-final.mp3' },
      ],
    },
  ],
};

// ── Map slug -> run effect (from effects.js) ───────────
const EFFECT_RUNNERS = {
  clouds: () => initClouds(),
  snow: () => createSnowflake(),
  rains: () => initRainsEffect(),
  fog: () => initFogCanvas(),
  thunder: () => initLightning(),
  'shooting-star': () => initShootingStar(config.lines),
  'light-rays': () => initGodRaysEffect(),
  'falling-ash': () => createAshFlake(),
  'falling-leaves': () => initLeaves(config.leaves),
  ember: () => initFireEmberEffect(),
  'bird-flying': () => initBirdEffect(),
  smoke: () => initSmokeEffect2(),
  fireflies: () => createFireflies(config.fireflies),
  'crow-flying': () => initCrowEffect(),
};

// ── Icons ─────────────────────────────────────────────────
const EFFECT_ICONS = {
  clouds: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-clouds-fill text-white" viewBox="0 0 16 16">
      <path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5"/>
      <path d="M14.544 9.772a3.5 3.5 0 0 0-2.225-1.676 5.5 5.5 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z"/>
  </svg>`,
  smoke: `<i class="bi bi-cloud-haze2 text-white fs-3"></i>`,
  snow: `<i class="bi bi-snow text-white fs-3"></i>`,
  rains: `<i class="bi bi-cloud-rain-heavy text-white fs-3"></i>`,
  'shooting-star': `<i class="bi bi-list-stars text-white fs-3"></i>`,
  'light-rays': `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-brightness-high-fill text-white" viewBox="0 0 16 16">
      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
  </svg>`,
  'falling-ash': `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fire text-white" viewBox="0 0 16 16">
      <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
  </svg>`,
  'falling-leaves': `<i class="bi bi-leaf text-white fs-3"></i>`,
  fireflies: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M15.4922 1.75781C15.2343 1.86719 15 2.21875 15 2.5C15 2.95312 15.4609 3.35938 15.9922 3.35938C16.1093 3.35938 16.3515 3.44531 16.5234 3.53906C16.8828 3.74219 17.2968 4.46875 17.414 5.09375L17.4765 5.46875L16.8672 5.79688C15.289 6.63281 14.0468 8.21875 13.6093 9.96094C13.4531 10.5625 13.3359 11.3281 13.3906 11.3281C13.4062 11.3281 13.6093 11.2422 13.8437 11.1406C14.5468 10.8281 15.9922 10.4062 16.9531 10.2266C18.0937 10.0156 20.6015 9.9375 21.8828 10.0703C23.375 10.2266 25.0156 10.6406 26.164 11.1406C26.3906 11.2422 26.5937 11.3281 26.6093 11.3281C26.664 11.3281 26.5468 10.5781 26.3906 9.96094C25.9453 8.14062 24.6484 6.55469 22.9062 5.67188C22.5 5.46094 22.4922 5.46094 22.5468 5.17188C22.7422 4.10156 23.3515 3.35938 24.0234 3.35938C24.539 3.35938 25 2.94531 25 2.48438C25 2.16406 24.7187 1.8125 24.3906 1.71094C24.1328 1.64062 23.9765 1.64844 23.5 1.75C22.5625 1.96094 21.8515 2.53906 21.3906 3.47656C21.1797 3.89844 20.9609 4.53125 20.9218 4.83594C20.8984 5.02344 20.8906 5.02344 20.0078 5.02344H19.1172L18.9765 4.46875C18.6093 3.03125 17.7187 2.03906 16.5468 1.75781C15.9453 1.61719 15.8125 1.61719 15.4922 1.75781Z" fill="white"/>
      <path d="M18.0859 11.7188C15.6172 11.9766 12.5625 13.3047 10.0781 15.1797C9.07032 15.9453 7.57032 17.4609 6.93751 18.3594C4.79689 21.3828 4.78907 24.1719 6.92189 26.4063C7.81251 27.3359 8.70314 27.7344 9.88282 27.7344C10.6797 27.7344 11.2891 27.5781 12.0156 27.1875C14.2109 26 16.4063 23.2109 18.0859 19.4609C18.9141 17.6172 19.6406 15.3516 19.8516 13.9844C19.9063 13.6406 19.9766 13.3594 20.0078 13.3594C20.0313 13.3594 20.0859 13.5547 20.1172 13.7969C20.2031 14.4922 20.5859 15.9609 20.9688 17.0781C22.6172 21.8828 25.4297 25.9063 28.0703 27.2344C28.7734 27.5938 29.3594 27.7344 30.1172 27.7344C31.3281 27.7344 32.1953 27.3359 33.125 26.3516C34.2109 25.2031 34.75 23.8203 34.6563 22.4141C34.5156 20.2969 33.2109 18.1094 30.8047 15.9453C28.6172 13.9844 25.6328 12.4453 22.9297 11.875C22.3125 11.75 21.7813 11.7031 20.4297 11.6797C19.4844 11.6641 18.4297 11.6797 18.0859 11.7188Z" fill="white"/>
      <path d="M19.5703 20.2344C18.8281 21.9375 17.5469 24.1015 16.5078 25.3906C15.5625 26.5703 14.7266 27.375 13.625 28.1719L13.3984 28.3359L13.6016 28.6015C13.7188 28.75 14.0156 29.0703 14.2656 29.3125C16.5312 31.5078 19.8438 32.2265 22.7578 31.1719C23.5156 30.8906 24.4219 30.3984 25 29.9609C25.4453 29.6172 26.5625 28.4844 26.5625 28.375C26.5625 28.3359 26.3281 28.1406 26.0391 27.9219C24.0234 26.4531 21.9453 23.6172 20.4922 20.375C20.2422 19.8281 20.0234 19.375 20 19.375C19.9688 19.375 19.7812 19.7578 19.5703 20.2344Z" fill="white"/>
      <path d="M10.5783 31.5312C9.93766 31.8984 9.22672 32.3124 8.99235 32.4452C8.25016 32.8671 8.0861 33.4687 8.59391 33.9218C9.00797 34.3046 9.22672 34.2421 10.7736 33.3437C12.5548 32.3124 12.633 32.2577 12.7345 32.0468C12.9923 31.4765 12.633 30.8593 12.0548 30.8593C11.8127 30.8593 11.5002 30.9999 10.5783 31.5312Z" fill="white"/>
      <path d="M27.4142 31.0859C27.172 31.3359 27.1173 31.703 27.2657 32.0468C27.3673 32.2577 27.4454 32.3124 29.2267 33.3437C30.7579 34.2343 30.9767 34.2968 31.3985 33.9374C31.6954 33.6874 31.7814 33.3124 31.6095 32.9765C31.4845 32.7421 30.9923 32.4218 28.9454 31.2577C28.0939 30.7734 27.7657 30.7343 27.4142 31.0859Z" fill="white"/>
      <path d="M15.0081 33.461C14.8284 33.5548 13.6409 35.4767 13.1253 36.5235C12.9143 36.9376 12.8987 37.0235 12.9768 37.2892C13.0315 37.4923 13.1409 37.6329 13.3049 37.7345C13.7737 38.0235 14.1409 37.9064 14.5081 37.3595C15.0159 36.5939 16.1799 34.5157 16.2268 34.297C16.3518 33.6485 15.6174 33.1407 15.0081 33.461Z" fill="white"/>
      <path d="M19.5391 33.4844C19.1875 33.7344 19.1406 34.0078 19.1406 35.8672C19.1406 37.8203 19.1875 38.0156 19.6562 38.2422C20.0078 38.4063 20.3047 38.3438 20.5937 38.0391L20.8203 37.8047L20.8437 36.0313C20.875 34.1016 20.8281 33.7813 20.4922 33.5234C20.25 33.3281 19.7969 33.3125 19.5391 33.4844Z" fill="white"/>
      <path d="M24.125 33.4922C23.8593 33.6562 23.7187 33.9922 23.7734 34.2969C23.8047 34.4219 24.2187 35.2188 24.7031 36.0625C25.6015 37.625 25.8203 37.8906 26.2343 37.8906C26.4765 37.8906 26.8515 37.6875 26.9531 37.5C27.1718 37.1016 27.0859 36.8516 26.2031 35.3125C25.7343 34.4922 25.2812 33.7344 25.1953 33.625C24.9843 33.3594 24.4375 33.2891 24.125 33.4922Z" fill="white"/>
  </svg>`,
  fog: `<i class="bi bi-cloud-fog2 text-white fs-3"></i>`,
  thunder: `<i class="bi bi-lightning-charge text-white fs-3"></i>`,
  'bird-flying': `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512" class="text-white" fill="currentColor"><path d="M288 167.2v-28.1c-28.2-36.3-47.1-79.3-54.1-125.2-2.1-13.5-19-18.8-27.8-8.3-21.1 24.9-37.7 54.1-48.9 86.5 34.2 38.3 80 64.6 130.8 75.1zM400 64c-44.2 0-80 35.9-80 80.1v59.4C215.6 197.3 127 133 87 41.8c-5.5-12.5-23.2-13.2-29-.9C41.4 76 32 115.2 32 156.6c0 70.8 34.1 136.9 85.1 185.9 13.2 12.7 26.1 23.2 38.9 32.8l-143.9 36C1.4 414-3.4 426.4 2.6 435.7 20 462.6 63 508.2 155.8 512c8 .3 16-2.6 22.1-7.9l65.2-56.1H320c88.4 0 160-71.5 160-159.9V128l32-64H400zm0 96.1c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z"/></svg>`,
  ember: `<svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="text-white" fill="currentColor">
    <path d="M11.7642 0.75C11.7799 0.9 11.7876 1.04971 11.7876 1.19971C11.7876 5.38321 5.25 8.1911 5.25 13.3916C5.25 15.6499 7.11425 17.1611 8.63525 18.4863C11.5318 20.6028 12.1069 21.5507 12.1069 22.2422C12.1069 22.7004 12 23.0085 12 23.25C12.576 22.4918 12.6429 21.8057 12.6504 21.1479C12.6504 19.8062 11.707 18.5911 10.7065 17.2163C9.99479 16.2076 8.82715 15.2834 8.82715 14.0669C8.82715 10.7166 13.5 8.5086 13.5 4.8501C13.5 2.71635 11.9877 0.858 11.7642 0.75ZM14.5312 6.75L14.7114 7.0752C14.8172 7.30845 14.8652 7.56588 14.8652 7.84863C14.8652 9.86838 12.2532 12.8775 12.1392 13.1265C12.0409 13.359 12 13.6088 12 13.8413C12 14.7556 12.6834 15.7529 12.8057 15.7529C12.9122 15.7529 15.363 13.2421 15.4365 11.7788C15.7215 12.3106 15.8438 12.8015 15.8438 13.292C15.8438 15.1542 13.9541 17.6807 13.9541 17.6807C13.9541 18.2042 15.3954 20.083 15.5581 20.083C15.6069 20.083 15.6641 20.0256 15.7046 19.9761C17.4221 18.1971 18.75 16.1272 18.75 13.7827C18.75 13.425 18.7171 13.0505 18.6519 12.668C18.1059 9.65072 15.2805 7.041 14.5312 6.75Z" fill="currentColor"/>
  </svg>`,
  'crow-flying': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="40" height="40" viewBox="0 0 512 512" class="text-white" fill="currentColor" ><!--!Font Awesome Free v5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M544 32h-16.36C513.04 12.68 490.09 0 464 0c-44.18 0-80 35.82-80 80v20.98L12.09 393.57A30.216 30.216 0 0 0 0 417.74c0 22.46 23.64 37.07 43.73 27.03L165.27 384h96.49l44.41 120.1c2.27 6.23 9.15 9.44 15.38 7.17l22.55-8.21c6.23-2.27 9.44-9.15 7.17-15.38L312.94 384H352c1.91 0 3.76-.23 5.66-.29l44.51 120.38c2.27 6.23 9.15 9.44 15.38 7.17l22.55-8.21c6.23-2.27 9.44-9.15 7.17-15.38l-41.24-111.53C485.74 352.8 544 279.26 544 192v-80l96-16c0-35.35-42.98-64-96-64zm-80 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg>`,
};
const DEFAULT_EFFECT_ICON = '<i class="bi bi-stars text-white fs-3"></i>';
const SOUND_ICON = '<i class="bi bi-music-note-beamed text-white fs-3"></i>';

// ── Elements ──────────────────────────────────────────────
const customEffectBtn = document.getElementById('customEffectBtn');
const modalOverlay = document.getElementById('modalOverlay');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnApply = document.getElementById('apply-bg-effect');
const btnRemove = document.getElementById('remove-bg-effect');
const effectContainer = document.getElementById('effectContainer');
const listEl = document.getElementById('wfEffectList');

// ── State ─────────────────────────────────────────────────
const selected = { effect: null, sound: null };
const applied = { effect: null, sound: null };

const soundFiles = {}; // slug -> file
let currentAudio = null;
let effectCleanup = null;

// ── Helpers ───────────────────────────────────────────────
const slugify = (name) => name.toLowerCase().trim().replace(/\s+/g, '-');
const getEffectIcon = (slug) => EFFECT_ICONS[slug] || DEFAULT_EFFECT_ICON;
const groupOf = (typeName) => (typeName === 'musics' ? 'sound' : 'effect');

// ── Render list effect / sound ───────────────────────
function renderCatalog() {
  listEl.innerHTML = '';

  CATALOG.types.forEach((type) => {
    const groupEl = document.createElement('div');
    groupEl.className = 'd-flex align-items-center gap-3 flex-column w-100';
    groupEl.innerHTML = `
      <h5 class="text-white w-100 text-capitalize fw-medium mb-0">${type.name}</h5>
      <div class="wf-effect-group-list list-effect d-flex align-items-center justify-content-start gap-2 gap-lg-3 w-100 flex-wrap"></div>
    `;
    const effectsEl = groupEl.querySelector('.wf-effect-group-list');

    type.effects.forEach((effect) => {
      const slug = slugify(effect.name);
      const isSound = type.name === 'musics';
      if (isSound) soundFiles[slug] = effect.file;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wf-effect-btn rounded text-center p-2';
      btn.dataset.effect = slug;
      btn.dataset.effectId = effect.id;
      btn.dataset.type = type.name;
      btn.dataset.group = groupOf(type.name); // 'effect' | 'sound'

      btn.innerHTML = `
        <div class="d-flex align-items-center gap-3 flex-column justify-content-center h-100">
          <span>${isSound ? SOUND_ICON : getEffectIcon(slug)}</span>
          <div class="text-white fw-light fs-6 text-capitalize">${effect.name}</div>
        </div>
      `;
      effectsEl.appendChild(btn);
    });

    listEl.appendChild(groupEl);
  });
}

function syncButtons(state) {
  listEl.querySelectorAll('.wf-effect-btn').forEach((b) => {
    b.classList.toggle('active', state[b.dataset.group] === b.dataset.effect);
  });
}

// Click choose effect and sound
listEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.wf-effect-btn');
  if (!btn) return;
  const group = btn.dataset.group;
  const slug = btn.dataset.effect;
  selected[group] = selected[group] === slug ? null : slug;
  syncButtons(selected);
});

// ── Effect ────────────────────────────────────────────────
function stopEffect() {
  if (typeof effectCleanup === 'function') {
    try {
      effectCleanup();
    } catch (err) {
      console.warn('Effect cleanup error:', err);
    }
  }
  effectCleanup = null;
  effectContainer.innerHTML = '';
}

function startEffect(slug) {
  const run = EFFECT_RUNNERS[slug];
  if (!run) {
    console.warn(`Chưa có hàm chạy cho effect "${slug}"`);
    return;
  }
  const result = run();
  if (typeof result === 'function') effectCleanup = result;
}

// ── Sound ─────────────────────────────────────────────────
function stopSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function startSound(slug) {
  const file = soundFiles[slug];
  if (!file) return;
  currentAudio = new Audio(file);
  currentAudio.loop = true;
  currentAudio.volume = 0.6;
  currentAudio.play().catch((err) => console.warn('Không phát được sound:', err));
}

// ── Apply / Remove ────────────────────────────────────────
function applySelection() {
  stopEffect();
  stopSound();

  if (selected.effect) startEffect(selected.effect);
  if (selected.sound) startSound(selected.sound);

  applied.effect = selected.effect;
  applied.sound = selected.sound;
  closeModal();
}

function removeAll() {
  stopEffect();
  stopSound();
  selected.effect = selected.sound = null;
  applied.effect = applied.sound = null;
  syncButtons(selected);
}

btnApply.addEventListener('click', applySelection);
btnRemove.addEventListener('click', removeAll);

// ── Modal open/close ──────────────────────────────────────
function openModal() {
  selected.effect = applied.effect;
  selected.sound = applied.sound;
  syncButtons(selected);
  modalOverlay.style.display = 'flex';
}
function closeModal() {
  modalOverlay.style.display = 'none';
}

customEffectBtn.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── Bootstrap tooltips ────────────────────────────────────
[...document.querySelectorAll('[data-bs-toggle="tooltip"]')].forEach((el) => new bootstrap.Tooltip(el));

// ── Init ──────────────────────────────────────────────────
renderCatalog();
