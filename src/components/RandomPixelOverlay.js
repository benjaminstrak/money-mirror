import { useEffect, useState, useRef } from 'react';

function RandomPixelOverlay({ isActive, onComplete, mode = 'exit' }) {
  // mode: 'exit' = pixels appear (cover screen), 'enter' = pixels disappear (reveal screen)
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!isActive || !canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const pixelSize = 4; // 4px x 4px pixels
    const cols = Math.ceil(dimensions.width / pixelSize);
    const rows = Math.ceil(dimensions.height / pixelSize);
    const totalPixels = cols * rows;

    // Create array of pixel positions
    const pixels = [];
    for (let i = 0; i < totalPixels; i++) {
      pixels.push({
        col: i % cols,
        row: Math.floor(i / cols),
        delay: Math.random() * 1500
      });
    }

    // Shuffle for randomness
    for (let i = pixels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
    }

    // Draw pixels with delays
    const startTime = Date.now();
    
    if (mode === 'enter') {
      // ENTER: Start with full screen covered, pixels disappear randomly
      // Fill entire canvas first
      ctx.fillStyle = 'rgba(52, 152, 203, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const drawPixel = () => {
        const elapsed = Date.now() - startTime;
        
        // Clear pixels that should have disappeared
        pixels.forEach(pixel => {
          if (elapsed >= pixel.delay) {
            // Clear this pixel (reveal what's underneath)
            ctx.clearRect(
              pixel.col * pixelSize,
              pixel.row * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        });

        if (elapsed < 1500) {
          requestAnimationFrame(drawPixel);
        } else {
          // Clear entire canvas at end
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (onComplete) onComplete();
        }
      };

      drawPixel();
    } else {
      // EXIT: Pixels appear randomly (cover screen)
      const drawPixel = () => {
        const elapsed = Date.now() - startTime;
        ctx.fillStyle = 'rgba(52, 152, 203, 1)';
        
        pixels.forEach(pixel => {
          if (elapsed >= pixel.delay) {
            ctx.fillRect(
              pixel.col * pixelSize,
              pixel.row * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        });

        if (elapsed < 1500) {
          requestAnimationFrame(drawPixel);
        } else {
          if (onComplete) onComplete();
        }
      };

      drawPixel();
    }
  }, [isActive, dimensions, onComplete, mode]);

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

export default RandomPixelOverlay;

