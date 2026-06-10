// Function to generate a random number within a range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Configuration for the effects
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
};

// Create falling ash
function createAsh(container, index, cfg) {
  const ash = document.createElement('div');
  ash.className = 'ash-falling';

  const ashParticle = document.createElement('div');
  ashParticle.className = 'ash-particle';
  ash.appendChild(ashParticle);

  const size = random(cfg.minSize, cfg.maxSize);
  const duration = random(cfg.minDuration, cfg.maxDuration);
  const delay = random(cfg.minDelay, cfg.maxDelay);
  const startX = random(5, 95);
  const endX = startX + random(-3, 3);

  ash.style.width = `${size}px`;
  ash.style.height = `${size}px`;
  ash.style.animationDuration = `${duration}s`;
  ash.style.animationDelay = `${delay}s`;
  ash.style.setProperty('--start-x', `${startX}vw`);
  ash.style.setProperty('--end-x', `${endX}vw`);

  container.appendChild(ash);
}

// Create smoke
function createSmoke(container, index, cfg) {
  const smoke = document.createElement('div');
  smoke.className = 'smoke-large';

  const size = random(cfg.minSize, cfg.maxSize);
  const duration = random(cfg.minDuration, cfg.maxDuration);
  const delay = random(cfg.minDelay, cfg.maxDelay);
  const leftPos = random(35, 50);

  smoke.style.width = `${size}px`;
  smoke.style.height = `${size}px`;
  smoke.style.animationDuration = `${duration}s`;
  smoke.style.animationDelay = `${delay}s`;
  smoke.style.left = `${leftPos}%`;

  container.appendChild(smoke);
}

//  Initialize all effects
function init() {
  const particlesContainer = document.getElementById('particles');
  const smokeContainer = document.getElementById('smoke');

  //  Create falling ash
  for (let i = 0; i < config.ashes.count; i++) {
    createAsh(particlesContainer, i, config.ashes);
  }

  // Create smoke
  for (let i = 0; i < config.smokes.count; i++) {
    createSmoke(smokeContainer, i, config.smokes);
  }

  // Create more falling fire
  for (let i = 0; i < config.fallingFires.count; i++) {
    createFire(firesContainer, i, config.fallingFires);
  }
}

// Run when page load finish
window.addEventListener('DOMContentLoaded', init);
