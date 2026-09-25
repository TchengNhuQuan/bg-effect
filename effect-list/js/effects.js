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

/* ════════════════════════════════════════════════════════════
  GOD RAYS EFFECT
════════════════════════════════════════════════════════════ */
function initGodRaysEffect() {
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  document.getElementById('effectContainer').appendChild(canvas);

  let width, height;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resizeCanvas();

  const gl =
    canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ||
    canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false });

  if (!gl) {
    document.body.innerHTML =
      '<p style="color:#fff;font-family:sans-serif;padding:20px">Trình duyệt không hỗ trợ WebGL.</p>';
    return;
  }

  // ---------- Vertex shader: fullscreen quad ----------
  const vertexSrc = ` attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.1, 1.0);
    }
  `;

  // ---------- Fragment shader: port trực tiếp từ GLSL gốc ----------
  // Giữ nguyên logic toán học: rhash, voronoi2d, cart2polar, mainImage -> main

  const fragmentSrc = `
    precision highp float;

    uniform vec2 iResolution;
    uniform float iTime;

    const mat2 myt = mat2(.12121212, .13131313, -.13131313, .12121212);
    const vec2 mys = vec2(1e4, 1e6);

    vec2 rhash(vec2 uv) {
      uv *= myt;
      uv *= mys;
      return fract(fract(uv / mys) * uv);
    }

    float voronoi2d(const in vec2 point) {
      vec2 p = floor(point);
      vec2 f = fract(point);
      float res = 0.;
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 b = vec2(i, j);
          vec2 r = vec2(b) - f + rhash(p + b);
          res += 1. / pow(dot(r, r), 8.);
        }
      }
      return pow(1. / res, .0625);
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv = fragCoord / iResolution.xy;
      
      // Giữ lại UV gốc để làm mask (mặt nạ che mờ dần từ trên xuống dưới)
      vec2 baseUV = uv; 

      // Chuẩn hóa tọa độ theo tỷ lệ màn hình
      uv = (uv - .5) * 2.0;
      uv.x *= iResolution.x / iResolution.y;

      // --- CẤU HÌNH HƯỚNG TIA SÁNG SONG SONG ---
      // Tạo một góc nghiêng (ví dụ: góc 45 độ là từ trên-trái xuống dưới-phải)
      // Bạn có thể đổi dấu trừ thành cộng ở sin/cos để đảo hướng từ trên-phải xuống
      float angle = 0.7853; // ~45 độ tính bằng radian
      float c = cos(angle);
      float s = sin(angle);
      mat2 rotationMat = mat2(c, -s, s, c);
      
      // Xoay hệ tọa độ để các tia Voronoi chạy song song theo một hướng nghiêng
      vec2 rayUV = rotationMat * uv;

      // Điều chỉnh độ dày/mật độ của các tia sáng bằng cách nhân tỉ lệ trục X vuông góc với tia
      float rayX = rayUV.x * 4.0; 

      // --- TẠO TIẾN TRÌNH CHUYỂN ĐỘNG (ANIMATION) ---
      // Các tia dịch chuyển tịnh tiến theo thời gian iTime
      float n1 = voronoi2d(vec2(rayX, 0.0) + iTime * 0.2);
      float n2 = voronoi2d(vec2(0.1, rayX) - iTime * 0.3);

      // Hòa trộn hai lớp nhiễu Voronoi để tia sáng trông tự nhiên, ngẫu nhiên hơn
      float n3 = min(n1, n2);

      // --- MẶT NẠ (MASK) LÀM MỜ TIA SÁNG ---
      // Tạo độ mờ dần từ đỉnh màn hình xuống góc dưới (dựa trên baseUV.y từ 1.0 về 0.0)
      float mask = smoothstep(0.0, 0.9, baseUV.y); 

      // Tính toán alpha cuối cùng (0.6 là độ đậm tối đa của tia sáng)
      float alpha = n3 * mask * 0.95;
      alpha = clamp(alpha, 0.0, 1.0);

      // Trả về màu trắng kết hợp với alpha trong suốt
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `;

  // ---------- Compile helpers ----------
  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSrc);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSrc);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  // Bật blending để vùng alpha thấp trong suốt thật, không che nền phía sau
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  // ---------- Fullscreen quad ----------
  const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(aPosition);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  // ---------- Uniforms ----------
  const uResolution = gl.getUniformLocation(program, 'iResolution');
  const uTime = gl.getUniformLocation(program, 'iTime');

  // ---------- Resize handling ----------
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = Math.floor(canvas.clientWidth * dpr);
    const displayHeight = Math.floor(canvas.clientHeight * dpr);

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width = displayWidth;
      canvas.height = displayHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }

  window.addEventListener('resize', resize);
  resize();

  // ---------- Render loop ----------
  const startTime = performance.now();

  function render() {
    resize();
    const elapsed = (performance.now() - startTime) / 1000;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, elapsed);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ════════════════════════════════════════════════════════════
  RAINS EFFECT
