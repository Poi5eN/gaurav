import React, { useEffect } from "react";

const CanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById("canvas-cursor");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Track mouse
    const mouse = { x: width / 2, y: height / 2 };
    const particles = [];

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // Add particle on move
      particles.push({
        x: mouse.x,
        y: mouse.y,
        life: 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw trailing line
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life -= 0.05; // Fade out speed
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(145, 94, 255, ${p.life})`; // Accent Color
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      id="canvas-cursor"
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CanvasCursor;
