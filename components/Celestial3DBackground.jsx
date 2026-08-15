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
      targetMouseX = (e.clientX - width / 2) * 0.0008;
      targetMouseY = (e.clientY - height / 2) * 0.0008;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 3D Particles
    const numParticles = 75;
    const particles = [];
    const focalLength = 350;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 800 - 400,
        baseRadius: Math.random() * 2.2 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(217, 119, 6,' : 'rgba(245, 158, 11,',
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        speedZ: Math.random() * 0.25 + 0.15,
      });
    }

    // 3D Sacred Geometry Celestial Ring (12 Zodiac Nodes)
    const numRingNodes = 12;
    const ringRadius = 380;
    let ringAngleY = 0;
    let ringAngleX = 0.45;

    let time = 0;

    const render = () => {
      time += 0.015;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Draw 3D Celestial Geometry Ring Nodes
      ringAngleY += 0.0025 + mouseX * 0.5;
      const ringNodes3D = [];

      for (let i = 0; i < numRingNodes; i++) {
        const theta = (i / numRingNodes) * Math.PI * 2 + ringAngleY;
        let x = Math.cos(theta) * ringRadius;
        let y = Math.sin(theta) * ringRadius * 0.35;
        let z = Math.sin(theta) * ringRadius;

        const cosTilt = Math.cos(ringAngleX + mouseY);
        const sinTilt = Math.sin(ringAngleX + mouseY);
        const yRot = y * cosTilt - z * sinTilt;
        const zRot = y * sinTilt + z * cosTilt;

        const scale = focalLength / (focalLength + zRot + 400);
        const projX = centerX + x * scale;
        const projY = centerY + yRot * scale;

        ringNodes3D.push({
          x: projX,
          y: projY,
          scale,
          z: zRot,
          index: i,
        });
      }

      // Connect 3D Ring Nodes with Shimmering Golden Lines
      ctx.lineWidth = 1;
      for (let i = 0; i < numRingNodes; i++) {
        const curr = ringNodes3D[i];
        const next = ringNodes3D[(i + 1) % numRingNodes];
        const opposite = ringNodes3D[(i + 6) % numRingNodes];

        const alpha = Math.max(0.04, (curr.scale + next.scale) * 0.12);
        ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(curr.x, curr.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();

        if (i % 2 === 0) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(curr.x, curr.y);
          ctx.lineTo(opposite.x, opposite.y);
          ctx.stroke();
        }
      }

      // Draw 3D Ring Celestial Orbs
      ringNodes3D.forEach((node) => {
        const radius = Math.max(1.5, 4.2 * node.scale);
        const glowRadius = radius * 3.5;

        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius
        );
        grad.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
        grad.addColorStop(0.5, 'rgba(217, 119, 6, 0.15)');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(217, 119, 6, 0.9)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 2. Draw Floating 3D Golden Stardust & Constellations
      particles.forEach((p) => {
        p.z -= p.speedZ;
        if (p.z < -focalLength + 50) {
          p.z = 400;
          p.x = (Math.random() - 0.5) * 1600;
          p.y = (Math.random() - 0.5) * 1600;
        }

        const rotX = p.x * Math.cos(mouseX) - p.z * Math.sin(mouseX);
        const rotZ = p.x * Math.sin(mouseX) + p.z * Math.cos(mouseX);
        const rotY = p.y * Math.cos(mouseY) - rotZ * Math.sin(mouseY);

        const scale = focalLength / (focalLength + rotZ + 450);
        if (scale <= 0) return;

        const projX = centerX + rotX * scale;
        const projY = centerY + rotY * scale;

        if (projX < -50 || projX > width + 50 || projY < -50 || projY > height + 50) {
          return;
        }

        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset);
        const radius = Math.max(0.8, (p.baseRadius + pulse * 0.6) * scale);
        const alpha = Math.min(0.75, Math.max(0.12, (scale * 0.8 + pulse * 0.15)));

        ctx.fillStyle = `${p.color} ${alpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fill();
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
