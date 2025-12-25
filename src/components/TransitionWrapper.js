import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import RandomPixelOverlay from './RandomPixelOverlay';

function TransitionWrapper({ children }) {
  const location = useLocation();
  const [showEnterTransition, setShowEnterTransition] = useState(false);
  const prevLocationRef = useRef(location.pathname);
  const isInitialMount = useRef(true);

  // Trigger transition on route change
  useEffect(() => {
    // On initial load, show enter transition for landing page
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevLocationRef.current = location.pathname;
      
      // Show enter transition for initial page load
      setShowEnterTransition(true);
      const enterTimer = setTimeout(() => {
        setShowEnterTransition(false);
      }, 1500);
      
      return () => clearTimeout(enterTimer);
    }

    // Skip if same path
    if (prevLocationRef.current === location.pathname) {
      return;
    }

    // Only show enter transition on new screen
    prevLocationRef.current = location.pathname;
    setShowEnterTransition(true);
    
    const enterTimer = setTimeout(() => {
      setShowEnterTransition(false);
    }, 3000);

    return () => clearTimeout(enterTimer);
  }, [location.pathname]);

  return (
    <>
      {showEnterTransition && <RandomPixelOverlay isActive={true} mode="enter" />}
      {children}
    </>
  );
}

export default TransitionWrapper;