════════════════════════════════════════════════════════════ */
function initRainsEffect() {
  const container = document.getElementById('effectContainer');

  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  canvas.style.cssText = 'position:absolute; top:0; left:0; width:100%; height:100%;';

  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  const DROP_COUNT = 150;
  const GROUND_Y_RATIO = 0.92;
  const drops = [];
  // const splashes = [];

  function makeDrop() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      len: 10 + Math.random() * 20,
      speed: 10 + Math.random() * 8,
      opacity: 0.2 + Math.random() * 0.4,
    };
  }

  // function makeSplash(x, y) {
  //   return {
  //     x,
  //     y,
  //     radius: 1,
  //     maxRadius: 6 + Math.random() * 6,
  //     opacity: 0.6,
  //   };
  // }

  for (let i = 0; i < DROP_COUNT; i++) drops.push(makeDrop());

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const groundY = canvas.height * GROUND_Y_RATIO;

    // vẽ giọt mưa
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    for (const d of drops) {
      ctx.globalAlpha = d.opacity;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len);
      ctx.stroke();

      d.y += d.speed;
      if (d.y + d.len > groundY) {
        // splashes.push(makeSplash(d.x, groundY));
        d.y = Math.random() * -canvas.height;
        d.x = Math.random() * canvas.width;
      }
    }

    // ctx.lineWidth = 2;
    // for (let i = splashes.length - 1; i >= 0; i--) {
    //   const s = splashes[i];
    //   ctx.globalAlpha = s.opacity;
    //   ctx.beginPath();
    //   ctx.ellipse(s.x, s.y, s.radius, s.radius * 0.4, 0, 0, Math.PI * 2);
    //   ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    //   ctx.stroke();

    //   s.radius += (s.maxRadius - s.radius) * 0.2 + 0.3;
    //   s.opacity -= 0.05;
    //   if (s.opacity <= 0) splashes.splice(i, 1);
    // }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ════════════════════════════════════════════════════════════
  FOG EFFECT 1
════════════════════════════════════════════════════════════ */
function initFogEffect(container) {
  const cfg = EFFECT_CONFIG.fog;
  clearContainer(container);

  const directionClass = cfg.direction === 'rtl' ? 'fog-rtl' : 'fog-ltr';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < cfg.count; i++) {
    const patch = document.createElement('span');
    patch.className = `fog-patch ${directionClass}`;

    const size = random(cfg.minWidth, cfg.maxWidth); // ⚙️ SIZE từng mảng sương
    patch.style.width = `${size}px`;
    patch.style.height = `${size * 0.5}px`;
    patch.style.top = `${random(0, 80)}%`;
    patch.style.animationDuration = `${random(cfg.minDuration, cfg.maxDuration)}s`;
    patch.style.animationDelay = `${random(0, cfg.maxDuration)}s`;
    patch.style.opacity = `${random(0.25, 0.55)}`;

    fragment.appendChild(patch);
  }

  container.appendChild(fragment);

  return {
    destroy: () => clearContainer(container),
  };
}

/* ════════════════════════════════════════════════════════════
  THUNDER EFFECT
════════════════════════════════════════════════════════════ */
function initLightning() {
  const container = document.createElement('div');
  container.classList.add('lightning');
  document.getElementById('effectContainer').appendChild(container);
}

