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
      targetMouseX = (e.clientX - width / 2) * 0.0006;
      targetMouseY = (e.clientY - height / 2) * 0.0006;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const focalLength = 400;

    // =========================================================================
    // 9 VEDIC PLANETS (NAVAGRAHAS - நவக்கிரகங்கள்)
    // =========================================================================
    const planets = [
      {
        id: 'surya',
        name: 'Surya',
        tamil: 'சூரியன்',
        orbitRadiusX: 0,
        orbitRadiusY: 0,
        speed: 0,
        size: 14,
        color: '#f59e0b',
        glowColor: 'rgba(245, 158, 11, 0.4)',
        coronaColor: 'rgba(251, 191, 36, 0.2)',
        isSun: true,
        angle: 0,
      },
      {
        id: 'chandra',
        name: 'Chandra',
        tamil: 'சந்திரன்',
        orbitRadiusX: 85,
        orbitRadiusY: 38,
        speed: 0.016,
        size: 5,
        color: '#f8fafc',
        glowColor: 'rgba(241, 245, 249, 0.5)',
        tilt: 0.2,
        angle: 0.5,
      },
      {
        id: 'budha',
        name: 'Budha',
        tamil: 'புதன்',
        orbitRadiusX: 135,
        orbitRadiusY: 55,
        speed: 0.012,
        size: 4.5,
        color: '#10b981',
        glowColor: 'rgba(16, 185, 129, 0.45)',
        tilt: -0.15,
        angle: 1.8,
      },
      {
        id: 'shukra',
        name: 'Shukra',
        tamil: 'சுக்கிரன்',
        orbitRadiusX: 185,
        orbitRadiusY: 72,
        speed: 0.009,
        size: 6.5,
        color: '#fb7185',
        glowColor: 'rgba(251, 113, 133, 0.45)',
        tilt: 0.25,
        angle: 3.2,
      },
      {
        id: 'mangala',
        name: 'Mangala',
        tamil: 'செவ்வாய்',
        orbitRadiusX: 240,
        orbitRadiusY: 90,
        speed: 0.0075,
        size: 5.5,
        color: '#ef4444',
        glowColor: 'rgba(239, 68, 68, 0.5)',
        tilt: -0.22,
        angle: 4.6,
      },
      {
        id: 'guru',
        name: 'Guru',
        tamil: 'குரு',
        orbitRadiusX: 305,
        orbitRadiusY: 112,
        speed: 0.005,
        size: 9.5,
        color: '#fbbf24',
        glowColor: 'rgba(251, 191, 36, 0.45)',
        tilt: 0.18,
        angle: 2.1,
      },
      {
        id: 'shani',
        name: 'Shani',
        tamil: 'சனி',
        orbitRadiusX: 375,
        orbitRadiusY: 135,
        speed: 0.0038,
        size: 8,
        color: '#3b82f6',
        glowColor: 'rgba(59, 130, 246, 0.45)',
        hasRings: true,
        tilt: -0.3,
        angle: 5.4,
      },
      {
        id: 'rahu',
        name: 'Rahu',
        tamil: 'ராகு',
        orbitRadiusX: 435,
        orbitRadiusY: 155,
        speed: -0.0028,
        size: 6,
        color: '#8b5cf6',
        glowColor: 'rgba(139, 92, 246, 0.4)',
        tilt: 0.35,
        angle: 0.9,
      },
      {
        id: 'ketu',
        name: 'Ketu',
        tamil: 'கேது',
        orbitRadiusX: 485,
        orbitRadiusY: 172,
        speed: -0.0028,
        size: 5.5,
        color: '#f97316',
        glowColor: 'rgba(249, 115, 22, 0.4)',
        tilt: -0.35,
        angle: 0.9 + Math.PI,
      },
    ];

    // Background 3D Stardust Particles
    const numStars = 85;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 800 - 400,
        baseRadius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(245, 158, 11,' : 'rgba(217, 119, 6,',
        speedZ: Math.random() * 0.2 + 0.1,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw 3D Floating Stardust
      stars.forEach((s) => {
        s.z -= s.speedZ;
        if (s.z < -focalLength + 50) {
          s.z = 400;
          s.x = (Math.random() - 0.5) * 1600;
          s.y = (Math.random() - 0.5) * 1600;
        }

        const rotX = s.x * Math.cos(mouseX) - s.z * Math.sin(mouseX);
        const rotZ = s.x * Math.sin(mouseX) + s.z * Math.cos(mouseX);
        const rotY = s.y * Math.cos(mouseY) - rotZ * Math.sin(mouseY);

        const scale = focalLength / (focalLength + rotZ + 450);
        if (scale <= 0) return;

        const projX = centerX + rotX * scale;
        const projY = centerY + rotY * scale;

        if (projX < -50 || projX > width + 50 || projY < -50 || projY > height + 50) {
          return;
        }

        const pulse = Math.sin(time * s.pulseSpeed * 60 + s.pulseOffset);
        const radius = Math.max(0.6, (s.baseRadius + pulse * 0.5) * scale);
        const alpha = Math.min(0.6, Math.max(0.08, (scale * 0.6 + pulse * 0.12)));

        ctx.fillStyle = `${s.color} ${alpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw 3D Navagraha Orbital Rings
      const ringTilt = 0.55 + mouseY * 0.8;
      const ringPan = mouseX * 0.8;

      planets.forEach((planet) => {
        if (planet.orbitRadiusX > 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(217, 119, 6, 0.08)';
          ctx.lineWidth = 1;

          // Render elliptical orbit with 3D projection
          const steps = 64;
          for (let i = 0; i <= steps; i++) {
            const th = (i / steps) * Math.PI * 2;
            let ox = Math.cos(th) * planet.orbitRadiusX;
            let oy = Math.sin(th) * planet.orbitRadiusY;
            let oz = Math.sin(th) * (planet.orbitRadiusX * 0.25);

            // Apply 3D perspective rotation
            const cosT = Math.cos(ringTilt + (planet.tilt || 0));
            const sinT = Math.sin(ringTilt + (planet.tilt || 0));
            const cosP = Math.cos(ringPan);
            const sinP = Math.sin(ringPan);

            const rx = ox * cosP - oz * sinP;
            const rz = ox * sinP + oz * cosP;
            const ry = oy * cosT - rz * sinT;
            const finalZ = oy * sinT + rz * cosT;

            const scale = focalLength / (focalLength + finalZ + 400);
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

      // 3. Compute 3D Positions for 9 Planets and Sort by Z-depth
      const projectedPlanets = [];

      planets.forEach((planet) => {
        planet.angle += planet.speed;

        let ox = Math.cos(planet.angle) * planet.orbitRadiusX;
        let oy = Math.sin(planet.angle) * planet.orbitRadiusY;
        let oz = Math.sin(planet.angle) * (planet.orbitRadiusX * 0.25);

        const cosT = Math.cos(ringTilt + (planet.tilt || 0));
        const sinT = Math.sin(ringTilt + (planet.tilt || 0));
        const cosP = Math.cos(ringPan);
        const sinP = Math.sin(ringPan);

        const rx = ox * cosP - oz * sinP;
        const rz = ox * sinP + oz * cosP;
        const ry = oy * cosT - rz * sinT;
        const finalZ = oy * sinT + rz * cosT;

        const scale = focalLength / (focalLength + finalZ + 400);
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

      // 4. Render 9 Planets with 3D Lighting & Celestial Halo
      projectedPlanets.forEach((p) => {
        const radius = Math.max(2, p.size * p.scale);
        const glowRadius = radius * (p.isSun ? 4.5 : 3);

        // Ambient glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glowGrad.addColorStop(0, p.glowColor);
        glowGrad.addColorStop(0.5, p.glowColor.replace(/[\d\.]+\)$/, '0.15)'));
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Sun Corona Pulsing
        if (p.isSun) {
          const pulse = Math.sin(time * 2) * 4;
          const coronaGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            radius,
            p.x,
            p.y,
            glowRadius + pulse + 10
          );
          coronaGrad.addColorStop(0, p.coronaColor);
          coronaGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = coronaGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius + pulse + 10, 0, Math.PI * 2);
          ctx.fill();
        }

        // Saturn Ring (Shani)
        if (p.hasRings) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(0.35 + ringPan * 0.5);
          ctx.beginPath();
          ctx.ellipse(0, 0, radius * 2.3, radius * 0.7, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.45)';
          ctx.lineWidth = Math.max(1.2, 2 * p.scale);
          ctx.stroke();
          ctx.restore();
        }

        // Planet Sphere with 3D Shading
        const sphereGrad = ctx.createRadialGradient(
          p.x - radius * 0.3,
          p.y - radius * 0.3,
          radius * 0.1,
          p.x,
          p.y,
          radius
        );
        sphereGrad.addColorStop(0, '#ffffff');
        sphereGrad.addColorStop(0.4, p.color);
        sphereGrad.addColorStop(1, p.isSun ? '#b45309' : '#0f172a');

        ctx.fillStyle = sphereGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Planet Name Tag on Hover or Ambient
        if (p.isSun) {
          ctx.fillStyle = 'rgba(217, 119, 6, 0.85)';
          ctx.font = '700 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('☀️ Surya', p.x, p.y + radius + 14);
        }
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
