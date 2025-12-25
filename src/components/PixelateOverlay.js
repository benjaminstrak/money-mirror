import { useEffect, useState } from 'react';

function PixelateOverlay({ isActive, onComplete }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowOverlay(true);
      // Mosaic transition duration is 1.5s
      const timer = setTimeout(() => {
        setShowOverlay(false);
        if (onComplete) onComplete();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!showOverlay) return null;

  return <div className="transition-overlay mosaic"></div>;
}

export default PixelateOverlay;

