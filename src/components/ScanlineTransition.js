import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ScanlineTransition({ children }) {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger transition on route change
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Match animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isTransitioning && (
        <div className="scanline-overlay"></div>
      )}
      {children}
    </>
  );
}

export default ScanlineTransition;

