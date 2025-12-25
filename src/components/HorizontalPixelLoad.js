import { useEffect, useRef } from 'react';

function HorizontalPixelLoad({ isActive, onComplete }) {
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

    // Create rows with random order - all loading from left
    const rowData = [];
    for (let row = 0; row < rows; row++) {
      const delay = Math.random() * 2000; // Random delay up to 2 seconds
      const speed = 0.3 + Math.random() * 0.7; // Random speed between 0.3 and 1.0
      rowData.push({ row, delay, speed });
    }

    // Shuffle rows for random vertical order
    for (let i = rowData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rowData[i], rowData[j]] = [rowData[j], rowData[i]];
    }

    const startTime = Date.now();
    let animationFrame;
    const phase1Duration = 3000; // 3 seconds
    const pauseDuration = 1000; // 1 second pause
    const phase2Duration = 3000; // 3 seconds
    const totalDuration = phase1Duration + pauseDuration + phase2Duration;

    const draw = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(52, 152, 203, 1)';

      if (elapsed < phase1Duration) {
        // Phase 1: First 3 seconds
        rowData.forEach((rowInfo) => {
          if (elapsed < rowInfo.delay) return;

          const timeSinceStart = (elapsed - rowInfo.delay) / 1000;
          const pixelsToShow = Math.floor(timeSinceStart * rowInfo.speed * 60); // pixels per second

          // Load from left to right only
          for (let col = 0; col < Math.min(pixelsToShow, cols); col++) {
            ctx.fillRect(col * pixelSize, rowInfo.row * pixelSize, pixelSize, pixelSize);
          }
        });
      } else if (elapsed < phase1Duration + pauseDuration) {
        // Pause: Keep current state (1 second)
        rowData.forEach((rowInfo) => {
          if (elapsed < rowInfo.delay) return;

          const timeSinceStart = (phase1Duration - rowInfo.delay) / 1000;
          const pixelsToShow = Math.floor(timeSinceStart * rowInfo.speed * 60);

          for (let col = 0; col < Math.min(pixelsToShow, cols); col++) {
            ctx.fillRect(col * pixelSize, rowInfo.row * pixelSize, pixelSize, pixelSize);
          }
        });
      } else {
        // Phase 2: Second 3 seconds (continue from where we left off)
        const phase2Elapsed = elapsed - (phase1Duration + pauseDuration);
        rowData.forEach((rowInfo) => {
          if (elapsed < rowInfo.delay) return;

          const timeSinceStart = ((phase1Duration - rowInfo.delay) + phase2Elapsed) / 1000;
          const pixelsToShow = Math.floor(timeSinceStart * rowInfo.speed * 60);

          // Load from left to right only
          for (let col = 0; col < Math.min(pixelsToShow, cols); col++) {
            ctx.fillRect(col * pixelSize, rowInfo.row * pixelSize, pixelSize, pixelSize);
          }
        });
      }

      // Continue animation until total duration
      if (elapsed < totalDuration) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        // Fill any remaining pixels
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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

export default HorizontalPixelLoad;

