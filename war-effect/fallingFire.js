// ─── Canvas setup ────────────────────────────────────────────────────────────
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { alpha: true });
let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// ─── Config ──────────────────────────────────────────────────────────────────
const MAX_PARTICLES = 100; // steady-state particle count
const SPAWN_PER_FRAME = 2; // max new particles added per frame

// ─── Helpers ─────────────────────────────────────────────────────────────────
const rnd = (a, b) => a + Math.random() * (b - a);
const rndI = (a, b) => Math.floor(rnd(a, b + 1));

// ─── FireParticle ─────────────────────────────────────────────────────────────
class FireParticle {
  constructor() {
    this.init();
  }

  init() {
    // Spawn just above the top edge, spread across full width
    this.x = rnd(-60, W + 60);
    this.y = rnd(-80, -10);

    // 55% chance spark (small), otherwise ember (large)
    const isSpark = Math.random() < 0.55;
    this.type = isSpark ? 'spark' : 'ember';
    this.r = isSpark ? rnd(1, 3.5) : rnd(3.5, 9);

    // Velocity — mostly downward with a slight random angle
    const speed = rnd(1.8, 6.5);
    const angle = rnd(-0.35, 0.35); // radians from vertical
    this.vx = Math.sin(angle) * speed + rnd(-0.6, 0.6);
    this.vy = Math.cos(angle) * speed;

    // Per-particle sine-wave turbulence (horizontal wobble)
    this.wobbleAmp = rnd(0.3, 1.8);
    this.wobbleFreq = rnd(0.03, 0.09);
    this.wobbleOff = rnd(0, Math.PI * 2);

    // Rotation — embers tumble as they fall
    this.rot = rnd(0, Math.PI * 2);
    this.rotSpeed = rnd(-0.12, 0.12);

    // Lifespan (1 → 0)
    this.life = 1.0;
    this.decay = rnd(0.004, 0.012);

    // Colour — orange-red temperature range
    this.hue = rndI(10, 38);
    this.sat = rndI(85, 100);

    // Light trail history
    this.trail = [];
    this.trailMax = isSpark ? rndI(5, 12) : rndI(3, 7);

    // Glow radius relative to particle size
    this.glowMul = rnd(1.8, 4.5);

    // Ember-specific: irregular polygon shape
    this.sides = rndI(3, 7);
    this.flare = rnd(0.3, 0.7);
  }

  update(frame) {
    // Save position to trail buffer
    this.trail.push({ x: this.x, y: this.y, r: this.r * 0.85 });
    if (this.trail.length > this.trailMax) this.trail.shift();

    // Horizontal turbulence via sine wave
    this.vx += Math.sin(frame * this.wobbleFreq + this.wobbleOff) * this.wobbleAmp * 0.04;

    // Air resistance
    this.vx *= 0.995;
    this.vy *= 0.998;

    // Gravity
    this.vy += 0.08;

    this.x += this.vx;
    this.y += this.vy;
    this.rot += this.rotSpeed;
    this.life -= this.decay;

    // Fade out faster near the bottom so particles vanish cleanly
    if (this.y > H * 0.85) this.life -= 0.025;

    return this.life > 0 && this.y < H + 20;
  }

  draw() {
    const alpha = Math.max(0, Math.min(1, this.life));

    // --- Trail ---
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      const tAlpha = (i / this.trail.length) * alpha * 0.45;
      const tRadius = t.r * (i / this.trail.length) * 0.9;
      if (tRadius < 0.2) continue;

      const grad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, tRadius * 2);
      grad.addColorStop(0, `hsla(${this.hue + 10},100%,85%,0.9)`);
      grad.addColorStop(0.4, `hsla(${this.hue},${this.sat}%,60%,0.6)`);
      grad.addColorStop(1, `hsla(${this.hue - 10},90%,30%,0)`);

      ctx.save();
      ctx.globalAlpha = tAlpha;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(t.x, t.y, tRadius * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);

    // --- Outer glow halo ---
    const glowRadius = this.r * this.glowMul;
    const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
    glowGrad.addColorStop(0, `hsla(${this.hue + 15},100%,90%,${alpha * 0.55})`);
    glowGrad.addColorStop(0.3, `hsla(${this.hue},${this.sat}%,65%,${alpha * 0.3})`);
    glowGrad.addColorStop(0.7, `hsla(${this.hue - 5},85%,40%,${alpha * 0.1})`);
    glowGrad.addColorStop(1, `hsla(${this.hue - 10},80%,20%,0)`);
    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = alpha;

    // --- Core body ---
    if (this.type === 'spark') {
      // Teardrop stretched along velocity direction
      const coreGrad = ctx.createRadialGradient(0, -this.r * 0.3, 0, 0, 0, this.r);
      coreGrad.addColorStop(0, `hsla(60,100%,98%,1)`);
      coreGrad.addColorStop(0.25, `hsla(${this.hue + 20},100%,85%,1)`);
      coreGrad.addColorStop(0.6, `hsla(${this.hue},${this.sat}%,65%,0.9)`);
      coreGrad.addColorStop(1, `hsla(${this.hue - 10},80%,35%,0)`);
      ctx.fillStyle = coreGrad;
      ctx.scale(1, Math.min(3.5, 1 + Math.hypot(this.vx, this.vy) * 0.25));
      ctx.beginPath();
      ctx.arc(0, 0, this.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Irregular star polygon for a chunky ember look
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r);
      coreGrad.addColorStop(0, `hsla(55,100%,98%,1)`);
      coreGrad.addColorStop(0.2, `hsla(${this.hue + 25},100%,80%,1)`);
      coreGrad.addColorStop(0.55, `hsla(${this.hue},${this.sat}%,60%,0.95)`);
      coreGrad.addColorStop(0.85, `hsla(${this.hue - 8},85%,35%,0.7)`);
      coreGrad.addColorStop(1, `hsla(${this.hue - 15},75%,15%,0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      for (let i = 0; i < this.sides; i++) {
        const aOuter = (i / this.sides) * Math.PI * 2;
        const aInner = ((i + 0.5) / this.sides) * Math.PI * 2;
        const rOuter = this.r * rnd(0.75, 1.15);
        const rInner = this.r * this.flare * rnd(0.7, 1.1);
        i === 0
          ? ctx.moveTo(Math.cos(aOuter) * rOuter, Math.sin(aOuter) * rOuter)
          : ctx.lineTo(Math.cos(aOuter) * rOuter, Math.sin(aOuter) * rOuter);
        ctx.lineTo(Math.cos(aInner) * rInner, Math.sin(aInner) * rInner);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}

// ─── Clear frame ─────────────────────────────────────────────────────────────
function clearFrame() {
  ctx.clearRect(0, 0, W, H); // fully transparent each frame
}

// ─── Particle pool ───────────────────────────────────────────────────────────
let particles = [];

function spawnIfNeeded() {
  const count = Math.min(MAX_PARTICLES - particles.length, SPAWN_PER_FRAME);
  for (let i = 0; i < count; i++) particles.push(new FireParticle());
}

// ─── Main loop ───────────────────────────────────────────────────────────────
let frame = 0;

(function loop() {
  requestAnimationFrame(loop);
  frame++;
  clearFrame();
  spawnIfNeeded();
  particles = particles.filter((p) => {
    const alive = p.update(frame);
    if (alive) p.draw();
    return alive;
  });
})();
