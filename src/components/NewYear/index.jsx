import { useEffect, useRef } from "react";
import './index.css';

function NewYear() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const fireworks = [];
    const colors = ["#ff2d2d", "#f5a742", "#ffe300", "#36fe40", "#42f5ef", "#003eea", "#9d42f5", "#f242f5"];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = canvas.height;
      const targetY = Math.random() * (canvas.height / 2);

      fireworks.push({
        x,
        y,
        targetY,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 4 + 5),
        particlesCreated: false,
      });
    }

    function createParticles(firework) {
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 3 + 2;

        particles.push({
          x: firework.x,
          y: firework.targetY,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 2,
          alpha: 1,
          color: firework.color,
        });
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        firework.y += firework.speedY;

        ctx.beginPath();
        ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();

        if (firework.y <= firework.targetY && !firework.particlesCreated) {
          createParticles(firework);
          firework.particlesCreated = true;
        }

        if (firework.y <= firework.targetY) {
          fireworks.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.01;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.alpha})`;
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    }

    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    }

    setInterval(createFirework, 800);

    animate();

    return () => {
      clearInterval(createFirework);
    };
  }, []);
  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div className="happy-new-year-message">Happy New Year!!!</div>
      <div className="new-year-text">2025</div>
    </div>
  );
}

export default NewYear;
