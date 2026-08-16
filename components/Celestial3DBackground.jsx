'use client';

import React, { useEffect, useRef } from 'react';

export default function Celestial3DBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.0004;
      targetMouseY = (e.clientY - height / 2) * 0.0004;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const focalLength = 500;

    // =========================================================================
    // 9 VEDIC PLANETS (NAVAGRAHAS) WITH REALISTIC TEXTURING & LIGHTING
    // =========================================================================
    const planets = [
      {
        id: 'surya',
        name: 'Surya',
        tamil: 'சூரியன்',
        orbitRadiusX: 0,
        orbitRadiusY: 0,
        speed: 0,
        size: 38,
        color: '#f59e0b',
        glowColor: 'rgba(245, 158, 11, 0.65)',
        isSun: true,
        angle: 0,
      },
      {
        id: 'chandra',
        name: 'Chandra',
        tamil: 'சந்திரன்',
        orbitRadiusX: 145,
        orbitRadiusY: 65,
        speed: 0.014,
        size: 10,
        color: '#e2e8f0',
        glowColor: 'rgba(226, 232, 240, 0.6)',
        type: 'moon',
        tilt: 0.2,
        angle: 0.5,
      },
      {
        id: 'budha',
        name: 'Budha',
        tamil: 'புதன்',
        orbitRadiusX: 235,
        orbitRadiusY: 105,
        speed: 0.0105,
        size: 9,
        color: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.55)',
        type: 'rocky',
        tilt: -0.15,
        angle: 1.8,
      },
      {
        id: 'shukra',
        name: 'Shukra',
        tamil: 'சுக்கிரன்',
        orbitRadiusX: 335,
        orbitRadiusY: 148,
        speed: 0.008,
        size: 13,
        color: '#fda4af',
        glowColor: 'rgba(253, 164, 175, 0.6)',
        type: 'venus_clouds',
        tilt: 0.25,
        angle: 3.2,
      },
      {
        id: 'mangala',
        name: 'Mangala',
        tamil: 'செவ்வாய்',
        orbitRadiusX: 445,
        orbitRadiusY: 195,
        speed: 0.0062,
        size: 11.5,
        color: '#ef4444',
        glowColor: 'rgba(239, 68, 68, 0.65)',
        type: 'mars',
        tilt: -0.22,
        angle: 4.6,
      },
      {
        id: 'guru',
        name: 'Guru',
        tamil: 'குரு',
        orbitRadiusX: 565,
        orbitRadiusY: 245,
        speed: 0.0042,
        size: 21,
        color: '#f59e0b',
        glowColor: 'rgba(245, 158, 11, 0.6)',
        type: 'jupiter_bands',
        tilt: 0.18,
        angle: 2.1,
      },
      {
        id: 'shani',
        name: 'Shani',
        tamil: 'சனி',
        orbitRadiusX: 695,
        orbitRadiusY: 300,
        speed: 0.0032,
        size: 18,
        color: '#60a5fa',
        glowColor: 'rgba(96, 165, 250, 0.6)',
        hasRings: true,
        type: 'saturn',
        tilt: -0.32,
        angle: 5.4,
      },
      {
        id: 'rahu',
        name: 'Rahu',
        tamil: 'ராகு',
        orbitRadiusX: 815,
        orbitRadiusY: 350,
        speed: -0.0024,
        size: 13.5,
        color: '#a855f7',
        glowColor: 'rgba(168, 85, 247, 0.55)',
        type: 'shadow_node',
        tilt: 0.35,
        angle: 0.9,
      },
      {
        id: 'ketu',
        name: 'Ketu',
        tamil: 'கேது',
        orbitRadiusX: 925,
        orbitRadiusY: 395,
        speed: -0.0024,
        size: 12.5,
        color: '#fb923c',
        glowColor: 'rgba(251, 146, 60, 0.6)',
        hasTail: true,
        type: 'comet_node',
        tilt: -0.35,
        angle: 0.9 + Math.PI,
      },
    ];

    // =========================================================================
    // DEEP GALAXY STARFIELD & NEBULA PARTICLES
    // =========================================================================
    const numStars = 130;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1000 - 500,
        baseRadius: Math.random() * 2.2 + 0.8,
        color:
          Math.random() > 0.6
            ? '245, 158, 11' // Golden Stardust
            : Math.random() > 0.3
            ? '255, 255, 255' // Diamond Star
            : '147, 197, 253', // Azure Star
        speedZ: Math.random() * 0.2 + 0.1,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Dynamic Shooting Stars
    const shootingStars = [];
    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        len: Math.random() * 90 + 50,
        speed: Math.random() * 12 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
      });
    };

    // Nebula Clouds
    const nebulaClouds = [
      { x: 0.25, y: 0.3, radius: 450, color: 'rgba(217, 119, 6, 0.04)' },
      { x: 0.75, y: 0.4, radius: 520, color: 'rgba(147, 51, 234, 0.035)' },
      { x: 0.5, y: 0.7, radius: 480, color: 'rgba(59, 130, 246, 0.035)' },
    ];

    let time = 0;

    const render = () => {
      time += 0.016;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw Deep Space Nebula Gas Clouds
      nebulaClouds.forEach((neb) => {
        const nx = width * neb.x + mouseX * 80;
        const ny = height * neb.y + mouseY * 80;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, neb.radius);
        grad.addColorStop(0, neb.color);
        grad.addColorStop(0.6, neb.color.replace(/[\d\.]+\)$/, '0.015)'));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw 3D Galactic Stars with Twinkling
      stars.forEach((s) => {
        s.z -= s.speedZ;
        if (s.z < -focalLength + 50) {
          s.z = 500;
          s.x = (Math.random() - 0.5) * 2200;
          s.y = (Math.random() - 0.5) * 2200;
        }

        const rotX = s.x * Math.cos(mouseX) - s.z * Math.sin(mouseX);
        const rotZ = s.x * Math.sin(mouseX) + s.z * Math.cos(mouseX);
        const rotY = s.y * Math.cos(mouseY) - rotZ * Math.sin(mouseY);

        const scale = focalLength / (focalLength + rotZ + 550);
        if (scale <= 0) return;

        const projX = centerX + rotX * scale;
        const projY = centerY + rotY * scale;

        if (projX < -50 || projX > width + 50 || projY < -50 || projY > height + 50) {
          return;
        }

        const pulse = Math.sin(time * s.pulseSpeed * 60 + s.pulseOffset);
        const radius = Math.max(0.7, (s.baseRadius + pulse * 0.6) * scale);
        const alpha = Math.min(0.85, Math.max(0.12, scale * 0.75 + pulse * 0.2));

        ctx.fillStyle = `rgba(${s.color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Shooting Stars / Meteors
      if (Math.random() < 0.012 && shootingStars.length < 3) {
        createShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.018;

        if (ss.opacity <= 0 || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const sGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        sGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        sGrad.addColorStop(0.3, `rgba(245, 158, 11, ${ss.opacity * 0.7})`);
        sGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

        ctx.strokeStyle = sGrad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      // 4. Draw 3D Celestial Orbital Rings
      const ringTilt = 0.52 + mouseY * 0.8;
      const ringPan = mouseX * 0.8;

      planets.forEach((planet) => {
        if (planet.orbitRadiusX > 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.14)';
          ctx.lineWidth = 1.2;

          const steps = 72;
          for (let i = 0; i <= steps; i++) {
            const th = (i / steps) * Math.PI * 2;
            let ox = Math.cos(th) * planet.orbitRadiusX;
            let oy = Math.sin(th) * planet.orbitRadiusY;
            let oz = Math.sin(th) * (planet.orbitRadiusX * 0.28);

            const cosT = Math.cos(ringTilt + (planet.tilt || 0));
            const sinT = Math.sin(ringTilt + (planet.tilt || 0));
            const cosP = Math.cos(ringPan);
            const sinP = Math.sin(ringPan);

            const rx = ox * cosP - oz * sinP;
            const rz = ox * sinP + oz * cosP;
            const ry = oy * cosT - rz * sinT;
            const finalZ = oy * sinT + rz * cosT;

            const scale = focalLength / (focalLength + finalZ + 480);
            const px = centerX + rx * scale;
            const py = centerY + ry * scale;

            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }
      });

      // 5. Compute 3D Positions for 9 Planets and Sort by Z-depth
      const projectedPlanets = [];

      planets.forEach((planet) => {
        planet.angle += planet.speed;

        let ox = Math.cos(planet.angle) * planet.orbitRadiusX;
        let oy = Math.sin(planet.angle) * planet.orbitRadiusY;
        let oz = Math.sin(planet.angle) * (planet.orbitRadiusX * 0.28);

        const cosT = Math.cos(ringTilt + (planet.tilt || 0));
        const sinT = Math.sin(ringTilt + (planet.tilt || 0));
        const cosP = Math.cos(ringPan);
        const sinP = Math.sin(ringPan);

        const rx = ox * cosP - oz * sinP;
        const rz = ox * sinP + oz * cosP;
        const ry = oy * cosT - rz * sinT;
        const finalZ = oy * sinT + rz * cosT;

        const scale = focalLength / (focalLength + finalZ + 480);
        const px = centerX + rx * scale;
        const py = centerY + ry * scale;

        projectedPlanets.push({
          ...planet,
          x: px,
          y: py,
          z: finalZ,
          scale,
        });
      });

      // Sort back to front
      projectedPlanets.sort((a, b) => b.z - a.z);

      // 6. Render Realistic Planets & Sun
      projectedPlanets.forEach((p) => {
        const radius = Math.max(3, p.size * p.scale);
        const glowRadius = radius * (p.isSun ? 5.8 : 3.6);

        // Ambient Planetary Glow Halo
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glowGrad.addColorStop(0, p.glowColor);
        glowGrad.addColorStop(0.4, p.glowColor.replace(/[\d\.]+\)$/, '0.2)'));
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // ---------------------------------------------------------------------
        // SUN (SURYA) - REALISTIC SOLAR PLASMA & FLARES
        // ---------------------------------------------------------------------
        if (p.isSun) {
          const pulse = Math.sin(time * 2.5) * 8;
          const coronaGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            radius * 0.8,
            p.x,
            p.y,
            glowRadius + pulse + 25
          );
          coronaGrad.addColorStop(0, 'rgba(254, 243, 199, 0.9)');
          coronaGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.45)');
          coronaGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.15)');
          coronaGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius + pulse + 25, 0, Math.PI * 2);
          ctx.fill();

          // Sun Core Texture
          const sunCore = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            radius
          );
          sunCore.addColorStop(0, '#ffffff');
          sunCore.addColorStop(0.3, '#fef08a');
          sunCore.addColorStop(0.7, '#f59e0b');
          sunCore.addColorStop(1, '#b45309');

          ctx.fillStyle = sunCore;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        // ---------------------------------------------------------------------
        // KETU COMET TAIL
        // ---------------------------------------------------------------------
        if (p.hasTail) {
          const tailLen = 50 * p.scale;
          const tailGrad = ctx.createLinearGradient(
            p.x,
            p.y,
            p.x - Math.cos(p.angle) * tailLen,
            p.y - Math.sin(p.angle) * (tailLen * 0.5)
          );
          tailGrad.addColorStop(0, 'rgba(251, 146, 60, 0.8)');
          tailGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.35)');
          tailGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');

          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = radius * 1.6;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(
            p.x - Math.cos(p.angle) * tailLen,
            p.y - Math.sin(p.angle) * (tailLen * 0.5)
          );
          ctx.stroke();
        }

        // ---------------------------------------------------------------------
        // SATURN RINGS (SHANI)
        // ---------------------------------------------------------------------
        if (p.hasRings) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(0.38 + ringPan * 0.5);

          // Inner Dense Ring
          ctx.beginPath();
          ctx.ellipse(0, 0, radius * 2.4, radius * 0.72, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.65)';
          ctx.lineWidth = Math.max(2, 3.5 * p.scale);
          ctx.stroke();

          // Outer Ring with Cassini Division
          ctx.beginPath();
          ctx.ellipse(0, 0, radius * 3.0, radius * 0.9, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(191, 219, 254, 0.4)';
          ctx.lineWidth = Math.max(1.2, 2 * p.scale);
          ctx.stroke();
          ctx.restore();
        }

        // ---------------------------------------------------------------------
        // DIRECTIONAL 3D LIGHTING (Lit from Central Sun)
        // ---------------------------------------------------------------------
        const angleToSun = Math.atan2(centerY - p.y, centerX - p.x);
        const lightOffsetX = Math.cos(angleToSun) * radius * 0.45;
        const lightOffsetY = Math.sin(angleToSun) * radius * 0.45;

        // Base Sphere 3D Gradient
        const sphereGrad = ctx.createRadialGradient(
          p.x + lightOffsetX,
          p.y + lightOffsetY,
          radius * 0.1,
          p.x,
          p.y,
          radius
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.35, p.color);
        sphereGrad.addColorStop(1, '#030712'); // Deep shadow on opposite side

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = sphereGrad;
        ctx.fill();

        // ---------------------------------------------------------------------
        // REALISTIC PLANET SURFACE TEXTURES
        // ---------------------------------------------------------------------
        // JUPITER (GURU) - Atmospheric Cloud Belts & Great Red Spot
        if (p.type === 'jupiter_bands') {
          ctx.fillStyle = 'rgba(180, 83, 9, 0.35)';
          ctx.fillRect(p.x - radius, p.y - radius * 0.4, radius * 2, radius * 0.25);
          ctx.fillStyle = 'rgba(217, 119, 6, 0.4)';
          ctx.fillRect(p.x - radius, p.y + radius * 0.15, radius * 2, radius * 0.22);

          // Great Red Spot
          ctx.fillStyle = 'rgba(220, 38, 38, 0.75)';
          ctx.beginPath();
          ctx.ellipse(
            p.x + radius * 0.3,
            p.y + radius * 0.25,
            radius * 0.28,
            radius * 0.16,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // MARS (MANGALA) - Polar Ice Cap & Basaltic Canyons
        if (p.type === 'mars') {
          // North Polar Ice Cap
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y - radius * 0.75, radius * 0.35, radius * 0.18, 0, 0, Math.PI * 2);
          ctx.fill();

          // Dark Basaltic Region
          ctx.fillStyle = 'rgba(69, 10, 10, 0.45)';
          ctx.beginPath();
          ctx.arc(p.x + radius * 0.2, p.y, radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        // MOON (CHANDRA) - Lunar Maria Craters
        if (p.type === 'moon') {
          ctx.fillStyle = 'rgba(100, 116, 139, 0.45)';
          ctx.beginPath();
          ctx.arc(p.x - radius * 0.25, p.y - radius * 0.2, radius * 0.28, 0, Math.PI * 2);
          ctx.arc(p.x + radius * 0.3, p.y + radius * 0.2, radius * 0.32, 0, Math.PI * 2);
          ctx.arc(p.x - radius * 0.1, p.y + radius * 0.4, radius * 0.22, 0, Math.PI * 2);
          ctx.fill();
        }

        // VENUS (SHUKRA) - Swirling Atmospheric Storms
        if (p.type === 'venus_clouds') {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y - radius * 0.2, radius * 0.8, radius * 0.18, 0.2, 0, Math.PI * 2);
          ctx.ellipse(p.x, p.y + radius * 0.3, radius * 0.7, radius * 0.15, -0.15, 0, Math.PI * 2);
          ctx.fill();
        }

        // Atmospheric Edge Glow (Terminator Rim Lighting)
        const rimGrad = ctx.createRadialGradient(
          p.x + lightOffsetX * 0.5,
          p.y + lightOffsetY * 0.5,
          radius * 0.75,
          p.x,
          p.y,
          radius
        );
        rimGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        rimGrad.addColorStop(1, 'rgba(255, 255, 255, 0.25)');
        ctx.fillStyle = rimGrad;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="celestial-3d-canvas-container" aria-hidden="true">
      <canvas ref={canvasRef} className="celestial-3d-canvas" />
    </div>
  );
}
