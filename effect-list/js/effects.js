/* ════════════════════════════════════════════════════════════
    HELPERS
════════════════════════════════════════════════════════════ */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/* ════════════════════════════════════════════════════════════
    SNOW EFFECT
════════════════════════════════════════════════════════════ */
function createSnowflake() {
  // Create & append container
  const snowContainer = document.createElement('div');
  snowContainer.classList.add('snow-container');
  document.getElementById('effectContainer').appendChild(snowContainer);

  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 0.5;
  const pauseWhenNotActive = true;
  const maxSnowflakes = 500;
  const snowflakes = [];

  let snowflakeInterval;
  let isTabActive = true;

  function resetSnowflake(snowflake) {
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size;

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * viewportWidth}px`;
    snowflake.style.top = `-${size}px`;

    const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
    snowflake.style.animationDuration = `${animationDuration}s`;
    snowflake.style.animationTimingFunction = 'linear';
    snowflake.style.animationName = Math.random() < 0.5 ? 'fall' : 'diagonal-fall';

    setTimeout(() => {
      const index = snowflakes.indexOf(snowflake);
      if (index !== -1) snowflakes.splice(index, 1);
      snowflake.remove();
    }, animationDuration * 1000);
  }

  function spawnSnowflake() {
    if (snowflakes.length < maxSnowflakes) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      snowflakes.push(snowflake);
      snowContainer.appendChild(snowflake);
      resetSnowflake(snowflake);
    }
  }

  function generateSnowflakes() {
    const numberOfParticles = Math.ceil((window.innerWidth * window.innerHeight) / 1000) * particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    clearInterval(snowflakeInterval);
    snowflakeInterval = setInterval(() => {
      if (isTabActive && snowflakes.length < maxSnowflakes) {
        requestAnimationFrame(spawnSnowflake);
      }
    }, interval);
  }

  function handleVisibilityChange() {
    if (!pauseWhenNotActive) return;
    isTabActive = !document.hidden;
    if (isTabActive) generateSnowflakes();
    else clearInterval(snowflakeInterval);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('resize', () => {
    clearInterval(snowflakeInterval);
    setTimeout(generateSnowflakes, 1000);
  });

  generateSnowflakes();
}

/* ════════════════════════════════════════════════════════════
    SMOKE EFFECT
════════════════════════════════════════════════════════════ */
function initSmoke(cfg) {
  // Create & append container
  const smokeContainer = document.createElement('div');
  smokeContainer.classList.add('smoke-container');
  smokeContainer.id = 'smoke';
  document.getElementById('effectContainer').appendChild(smokeContainer);

  for (let i = 0; i < cfg.count; i++) {
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

    smokeContainer.appendChild(smoke);
  }
}

/* ════════════════════════════════════════════════════════════
    SHOOTING STAR EFFECT
════════════════════════════════════════════════════════════ */
function initShootingStar(cfg) {
  const container = document.createElement('div');
  container.classList.add('lines');
  document.getElementById('effectContainer').appendChild(container);

  for (let i = 0; i < cfg.count; i++) {
    const line = document.createElement('div');
    line.className = 'line';

    const marginLeft = cfg.startOffset + i * cfg.spacing;
    const animationDelay = cfg.baseDelay + i * cfg.delayIncrement;

    line.style.marginLeft = `${marginLeft}%`;
    line.style.rotate = `${cfg.rotate}deg`;
    line.style.setProperty('--animation-delay', `${animationDelay}s`);
    line.style.setProperty('--animation-duration', `${cfg.animationDuration}s`);

    container.appendChild(line);
  }
}

/* ════════════════════════════════════════════════════════════
    LEAVES EFFECT
════════════════════════════════════════════════════════════ */
function initLeaves(cfg) {
  // Create & append container
  const leavesContainer = document.createElement('div');
  leavesContainer.id = 'leaves';
  document.getElementById('effectContainer').appendChild(leavesContainer);

  function createLeaf() {
    const leaf = document.createElement('i');

    const delay = random(cfg.minDelay, cfg.maxDelay);
    leaf.style.animationDelay = `${delay}s`;
    leaf.style.webkitAnimationDelay = `${delay}s`;

    leaf.style.right = `${Math.random() * 100}%`;

    const duration = cfg.animationDuration + (Math.random() * 2 - 1);
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.webkitAnimationDuration = `${duration}s`;

    return leaf;
  }

  function generate(count) {
    leavesContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
      leavesContainer.appendChild(createLeaf());
    }
  }

  // Optimal count based on screen width
  const getOptimalCount = () => Math.max(cfg.leafCount, Math.ceil(window.innerWidth / 100));

  generate(getOptimalCount());

  window.addEventListener('resize', () => {
    generate(getOptimalCount());
  });
}

/* ════════════════════════════════════════════════════════════
    ASH EFFECT
════════════════════════════════════════════════════════════ */
function createAshFlake() {
  // Create & append container
  const ashContainer = document.createElement('div');
  ashContainer.classList.add('ash-container');
  document.getElementById('effectContainer').appendChild(ashContainer);

  const particlesPerThousandPixels = 0.1;
  const fallSpeed = 0.5;
  const pauseWhenNotActive = true;
  const maxAshFlakes = 500;
  const ashFlakes = [];

  let ashFlakeInterval;
  let isTabActive = true;

  function resetAshFlake(ashFlake) {
    const size = Math.random() * 5 + 1;
    const viewportWidth = window.innerWidth - size;

    ashFlake.style.width = `${size}px`;
    ashFlake.style.height = `${size}px`;
    ashFlake.style.left = `${Math.random() * viewportWidth}px`;
    ashFlake.style.top = `-${size}px`;

    const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
    ashFlake.style.animationDuration = `${animationDuration}s`;
    ashFlake.style.animationTimingFunction = 'linear';
    ashFlake.style.animationName = Math.random() < 0.5 ? 'fall' : 'diagonal-fall';

    setTimeout(() => {
      const index = ashFlakes.indexOf(ashFlake);
      if (index !== -1) ashFlakes.splice(index, 1);
      ashFlake.remove();
    }, animationDuration * 1000);
  }

  function spawnAshFlake() {
    if (ashFlakes.length < maxAshFlakes) {
      const ashFlake = document.createElement('div');
      ashFlake.classList.add('ashFlake');
      ashFlakes.push(ashFlake);
      ashContainer.appendChild(ashFlake);
      resetAshFlake(ashFlake);
    }
  }

  function generateAsFlakes() {
    const numberOfParticles = Math.ceil((window.innerWidth * window.innerHeight) / 1000) * particlesPerThousandPixels;
    const interval = 5000 / numberOfParticles;

    clearInterval(ashFlakeInterval);
    ashFlakeInterval = setInterval(() => {
      if (isTabActive && ashFlakes.length < maxAshFlakes) {
        requestAnimationFrame(spawnAshFlake);
      }
    }, interval);
  }

  function handleVisibilityChange() {
    if (!pauseWhenNotActive) return;
    isTabActive = !document.hidden;
    if (isTabActive) generateAsFlakes();
    else clearInterval(ashFlakeInterval);
  }

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('resize', () => {
    clearInterval(ashFlakeInterval);
    setTimeout(generateAsFlakes, 1000);
  });

  generateAsFlakes();
}

/* ════════════════════════════════════════════════════════════
    CLOUDS EFFECT
════════════════════════════════════════════════════════════ */
function initClouds() {
  const container = document.createElement('div');

  container.className = 'cloud-container';

  document.getElementById('effectContainer').appendChild(container);

  createCloudFilters();

  const CLOUD_COUNT = 25;

  for (let i = 0; i < CLOUD_COUNT; i++) {
    createCloud(container);
  }
}

function createCloud(container) {
  const cloud = document.createElement('div');

  cloud.className = 'cloud';

  const width = random(250, 700);
  const height = random(80, 300);

  cloud.style.setProperty('--w', `${width}px`);
  cloud.style.setProperty('--h', `${height}px`);

  cloud.style.top = `${random(-10, 80)}vh`;

  cloud.style.animationDuration = `${random(180, 480)}s`;

  cloud.style.animationDelay = `${-random(0, 300)}s`;
  cloud.style.zIndex = Math.floor(random(1, 10));
  container.appendChild(cloud);
}

function createCloudFilters() {
  if (document.getElementById('cloud-svg-filter')) {
    return;
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svg.id = 'cloud-svg-filter';

  svg.style.position = 'absolute';
  svg.style.width = '0';
  svg.style.height = '0';

  svg.innerHTML = `
    <filter id="cloud-filter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.012"
        numOctaves="4"
        seed="0"
      />

      <feDisplacementMap
        in="SourceGraphic"
        scale="170"
      />
    </filter>
  `;

  document.body.appendChild(svg);
}

/* ════════════════════════════════════════════════════════════
    OCEAN EFFECT
════════════════════════════════════════════════════════════ */
function initOcean() {
  const ocean = document.createElement('div');
  ocean.classList.add('ocean');
  document.getElementById('effectContainer').appendChild(ocean);

  // Bubble configs: [size, left%, opacity, duration, delay, bottom]
  const BUBBLES = [
    [30, 10, 0.2, 16, 0.5, -30],
    [15, 40, 0.1, 10, 1, -30],
    [10, 30, 0.3, 20, 5, -30],
    [25, 40, 0.2, 17, 8, -30],
    [30, 60, 0.1, 15, 10, -30],
    [10, 80, 0.4, 30, 3, -30],
    [15, 90, 0.3, 25, -7, -30],
    [20, 50, 0.2, 19, -5, 30],
    [40, 30, 0.3, 16, -21, 30],
    [30, 60, 0.3, 20, -13.75, 30],
    [25, 90, 0.3, 19, -10.5, 30],
  ];

  BUBBLES.forEach(([size, left, opacity, duration, delay, bottom]) => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.setProperty('--size', `${size}px`);
    bubble.style.setProperty('--left', `${left}%`);
    bubble.style.setProperty('--opacity', opacity);
    bubble.style.setProperty('--duration', `${duration}s`);
    bubble.style.setProperty('--delay', `${delay}s`);
    bubble.style.setProperty('--bottom', `${bottom}px`);
    ocean.appendChild(bubble);
  });

  const octocat = document.createElement('div');
  octocat.id = 'octocat';
  ocean.appendChild(octocat);
}

/* ════════════════════════════════════════════════════════════
  SPACE SHIP EFFECT
════════════════════════════════════════════════════════════ */
function initSpaceShip() {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  document.getElementById('effectContainer').appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();

  const starField = new StarField(240, width, height, ctx);
  const animation = new FlightAnimation(ctx, width, height, starField);

  function animationLoop(timestamp) {
    if (!animation.lastTimestamp) animation.lastTimestamp = timestamp;
    const deltaTime = Math.min((timestamp - animation.lastTimestamp) / 1000, 0.05);
    animation.lastTimestamp = timestamp;

    ctx.clearRect(0, 0, width, height);

    starField.update();
    starField.draw();

    animation.orbitRing.draw(
      animation.path.orbitCenter.x,
      animation.path.orbitCenter.y,
      animation.path.orbitRadius,
      animation.getOrbitRingAlpha(),
    );

    const state = animation.update(deltaTime);

    if (state) {
      const { position, angle } = state;
      animation.trail.draw();
      animation.ship.draw(position.x, position.y, angle);

      if (animation.phase === 'exit') {
        const exitProgress = (animation.time - animation.ORBIT_END) / (1 - animation.ORBIT_END);
        if (exitProgress > 0.15) {
          animation.speedLines.draw(position.x, position.y, angle, Math.min((exitProgress - 0.15) / 0.85, 1));
        }
      }
    } else {
      animation.trail.draw();
      animation.restart(width, height);
    }

    requestAnimationFrame(animationLoop);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    animation.path = new FlightPath(width, height);
  });

  requestAnimationFrame(animationLoop);
}