/* ════════════════════════════════════════════════════════════
  FOG EFFECT 2
═════════════════════════════════════════════════════════════*/
async function initFogCanvas() {
  function random(min, max) {
    return min + Math.random() * (max - min);
  }

  // Tạo 1 fog layer dưới dạng object thường (thay cho class FogLayer)
  function createFogLayer(options) {
    return {
      speed: options.speed,
      opacity: options.opacity,
      blur: options.blur,
      scale: options.scale,
      y: options.y,
      baked: null,
      pad: 0,
      w: 0,
      h: 0,
      offset: 0,
      dir: 1,
      maxOffset: 0,
    };
  }

  // Bake blur 1 lần duy nhất, không làm mỗi frame nữa
  function bakeFogLayer(layer, image, canvasWidth) {
    const minWidth = canvasWidth * (layer.scale + 0.6);
    const baseScale = minWidth / image.width;

    layer.w = image.width * baseScale;
    layer.h = image.height * baseScale;

    const pad = layer.blur * 3;
    const off = document.createElement('canvas');
    off.width = layer.w + pad * 2;
    off.height = layer.h + pad * 2;

    const octx = off.getContext('2d');
    octx.filter = layer.blur > 0 ? `blur(${layer.blur}px)` : 'none';
    octx.drawImage(image, pad, pad, layer.w, layer.h);

    layer.baked = off;
    layer.pad = pad;

    layer.maxOffset = (layer.w - canvasWidth) / 2;
    layer.offset = 0;
    layer.dir = 1;
  }

  function updateFogLayer(layer, dt) {
    layer.offset += layer.dir * layer.speed * dt;
    if (Math.abs(layer.offset) >= layer.maxOffset) {
      layer.dir *= -1;
    }
  }

  function drawFogLayer(layer, ctx, width, height) {
    ctx.save();
    ctx.globalAlpha = layer.opacity;
    ctx.globalCompositeOperation = 'screen';

    const x = (width - layer.w) / 2 - layer.offset - layer.pad;
    const y = height - layer.y - layer.h - layer.pad;

    ctx.drawImage(layer.baked, x, y, layer.baked.width, layer.baked.height);

    ctx.restore();
  }

  // ---- Quản lý toàn bộ fog (thay cho class FogManager) ----

  function createFogManager(canvas) {
    const manager = {
      canvas,
      ctx: canvas.getContext('2d'),
      layers: [],
      last: performance.now(),
      fogImage: null,
      configs: [],
      resizeTimer: null,
    };

    resizeFogCanvas(manager);

    window.addEventListener('resize', () => {
      clearTimeout(manager.resizeTimer);
      manager.resizeTimer = setTimeout(() => rebakeFogLayers(manager), 150);
    });

    return manager;
  }

  function resizeFogCanvas(manager) {
    const dpr = window.devicePixelRatio || 1;
    manager.canvas.width = manager.canvas.clientWidth * dpr;
    manager.canvas.height = manager.canvas.clientHeight * dpr;
    manager.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // bake lại khi resize (vì bake phụ thuộc canvasWidth)
  function rebakeFogLayers(manager) {
    resizeFogCanvas(manager);

    if (!manager.fogImage) return;

    const cw = manager.canvas.clientWidth;
    manager.layers = manager.configs.map((cfg) => {
      const layer = createFogLayer(cfg);
      bakeFogLayer(layer, manager.fogImage, cw);
      return layer;
    });
  }

  async function loadFogManager(manager) {
    const fog = new Image();
    fog.src = '../images/vecteezy_realistic-smoke-fog-cloud-mist-overlay-on-black-background_40725794.jpg';
    await fog.decode();

    manager.fogImage = fog;
    manager.configs = [
      { speed: 4, opacity: 0.06, blur: 18, scale: 1.2, y: 20 },
      { speed: 7, opacity: 0.1, blur: 10, scale: 1.0, y: 0 },
      { speed: 11, opacity: 0.14, blur: 4, scale: 0.8, y: -20 },
    ];

    rebakeFogLayers(manager);
  }

  function renderFogManager(manager, dt) {
    const w = manager.canvas.clientWidth;
    const h = manager.canvas.clientHeight;
    manager.ctx.clearRect(0, 0, w, h);

    for (const layer of manager.layers) {
      updateFogLayer(layer, dt);
      drawFogLayer(layer, manager.ctx, w, h);
    }
  }

  function fogLoop(manager, now) {
    let dt = (now - manager.last) / 1000;
    manager.last = now;
    dt = Math.min(dt, 0.05);

    renderFogManager(manager, dt);

    requestAnimationFrame((t) => fogLoop(manager, t));
  }

  function startFogManager(manager) {
    requestAnimationFrame((now) => fogLoop(manager, now));
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'fogCanvas';
  document.getElementById('effectContainer').appendChild(canvas);
  const fogManager = createFogManager(canvas);
  await loadFogManager(fogManager);
  startFogManager(fogManager);
}

/* ════════════════════════════════════════════════════════════
  SMOKE EFFECT 2 
═════════════════════════════════════════════════════════════*/

function initSmokeEffect2() {
  const debounce = (callback, duration) => {
    var timer;
    return function (event) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback(event);
      }, duration);
    };
  };

  const loadTexs = (imgs, callback) => {
    const texLoader = new THREE.TextureLoader();
    const length = Object.keys(imgs).length;
    const loadedTexs = {};
    let count = 0;

    texLoader.crossOrigin = 'anonymous';

    for (var key in imgs) {
      const k = key;
      if (imgs.hasOwnProperty(k)) {
        texLoader.load(imgs[k], (tex) => {
          tex.repeat = THREE.RepeatWrapping;
          loadedTexs[k] = tex;
          count++;
          if (count >= length) callback(loadedTexs);
        });
      }
    }
  };

  class Fog {
    constructor() {
      this.uniforms = {
        time: {
          type: 'f',
          value: 0,
        },
        tex: {
          type: 't',
          value: null,
        },
      };
      this.num = 40; // amount smoke
      this.obj = null;
    }

    createObj(tex) {
      // Define Geometries
      const geometry = new THREE.InstancedBufferGeometry();
      // giảm segments từ 20x20 xuống 1x1 (shader không dùng lưới để biến dạng
      // nên plane phẳng đơn giản cho hình ảnh giống hệt nhưng nhẹ hơn nhiều)
      const baseGeometry = new THREE.PlaneBufferGeometry(1100, 1100, 1, 1);

      // Copy attributes of the base Geometry to the instancing Geometry
      geometry.addAttribute('position', baseGeometry.attributes.position);
      geometry.addAttribute('normal', baseGeometry.attributes.normal);
      geometry.addAttribute('uv', baseGeometry.attributes.uv);
      geometry.setIndex(baseGeometry.index);

      // Define attributes of the instancing geometry
      const instancePositions = new THREE.InstancedBufferAttribute(new Float32Array(this.num * 3), 3, 1);
      const delays = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1, 1);
      const rotates = new THREE.InstancedBufferAttribute(new Float32Array(this.num), 1, 1);
      for (var i = 0, ul = this.num; i < ul; i++) {
        instancePositions.setXYZ(i, (Math.random() * 2 - 1) * 850, 0, (Math.random() * 2 - 1) * 300);
        delays.setXYZ(i, Math.random());
        rotates.setXYZ(i, Math.random() * 2 + 1);
      }
      geometry.addAttribute('instancePosition', instancePositions);
      geometry.addAttribute('delay', delays);
      geometry.addAttribute('rotate', rotates);

      // Define Material
      const material = new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: `
            attribute vec3 position;
            attribute vec2 uv;
            attribute vec3 instancePosition;
            attribute float delay;
            attribute float rotate;

            uniform mat4 projectionMatrix;
            uniform mat4 modelViewMatrix;
            uniform float time;

            varying vec2 vUv;

            const float duration = 200.0;

            mat4 calcRotateMat4Z(float radian) {
              return mat4(
                cos(radian), -sin(radian), 0.0, 0.0,
                sin(radian), cos(radian), 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
              );
            }

            void main(void) {
              float now = mod(time + delay * duration, duration) / duration;

              mat4 rotateMat = calcRotateMat4Z(radians(rotate * 360.0) + time * 0.1);
              vec3 rotatePosition = (rotateMat * vec4(position, 1.0)).xyz;

              vec3 moveRise = vec3(
                (now * 2.0 - 1.0) * (2500.0 - (delay * 2.0 - 1.0) * 2000.0),
                (now * 2.0 - 1.0) * 2000.0,
                sin(radians(time * 50.0 + delay + length(position))) * 30.0
              );
              vec3 updatePosition = instancePosition + moveRise + rotatePosition;

              vUv = uv;

              vec4 mvPosition = modelViewMatrix * vec4(updatePosition, 1.0);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,

        fragmentShader: `
            precision highp float;
            uniform sampler2D tex;
            varying vec2 vUv;
            void main() {
              vec4 texColor = texture2D(tex, vUv);
              vec3 color = vec3(1.0); // trắng thuần
              float opacity = texColor.a * 0.18; // chỉnh 0.1 - 0.25 tuỳ độ trong suốt mong muốn

              gl_FragColor = vec4(color, opacity);
            }
          `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      this.uniforms.tex.value = tex;

      // Create Object3D
      this.obj = new THREE.Mesh(geometry, material);
    }

    render(time) {
      this.uniforms.time.value += time;
    }
  }

  const resolution = new THREE.Vector2();

  const canvas = document.createElement('canvas');
  canvas.id = 'canvas-webgl';
  document.getElementById('effectContainer').appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  const clock = new THREE.Clock();

  camera.far = 50000;
  camera.setFocalLength(24);

  const texsSrc = {
    fog: 'https://ykob.github.io/sketch-threejs/img/sketch/fog/fog.png',
  };
  const fog = new Fog();

  const render = () => {
    const time = clock.getDelta();
    fog.render(time);
    renderer.render(scene, camera);
  };
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  };
  const resizeCamera = () => {
    camera.aspect = resolution.x / resolution.y;
    camera.updateProjectionMatrix();
  };
  const resizeWindow = () => {
    resolution.set(window.innerWidth, window.innerHeight);
    canvas.width = resolution.x;
    canvas.height = resolution.y;
    resizeCamera();
    renderer.setSize(resolution.x, resolution.y);
  };
  const on = () => {
    window.addEventListener('resize', debounce(resizeWindow), 1000);
  };

  const init = () => {
    loadTexs(texsSrc, (loadedTexs) => {
      fog.createObj(loadedTexs.fog);

      scene.add(fog.obj);

      renderer.setClearColor(0x000000, 0);
      camera.position.set(0, 0, 1000);
      camera.lookAt(new THREE.Vector3());
      clock.start();

      on();
      resizeWindow();
      renderLoop();
    });
  };
  init();
}

/* ════════════════════════════════════════════════════════════
  FRIE EMBER EFFECT 
═════════════════════════════════════════════════════════════*/
function initFireEmberEffect() {
  class FireParticle {
    constructor(system) {
      this.system = system;
      this.reset(true);
    }

    reset(initial = false) {
      const s = this.system;
      this.x = s.width * 0.5 + (Math.random() - 0.5) * s.spawnWidth;
      this.y = s.height + Math.random() * (initial ? s.height * 0.25 : 30);

      // Size
      const random = Math.random();
      // this.size = random < 0.92 ? 0.35 + Math.random() * 0.9 : 0.8 + Math.random() * 1.2;
      this.size = random < 0.8 ? 0.7 + Math.random() * 1.8 : 2 + Math.random() * 3;

      this.vy = -(s.minSpeed + Math.random() * (s.maxSpeed - s.minSpeed));

      this.vx = (Math.random() - 0.5) * 0.15;

      // Life
      this.maxLife = s.minLife + Math.random() * (s.maxLife - s.minLife);
      this.life = this.maxLife;

      this.seed = Math.random() * 10000;
      this.age = 0;
      this.brightness = 0.5 + Math.random() * 0.5;
      this.stretch = 0.8 + Math.random() * 1.5;
    }

    update(delta, time) {
      const s = this.system;
      this.age += delta;
      this.life -= delta;

      /* BAY LÊN */
      this.y += this.vy * delta;

      /* DRIFT NHẸ */
      const wave = Math.sin(time * 0.0015 + this.seed);
      const wave2 = Math.sin(time * 0.0008 + this.seed * 1.7);
      this.x += (wave * 0.18 + wave2 * 0.08 + s.wind * 0.15) * delta;
      this.vy *= 0.9995;
      if (this.life <= 0 || this.y < s.topLimit) {
        this.reset();
      }
    }

    draw(ctx) {
      const life = Math.max(0, Math.min(1, this.life / this.maxLife));

      // Fade in - out
      const fadeIn = Math.min(1, this.age / 50);
      const fadeOut = life < 0.35 ? life / 0.35 : 1;
      let alpha = fadeIn * fadeOut * this.brightness;

      // Flicker light
      alpha *= 0.8 + Math.random() * 0.2;

      // Particle
      const size = this.size * (0.25 + life * 0.75);
      const glow = Math.max(1.5, size * 5);
      ctx.save();
      ctx.translate(this.x, this.y);

      /* SOFT GLOW */
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glow);
      glowGradient.addColorStop(0, `rgba(255,230,150,${alpha * 0.7})`);
      glowGradient.addColorStop(0.2, `rgba(255,160,40,${alpha * 0.35})`);
      glowGradient.addColorStop(0.5, `rgba(255,70,10,${alpha * 0.08})`);
      glowGradient.addColorStop(1, 'rgba(255,30,0,0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, glow, 0, Math.PI * 2);
      ctx.fill();

      /* HOT CORE */
      const core = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      core.addColorStop(0, `rgba(255,255,220,${alpha})`);
      core.addColorStop(0.35, `rgba(255,210,80,${alpha * 0.9})`);
      core.addColorStop(0.75, `rgba(255,100,20,${alpha * 0.55})`);
      core.addColorStop(1, 'rgba(255,30,0,0)');
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.ellipse(0, 0, size, size * this.stretch, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  class FireParticleSystem {
    constructor(canvas, options = {}) {
      this.canvas = canvas;

      this.ctx = canvas.getContext('2d', {
        alpha: true,
      });

      /* Settings */
      this.density = options.density ?? 1;
      this.wind = options.wind ?? 0.25;
      this.minSpeed = options.minSpeed ?? 0.35;
      this.maxSpeed = options.maxSpeed ?? 0.9;
      this.minLife = options.minLife ?? 450;
      this.maxLife = options.maxLife ?? 1400;

      this.horizontalSpeed = options.horizontalSpeed ?? 0.8;
      this.spawnWidth = options.spawnWidth ?? 500;
      this.topLimit = options.topLimit ?? 100;
      this.particles = [];
      this.width = 0;
      this.height = 0;
      this.lastTime = 0;
      this.running = false;
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.createParticles();
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.dpr = dpr;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    createParticles() {
      /* Scale particle count based  on screen size. */
      const base = Math.min(this.width * 0.18, 100);
      const count = Math.floor(base * this.density);
      this.particles = Array.from({ length: count }, () => new FireParticle(this));
    }

    start() {
      if (this.running) return;
      this.running = true;
      this.lastTime = performance.now();
      requestAnimationFrame((time) => this.animate(time));
    }

    stop() {
      this.running = false;
    }

    animate(time) {
      if (!this.running) return;
      const delta = Math.min(time - this.lastTime, 32);
      this.lastTime = time;

      /* Clear canvas. */
      this.ctx.clearRect(0, 0, this.width, this.height);

      /* Additive blending.*/
      this.ctx.globalCompositeOperation = 'lighter';

      /* Update and render.*/
      for (const particle of this.particles) {
        particle.update(delta, time);
        particle.draw(this.ctx);
      }

      this.ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame((t) => this.animate(t));
    }
  }

  /* Initialize */

  const container = document.createElement('div');
  container.classList = 'scene';

  const canvas = document.createElement('canvas');
  canvas.id = 'fireCanvas';

  const groundGlow = document.createElement('div');
  groundGlow.classList = 'ground-glow';

  container.appendChild(canvas);
  container.appendChild(groundGlow);

  document.getElementById('effectContainer').appendChild(container);

  const fire = new FireParticleSystem(canvas, {
    density: 2,
    wind: 0.15,
    minSpeed: 0.35,
    maxSpeed: 0.7,
    horizontalSpeed: 0.6,
    minLife: 450,
    maxLife: 1400,
    spawnWidth: window.innerWidth * 1,
    topLimit: window.innerHeight * 0.2,
  });

  fire.start();
}

function initBirdEffect() {
  const effectContainer = document.getElementById('effectContainer');

  if (!effectContainer) return null;

  /* =========================
     SETTINGS
  ========================= */
  const MathUtils = THREE.MathUtils || THREE.Math;

  const CONFIG = {
    birdCount: 100,

    // ------------------------------------------
    // Bird size
    // ------------------------------------------

    minSize: 0.05,
    maxSize: 0.09,

    // ------------------------------------------
    // Flight
    // ------------------------------------------

    minSpeed: 0.00015,
    maxSpeed: 0.00045,

    // Front → Deep

    frontZ: 10,
    deepZ: -50,

    // ------------------------------------------
    // Flight area
    // ------------------------------------------

    worldWidth: 25,
    worldHeight: 14,

    // ------------------------------------------
    // Path movement
    // ------------------------------------------

    minWaveX: 1,
    maxWaveX: 8,

    minWaveY: 0.5,
    maxWaveY: 4,

    // ------------------------------------------
    // Wings
    // ------------------------------------------

    minFlapSpeed: 20,
    maxFlapSpeed: 40,

    minFlapAmplitude: 1,
    maxFlapAmplitude: 3,
  };

  // --------------------------------------------------
  // Scene
  // --------------------------------------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 15;

  // --------------------------------------------------
  // Renderer
  // --------------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  });
  effectContainer.appendChild(renderer.domElement);

  // --------------------------------------------------
  // Colors
  //
  // Vanta-style warm neon palette
  // --------------------------------------------------
  const COLORS = [new THREE.Color('#FFFFFF'), new THREE.Color('#D9D9D9'), new THREE.Color('#A8A8A8')];
  const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  // --------------------------------------------------
  // Bird Material
  // --------------------------------------------------
  const birdMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,

    side: THREE.DoubleSide,

    transparent: true,

    opacity: 1,
  });

  // --------------------------------------------------
  // Bird Geometry
  //
  // Abstract low-poly bird
  // --------------------------------------------------

  const createBirdGeometry = () => {
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
      // --------------------------------
      // 0 - Head / nose
      // --------------------------------
      new THREE.Vector3(5, 0, 0),

      // --------------------------------
      // 1 - Tail (upper)
      // --------------------------------
      new THREE.Vector3(-5, -2, 1),

      // --------------------------------
      // 2 - Tail (center)
      // --------------------------------
      new THREE.Vector3(-5, 0, 0),

      // --------------------------------
      // 3 - Tail (lower)
      // --------------------------------
      new THREE.Vector3(-5, -2, -1),

      // --------------------------------
      // 4 - Left wing tip (flap axis)
      // --------------------------------
      new THREE.Vector3(0, 2, -6),

      // --------------------------------
      // 5 - Right wing tip (flap axis)
      // --------------------------------
      new THREE.Vector3(0, 2, 6),

      // --------------------------------
      // 6 - Wing root (front)
      // --------------------------------
      new THREE.Vector3(2, 0, 0),

      // --------------------------------
      // 7 - Wing root (back)
      // --------------------------------
      new THREE.Vector3(-3, 0, 0),
    );

    // --------------------------------
    // Body facet
    // --------------------------------

    geometry.faces.push(new THREE.Face3(0, 2, 1));

    // --------------------------------
    // Left wing
    // --------------------------------

    geometry.faces.push(new THREE.Face3(4, 7, 6));

    // --------------------------------
    // Right wing
    // --------------------------------

    geometry.faces.push(new THREE.Face3(5, 6, 7));

    // --------------------------------
    // Random vertex colors
    // --------------------------------

    geometry.faces.forEach((face) => {
      face.vertexColors = [getRandomColor(), getRandomColor(), getRandomColor()];
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    return geometry;
  };

  // --------------------------------------------------
  // Bird Factory
  // --------------------------------------------------

  const createBird = () => {
    const geometry = createBirdGeometry();

    const bird = new THREE.Mesh(geometry, birdMaterial);

    const size = MathUtils.randFloat(CONFIG.minSize, CONFIG.maxSize);

    bird.scale.setScalar(size);

    // ------------------------------------------
    // Start position
    // ------------------------------------------

    const baseX = MathUtils.randFloat(-CONFIG.worldWidth, CONFIG.worldWidth);

    const baseY = MathUtils.randFloat(-CONFIG.worldHeight, CONFIG.worldHeight);

    // ------------------------------------------
    // Each bird has unique flight path
    // ------------------------------------------

    bird.userData = {
      baseX,

      baseY,

      size,

      phase: Math.random() * Math.PI * 2,

      speed: MathUtils.randFloat(CONFIG.minSpeed, CONFIG.maxSpeed),

      waveX: MathUtils.randFloat(CONFIG.minWaveX, CONFIG.maxWaveX),

      waveY: MathUtils.randFloat(CONFIG.minWaveY, CONFIG.maxWaveY),

      waveOffsetX: Math.random() * Math.PI * 2,

      waveOffsetY: Math.random() * Math.PI * 2,

      flapSpeed: MathUtils.randFloat(CONFIG.minFlapSpeed, CONFIG.maxFlapSpeed),

      flapAmplitude: MathUtils.randFloat(CONFIG.minFlapAmplitude, CONFIG.maxFlapAmplitude),

      flapOffset: Math.random() * Math.PI * 2,

      previousPosition: new THREE.Vector3(),
    };

    scene.add(bird);

    return bird;
  };

  // --------------------------------------------------
  // Create Birds
  // --------------------------------------------------

  const birds = Array.from(
    {
      length: CONFIG.birdCount,
    },
    createBird,
  );

  // --------------------------------------------------
  // Update Flight
  //
  // Front → Deep → Front
  // --------------------------------------------------

  const updateFlight = (bird, delta) => {
    const data = bird.userData;

    // Save previous position
    data.previousPosition.copy(bird.position);

    // Move phase

    data.phase += delta * data.speed;

    // ------------------------------------------
    // Front → Deep → Front
    //
    // cos():
    //
    //  1  → front
    //  0  → middle
    // -1  → deep
    //  0  → middle
    //  1  → front
    // ------------------------------------------

    const depthProgress = (Math.cos(data.phase) + 1) * 0.5;

    bird.position.z = CONFIG.deepZ + depthProgress * (CONFIG.frontZ - CONFIG.deepZ);

    // ------------------------------------------
    // Curved X path
    // ------------------------------------------

    bird.position.x = data.baseX + Math.sin(data.phase * 1.7 + data.waveOffsetX) * data.waveX;

    // ------------------------------------------
    // Curved Y path
    // ------------------------------------------

    bird.position.y = data.baseY + Math.cos(data.phase * 1.3 + data.waveOffsetY) * data.waveY;
  };

  // --------------------------------------------------
  // Update Rotation
  //
  // Bird always faces flight direction
  // --------------------------------------------------

  const updateRotation = (bird) => {
    const data = bird.userData;

    const velocity = new THREE.Vector3().subVectors(bird.position, data.previousPosition);

    if (velocity.lengthSq() < 0.000001) {
      return;
    }

    velocity.normalize();

    bird.rotation.y = Math.atan2(-velocity.z, velocity.x);

    bird.rotation.z = Math.asin(velocity.y);
  };

  // --------------------------------------------------
  // Wing Animation
  // --------------------------------------------------

  const updateWings = (bird, time) => {
    const data = bird.userData;

    const flap = Math.sin(time * 0.001 * data.flapSpeed + data.flapOffset) * data.flapAmplitude;

    bird.geometry.vertices[4].y = flap;
    bird.geometry.vertices[5].y = flap;

    bird.geometry.verticesNeedUpdate = true;
  };

  // --------------------------------------------------
  // Update Bird
  // --------------------------------------------------

  const updateBird = (bird, time, delta) => {
    updateFlight(bird, delta);

    updateRotation(bird);

    updateWings(bird, time);
  };

  // --------------------------------------------------
  // Animation
  // --------------------------------------------------

  let running = true;

  let animationFrameId = null;

  let previousTime = performance.now();

  const animate = (time) => {
    if (!running) {
      return;
    }

    const delta = Math.min(time - previousTime, 50);

    previousTime = time;

    for (let i = 0; i < birds.length; i++) {
      updateBird(birds[i], time, delta);
    }

    renderer.render(scene, camera);

    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  // --------------------------------------------------
  // Resize
  // --------------------------------------------------

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  // --------------------------------------------------
  // Destroy
  // --------------------------------------------------

  const destroy = () => {
    running = false;

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = null;
    }

    window.removeEventListener('resize', handleResize);

    birds.forEach((bird) => {
      bird.geometry.dispose();

      scene.remove(bird);
    });

    birds.length = 0;

    birdMaterial.dispose();

    renderer.dispose();

    if (renderer.forceContextLoss) {
      renderer.forceContextLoss();
    }

    renderer.domElement.remove();
  };

  return {
    destroy,
  };
}

function initCrowEffect() {
  const effectContainer = document.getElementById('effectContainer');

  if (!effectContainer) return null;

  /* =========================
     SETTINGS
  ========================= */
  const MathUtils = THREE.MathUtils || THREE.Math;

  const CONFIG = {
    birdCount: 60, // đàn quạ thường thưa hơn đàn chim sẻ

    // ------------------------------------------
    // Bird size
    // ------------------------------------------

    minSize: 0.08,
    maxSize: 0.14,

    // ------------------------------------------
    // Flight — left → right, units/ms
    // ------------------------------------------

    minSpeed: 0.0025,
    maxSpeed: 0.006,

    // ------------------------------------------
    // Flight area
    // ------------------------------------------

    worldWidth: 25,
    worldHeight: 14,

    depthMin: -30, // z gần nhất (trước camera)
    depthMax: -60, // z xa nhất (làm lớp parallax cho đàn)

    // ------------------------------------------
    // Path movement (undulation, không phải hướng bay)
    // ------------------------------------------

    minWaveY: 0.5,
    maxWaveY: 2.5,

    minWaveZ: 0.5,
    maxWaveZ: 2,

    // ------------------------------------------
    // Wings — vỗ chậm, khoan thai như quạ
    // ------------------------------------------

    minFlapSpeed: 6,
    maxFlapSpeed: 14,

    minFlapAmplitude: 2,
    maxFlapAmplitude: 4,
  };

  // --------------------------------------------------
  // Scene
  // --------------------------------------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 15;

  // --------------------------------------------------
  // Renderer
  // --------------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, {
    position: 'absolute',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  });
  effectContainer.appendChild(renderer.domElement);

  // --------------------------------------------------
  // Colors — lông quạ đen ánh tím/xanh navy
  // --------------------------------------------------
  const COLORS = [
    new THREE.Color('#0A0A0C'),
    new THREE.Color('#1C1B22'),
    new THREE.Color('#232838'),
  ];
  const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };

  // --------------------------------------------------
  // Bird Material
  // --------------------------------------------------
  const birdMaterial = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  // --------------------------------------------------
  // Bird Geometry
  //
  // Crow shape — đuôi xẻ hình quạt, cánh dài nhọn
  // --------------------------------------------------

  const createBirdGeometry = () => {
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
      // 0 - Head / nose
      new THREE.Vector3(4.5, 0, 0),

      // 1 - Tail tip (upper)
      new THREE.Vector3(-6, -1.5, 1.8),

      // 2 - Tail center
      new THREE.Vector3(-4.5, 0, 0),

      // 3 - Tail tip (lower)
      new THREE.Vector3(-6, -1.5, -1.8),

      // 4 - Left wing tip (flap axis)
      new THREE.Vector3(-1, 1.5, -8),

      // 5 - Right wing tip (flap axis)
      new THREE.Vector3(-1, 1.5, 8),

      // 6 - Wing root (front)
      new THREE.Vector3(2, 0, 0),

      // 7 - Wing root (back)
      new THREE.Vector3(-3.5, 0, 0),
    );

    // Thân trên + thân dưới (đầy hơn, đúng dáng quạ to)
    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(0, 3, 2));

    // Cánh trái / phải
    geometry.faces.push(new THREE.Face3(4, 7, 6));
    geometry.faces.push(new THREE.Face3(5, 6, 7));

    geometry.faces.forEach((face) => {
      face.vertexColors = [getRandomColor(), getRandomColor(), getRandomColor()];
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    return geometry;
  };

  // --------------------------------------------------
  // Bird Factory
  // --------------------------------------------------

  const flyBound = CONFIG.worldWidth * 4; // biên ẩn/hiện ngoài khung hình

  const randomizeSpawn = (data, initial = false) => {
    // initial = true → rải rác khắp đường bay để có đàn ngay từ đầu
    data.x = initial ? MathUtils.randFloat(-flyBound, flyBound) : -flyBound;
    data.baseY = MathUtils.randFloat(-CONFIG.worldHeight, CONFIG.worldHeight);
    data.baseZ = MathUtils.randFloat(CONFIG.depthMax, CONFIG.depthMin);
    data.speed = MathUtils.randFloat(CONFIG.minSpeed, CONFIG.maxSpeed);
    data.waveY = MathUtils.randFloat(CONFIG.minWaveY, CONFIG.maxWaveY);
    data.waveOffsetY = Math.random() * Math.PI * 2;
    data.waveZ = MathUtils.randFloat(CONFIG.minWaveZ, CONFIG.maxWaveZ);
    data.waveOffsetZ = Math.random() * Math.PI * 2;
  };

  const createBird = () => {
    const geometry = createBirdGeometry();

    const bird = new THREE.Mesh(geometry, birdMaterial);

    const size = MathUtils.randFloat(CONFIG.minSize, CONFIG.maxSize);

    bird.scale.setScalar(size);

    bird.userData = {
      size,

      flapSpeed: MathUtils.randFloat(CONFIG.minFlapSpeed, CONFIG.maxFlapSpeed),
      flapAmplitude: MathUtils.randFloat(CONFIG.minFlapAmplitude, CONFIG.maxFlapAmplitude),
      flapOffset: Math.random() * Math.PI * 2,

      previousPosition: new THREE.Vector3(),
    };

    randomizeSpawn(bird.userData, true);

    bird.position.set(bird.userData.x, bird.userData.baseY, bird.userData.baseZ);

    scene.add(bird);

    return bird;
  };

  // --------------------------------------------------
  // Create Birds
  // --------------------------------------------------

  const birds = Array.from(
    {
      length: CONFIG.birdCount,
    },
    createBird,
  );

  // --------------------------------------------------
  // Update Flight
  //
  // Trái → Phải, có undulation nhẹ trên Y/Z để trông tự nhiên
  // --------------------------------------------------

  const updateFlight = (bird, time, delta) => {
    const data = bird.userData;

    data.previousPosition.copy(bird.position);

    // Di chuyển ngang từ trái sang phải
    data.x += delta * data.speed;

    // Hết đường bay → respawn lại từ mép trái, làm mới quỹ đạo
    if (data.x > flyBound) {
      randomizeSpawn(data, false);
    }

    bird.position.x = data.x;

    // Gợn sóng nhẹ theo trục Y (bay lên xuống tự nhiên)
    bird.position.y = data.baseY + Math.sin(time * 0.0006 + data.waveOffsetY) * data.waveY;

    // Gợn sóng nhẹ theo trục Z (tạo cảm giác chiều sâu, không phá vỡ hướng bay ngang)
    bird.position.z = data.baseZ + Math.sin(time * 0.0004 + data.waveOffsetZ) * data.waveZ;
  };

  // --------------------------------------------------
  // Update Rotation
  //
  // Bird always faces flight direction
  // --------------------------------------------------

  const updateRotation = (bird) => {
    const data = bird.userData;

    const velocity = new THREE.Vector3().subVectors(bird.position, data.previousPosition);

    if (velocity.lengthSq() < 0.000001) {
      return;
    }

    velocity.normalize();

    bird.rotation.y = Math.atan2(-velocity.z, velocity.x);

    bird.rotation.z = Math.asin(velocity.y);
  };

  // --------------------------------------------------
  // Wing Animation
  // --------------------------------------------------

  const updateWings = (bird, time) => {
    const data = bird.userData;

    const flap = Math.sin(time * 0.001 * data.flapSpeed + data.flapOffset) * data.flapAmplitude;

    bird.geometry.vertices[4].y = flap;
    bird.geometry.vertices[5].y = flap;

    bird.geometry.verticesNeedUpdate = true;
  };

  // --------------------------------------------------
  // Update Bird
  // --------------------------------------------------

  const updateBird = (bird, time, delta) => {
    updateFlight(bird, time, delta);

    updateRotation(bird);

    updateWings(bird, time);
  };

  // --------------------------------------------------
  // Animation
  // --------------------------------------------------

  let running = true;

  let animationFrameId = null;

  let previousTime = performance.now();

  const animate = (time) => {
    if (!running) {
      return;
    }

    const delta = Math.min(time - previousTime, 50);

    previousTime = time;

    for (let i = 0; i < birds.length; i++) {
      updateBird(birds[i], time, delta);
    }

    renderer.render(scene, camera);

    animationFrameId = requestAnimationFrame(animate);
  };

  animationFrameId = requestAnimationFrame(animate);

  // --------------------------------------------------
  // Resize
  // --------------------------------------------------

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  // --------------------------------------------------
  // Destroy
  // --------------------------------------------------

  const destroy = () => {
    running = false;

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = null;
    }

    window.removeEventListener('resize', handleResize);

    birds.forEach((bird) => {
      bird.geometry.dispose();

      scene.remove(bird);
    });

    birds.length = 0;

    birdMaterial.dispose();

    renderer.dispose();

    if (renderer.forceContextLoss) {
      renderer.forceContextLoss();
    }

    renderer.domElement.remove();
  };

  return {
    destroy,
  };
}



/* ════════════════════════════════════════════════════════════
  FIREFLY EFFECT
════════════════════════════════════════════════════════════ */

function createFireflies(cfg) {
  const container = document.getElementById('effectContainer');
  const fragment = document.createElement('div');
  fragment.className = "fireflies-container";

  for (let i = 0; i < cfg.count; i++) {
    const firefly = document.createElement('span');
    const fireSize = random(cfg.size.min, cfg.size.max);

    firefly.style.cssText = `
      left:${random(cfg.position.minX, cfg.position.maxX)}%;
      top:${random(cfg.position.minY, cfg.position.maxY)}%;
      width:${fireSize}px;
      height:${fireSize}px;
      animation-duration: ${random(cfg.movement.durationMin, cfg.movement.durationMax)}s, ${random(1.5, 3)}s;
      animation-delay: ${random(cfg.delay.min, cfg.delay.max)}s;
      --move-x: ${random(-cfg.movement.distanceX, cfg.movement.distanceX)}px;
      --move-y: ${random(-cfg.movement.distanceY, cfg.movement.distanceY)}px;
    `;

    fragment.appendChild(firefly);
  }

  container.appendChild(fragment);
}
