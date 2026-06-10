/* ════════════════════════════════════════════════════════════
    SPACESHIP CLASSES
════════════════════════════════════════════════════════════ */

class StarField {
  constructor(count = 240, width, height, ctx) {
    this.stars = [];
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.generate(count);
  }

  generate(count) {
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius: Math.random() * 1.3 + 0.2,
      alpha: Math.random(),
      alphaSpeed: (Math.random() * 0.006 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    }));
  }

  update() {
    this.stars.forEach((star) => {
      star.alpha = Math.max(0.05, Math.min(1, star.alpha + star.alphaSpeed));
      if (star.alpha <= 0.05 || star.alpha >= 1) star.alphaSpeed *= -1;
    });
  }

  draw() {
    this.stars.forEach((star) => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(190, 215, 255, ${star.alpha})`;
      this.ctx.fill();
    });
  }
}

class Spaceship {
  constructor(ctx) {
    this.ctx = ctx;
    this.emojiRotationOffset = 1.11;
  }

  draw(x, y, angle) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle + this.emojiRotationOffset);
    this.drawEngineGlow();
    this.ctx.font = '32px serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('🚀', 0, 0);
    this.ctx.restore();
  }

  drawEngineGlow() {
    const gradient = this.ctx.createRadialGradient(0, 18, 1, 0, 20, 28);
    gradient.addColorStop(0, 'rgba(80, 190, 255, 0.6)');
    gradient.addColorStop(0.5, 'rgba(100, 140, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 60, 200, 0)');
    this.ctx.beginPath();
    this.ctx.arc(0, 18, 28, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
}

class FlightTrail {
  constructor(ctx, maxLength = 95) {
    this.ctx = ctx;
    this.points = [];
    this.maxLength = maxLength;
    this.fadeRate = 0.974;
  }

  add(x, y, phase) {
    this.points.push({ x, y, alpha: 1, phase });
    if (this.points.length > this.maxLength) this.points.shift();
  }

  update() {
    this.points.forEach((point) => {
      point.alpha *= this.fadeRate;
    });
  }

  draw() {
    if (this.points.length < 2) return;
    for (let i = 1; i < this.points.length; i++) {
      const current = this.points[i];
      const previous = this.points[i - 1];
      const progress = i / this.points.length;
      const color = this.getPhaseColor(current.phase);
      this.ctx.beginPath();
      this.ctx.moveTo(previous.x, previous.y);
      this.ctx.lineTo(current.x, current.y);
      this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${current.alpha * progress * 0.85})`;
      this.ctx.lineWidth = progress * 4.5;
      this.ctx.lineCap = 'round';
      this.ctx.stroke();
    }
  }

  getPhaseColor(phase) {
    const colors = {
      enter: { r: 80, g: 200, b: 255 },
      orbit: { r: 255, g: 160, b: 55 },
      exit: { r: 150, g: 255, b: 120 },
    };
    return colors[phase] || colors.enter;
  }

  clear() {
    this.points = [];
  }
}

class OrbitRing {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(cx, cy, radius, alpha) {
    if (alpha <= 0) return;
    this.ctx.save();
    this.ctx.globalAlpha = alpha * 0.38;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(255, 160, 55, 0.75)';
    this.ctx.setLineDash([5, 9]);
    this.ctx.lineDashOffset = -(Date.now() * 0.045);
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.restore();
  }
}

class SpeedLines {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(x, y, angle, intensity) {
    for (let i = 0; i < 8; i++) {
      const lineAngle = angle + Math.PI + (Math.random() - 0.5) * 0.5;
      const length = 20 + Math.random() * 60 * intensity;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + Math.cos(lineAngle) * length, y + Math.sin(lineAngle) * length);
      this.ctx.strokeStyle = `rgba(150, 255, 120, ${0.14 * intensity})`;
      this.ctx.lineWidth = Math.random() * 1.3 + 0.3;
      this.ctx.stroke();
    }
  }
}

class BezierCurve {
  static getPoint(p0, p1, p2, p3, t) {
    const mt = 1 - t,
      mt2 = mt * mt,
      mt3 = mt2 * mt,
      t2 = t * t,
      t3 = t2 * t;
    return {
      x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
      y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
    };
  }

  static getDerivative(p0, p1, p2, p3, t) {
    const mt = 1 - t,
      mt2 = mt * mt,
      t2 = t * t;
    return {
      x: 3 * (mt2 * (p1.x - p0.x) + 2 * mt * t * (p2.x - p1.x) + t2 * (p3.x - p2.x)),
      y: 3 * (mt2 * (p1.y - p0.y) + 2 * mt * t * (p2.y - p1.y) + t2 * (p3.y - p2.y)),
    };
  }
}

