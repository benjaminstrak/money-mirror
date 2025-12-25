import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RandomPixelOverlay from './RandomPixelOverlay';
import '../App.css';

function LandingPage() {
  const navigate = useNavigate();
  const [showExitTransition, setShowExitTransition] = useState(false);

  // Create the mirror pattern dots (only outer edge) in sequential order
  const createMirrorPattern = () => {
    const dots = [];
    const rows = 9;
    const cols = 7;
    
    let dotIndex = 0;
    
    // Create dots in perimeter order: top -> right -> bottom -> left
    // Top row (left to right)
    for (let col = 0; col < cols; col++) {
      dots.push({
        row: 0,
        col: col,
        key: `0-${col}`
      });
      dotIndex++;
    }
    
    // Right column (top to bottom, excluding top corner but including bottom corner)
    for (let row = 1; row < rows; row++) {
      dots.push({
        row: row,
        col: cols - 1,
        key: `${row}-${cols - 1}`
      });
      dotIndex++;
    }
    
    // Bottom row (right to left, excluding right corner since it's already in right column)
    for (let col = cols - 2; col >= 0; col--) {
      dots.push({
        row: rows - 1,
        col: col,
        key: `${rows - 1}-${col}`
      });
      dotIndex++;
    }
    
    // Left column (bottom to top, excluding bottom and top corners)
    for (let row = rows - 2; row >= 1; row--) {
      dots.push({
        row: row,
        col: 0,
        key: `${row}-0`
      });
      dotIndex++;
    }
    
    // Calculate animation timing for seamless snake effect
    // For perfect seamless looping, delayPerDot should equal animationDuration / dots.length
    // This ensures when the animation loops, the tail connects to the head
    const animationDuration = 3; // seconds for full cycle (matches CSS)
    const delayPerDot = animationDuration / dots.length;
    
    // To ensure seamless wrapping, we want the tail to be visible when the head loops
    // The extended tail in the CSS (fading to 0 at 50%) ensures continuous visibility
    
    // Render the dots with animation delays
    // Add random flicker delay for each dot (0 to 0.4s)
    return dots.map((dot, index) => {
      const randomFlickerDelay = Math.random() * 0.4;
      return (
        <div
          key={dot.key}
          className="mirror-dot edge-dot"
          style={{
            left: `${dot.col * 31}px`,
            top: `${dot.row * 31}px`,
            animationDelay: `${index * delayPerDot}s`,
            '--flicker-delay': `${randomFlickerDelay}s`,
          }}
        />
      );
    });
  };

  const handleStartClick = () => {
    // Show exit animation first
    setShowExitTransition(true);
    
    // Wait for exit animation to complete (1.5s), then navigate
    setTimeout(() => {
      navigate('/loading');
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Exit transition overlay */}
      {showExitTransition && <RandomPixelOverlay isActive={true} mode="exit" />}
      
      {/* Cloud background pattern */}
      <div className="cloud-background">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
      </div>

      {/* Blue gradient overlay */}
      <div className="blue-gradient-overlay"></div>

      {/* Main content */}
      <div className="main-content">
        <div className="title-section">
          <p className="title-line-1">LOOK INTO</p>
          <p className="title-line-2">the money mirror</p>
        </div>

        {/* Mirror pattern */}
        <div className="mirror-container">
          <div className="mirror-pattern">
            {createMirrorPattern()}
            
            {/* START button in center */}
            <div className="start-button-container">
              <button className="start-button" onClick={handleStartClick}>START</button>
            </div>
          </div>
        </div>

        {/* Description text */}
        <div className="description-container">
          <p className="description-text">
            a project by benjamin strak
          </p>
        </div>

        {/* Test transitions link */}
        <div style={{ marginTop: '40px' }}>
          <button 
            className="test-link-button" 
            onClick={() => navigate('/test-transitions')}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: "'Geist Mono', monospace",
              fontSize: '12px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Test Transitions
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

