import { useEffect, useRef } from 'react';

function PixelDropOverlay({ isActive, onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pixelSize = 4; // 4px x 4px pixels
    const cols = Math.ceil(window.innerWidth / pixelSize);
    const rows = Math.ceil(window.innerHeight / pixelSize);

    // Create columns of pixels, each with different drop speeds
    const columns = [];
    for (let col = 0; col < cols; col++) {
      const speed = 0.5 + Math.random() * 1.5; // Random speed between 0.5 and 2
      const delay = Math.random() * 500; // Random delay up to 500ms
      columns.push({ col, speed, delay });
    }

    const startTime = Date.now();
    let animationFrame;

    const draw = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(52, 152, 203, 1)';

      columns.forEach((column, colIndex) => {
        if (elapsed < column.delay) {
          // Before delay, show full column
          for (let row = 0; row < rows; row++) {
            ctx.fillRect(colIndex * pixelSize, row * pixelSize, pixelSize, pixelSize);
          }
          return;
        }

        const timeSinceStart = (elapsed - column.delay) / 1000; // Convert to seconds
        const pixelsDropped = Math.floor(timeSinceStart * column.speed * 60); // 60 pixels per second at speed 1

        // Draw remaining pixels that haven't dropped yet
        // Start from the top, but skip the ones that have already dropped
        for (let row = pixelsDropped; row < rows; row++) {
          const y = row * pixelSize;
          // Only draw if pixel is still on screen
          if (y < canvas.height) {
            ctx.fillRect(colIndex * pixelSize, y, pixelSize, pixelSize);
          }
        }
      });

      // Continue animation until all pixels have dropped
      if (elapsed < 3000) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        if (onComplete) onComplete();
      }
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  );
}

export default PixelDropOverlay;