class FlightPath {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.generate();
  }

  generate() {
    this.orbitCenter = this.getRandomOrbitCenter();
    this.orbitRadius = Math.min(this.width, this.height) * (0.12 + Math.random() * 0.12);
    this.startPoint = this.getRandomEdgePoint();
    this.endPoint = this.getRandomEdgePoint();
    this.entryAngle = Math.random() * Math.PI * 2;
    this.loopCount = 2;
    this.exitAngle = this.entryAngle + this.loopCount * Math.PI * 2;
    this.entryPoint = this.getOrbitPoint(this.entryAngle);
    this.exitPoint = this.getOrbitPoint(this.exitAngle);
    this.entryTangent = this.getOrbitTangent(this.entryAngle);
    this.exitTangent = this.getOrbitTangent(this.exitAngle);
    this.buildEntryCurve();
    this.buildExitCurve();
  }

  getRandomEdgePoint() {
    const edge = Math.floor(Math.random() * 4);
    const p = 80;
    switch (edge) {
      case 0:
        return { x: Math.random() * this.width, y: -p };
      case 1:
        return { x: this.width + p, y: Math.random() * this.height };
      case 2:
        return { x: Math.random() * this.width, y: this.height + p };
      case 3:
        return { x: -p, y: Math.random() * this.height };
    }
  }

  getRandomOrbitCenter() {
    const margin = Math.min(this.width, this.height) * 0.25;
    return {
      x: margin + Math.random() * (this.width - margin * 2),
      y: margin + Math.random() * (this.height - margin * 2),
    };
  }

  getOrbitPoint(angle) {
    return {
      x: this.orbitCenter.x + Math.cos(angle) * this.orbitRadius,
      y: this.orbitCenter.y + Math.sin(angle) * this.orbitRadius,
    };
  }

  getOrbitTangent(angle) {
    return { x: -Math.sin(angle), y: Math.cos(angle) };
  }

  buildEntryCurve() {
    const dist = Math.hypot(this.entryPoint.x - this.startPoint.x, this.entryPoint.y - this.startPoint.y);
    const cl = dist * 0.5;
    this.entryCurve = [
      this.startPoint,
      {
        x: this.startPoint.x + (this.entryPoint.x - this.startPoint.x) * 0.4,
        y: this.startPoint.y + (this.entryPoint.y - this.startPoint.y) * 0.4,
      },
      { x: this.entryPoint.x - this.entryTangent.x * cl * 0.6, y: this.entryPoint.y - this.entryTangent.y * cl * 0.6 },
      this.entryPoint,
    ];
  }

  buildExitCurve() {
    const dist = Math.hypot(this.endPoint.x - this.exitPoint.x, this.endPoint.y - this.exitPoint.y);
    const cl = dist * 0.5;
    this.exitCurve = [
      this.exitPoint,
      { x: this.exitPoint.x + this.exitTangent.x * cl * 0.6, y: this.exitPoint.y + this.exitTangent.y * cl * 0.6 },
      {
        x: this.endPoint.x - (this.endPoint.x - this.exitPoint.x) * 0.35,
        y: this.endPoint.y - (this.endPoint.y - this.exitPoint.y) * 0.35,
      },
      this.endPoint,
    ];
  }
}

class FlightAnimation {
  constructor(ctx, width, height, starField) {
    this.ctx = ctx;
    this.starField = starField;
    this.ENTER_END = 0.22;
    this.ORBIT_END = 0.78;
    this.TOTAL_DURATION = 5.5;
    this.RESTART_DELAY = 1500;
    this.time = 0;
    this.phase = 'enter';
    this.lastTimestamp = null;
    this.path = new FlightPath(width, height);
    this.trail = new FlightTrail(ctx);
    this.ship = new Spaceship(ctx);
    this.orbitRing = new OrbitRing(ctx);
    this.speedLines = new SpeedLines(ctx);
  }

  getCurrentPhase() {
    if (this.time <= this.ENTER_END) return 'enter';
    if (this.time <= this.ORBIT_END) return 'orbit';
    return 'exit';
  }

  getPosition(t) {
    if (t <= this.ENTER_END) {
      return BezierCurve.getPoint(...this.path.entryCurve, t / this.ENTER_END);
    } else if (t <= this.ORBIT_END) {
      const progress = (t - this.ENTER_END) / (this.ORBIT_END - this.ENTER_END);
      const angle = this.path.entryAngle + progress * this.path.loopCount * Math.PI * 2;
      return {
        x: this.path.orbitCenter.x + Math.cos(angle) * this.path.orbitRadius,
        y: this.path.orbitCenter.y + Math.sin(angle) * this.path.orbitRadius,
      };
    } else {
      return BezierCurve.getPoint(...this.path.exitCurve, (t - this.ORBIT_END) / (1 - this.ORBIT_END));
    }
  }

  getAngle(t) {
    let d;
    if (t <= this.ENTER_END) {
      d = BezierCurve.getDerivative(...this.path.entryCurve, t / this.ENTER_END);
    } else if (t <= this.ORBIT_END) {
      const progress = (t - this.ENTER_END) / (this.ORBIT_END - this.ENTER_END);
      const angle = this.path.entryAngle + progress * this.path.loopCount * Math.PI * 2;
      d = { x: -Math.sin(angle) * this.path.orbitRadius, y: Math.cos(angle) * this.path.orbitRadius };
    } else {
      d = BezierCurve.getDerivative(...this.path.exitCurve, (t - this.ORBIT_END) / (1 - this.ORBIT_END));
    }
    return Math.atan2(d.y, d.x);
  }

  getOrbitRingAlpha() {
    if (this.time <= this.ENTER_END) return this.time / this.ENTER_END;
    if (this.time <= this.ORBIT_END) return 1;
    return 1 - (this.time - this.ORBIT_END) / (1 - this.ORBIT_END);
  }

  update(deltaTime) {
    if (this.time < 1) {
      this.time = Math.min(this.time + deltaTime / this.TOTAL_DURATION, 1);
      this.phase = this.getCurrentPhase();
      const position = this.getPosition(this.time);
      const angle = this.getAngle(this.time);
      this.trail.add(position.x, position.y, this.phase);
      this.trail.update();
      return { position, angle };
    }
    return null;
  }

  restart(width, height) {
    setTimeout(() => {
      this.path = new FlightPath(width, height);
      this.starField.generate(240);
      this.time = 0;
      this.phase = 'enter';
      this.lastTimestamp = null;
      this.trail.clear();
    }, this.RESTART_DELAY);
  }
}
