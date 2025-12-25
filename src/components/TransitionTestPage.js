import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RandomPixelOverlay from './RandomPixelOverlay';
import PixelDropOverlay from './PixelDropOverlay';
import HorizontalPixelLoad from './HorizontalPixelLoad';
import '../App.css';

function TransitionTestPage() {
  const navigate = useNavigate();
  const [activeTransition, setActiveTransition] = useState(null);

  const triggerTransition = (type) => {
    setActiveTransition(type);
    const durations = {
      scanline: 3000,
      checkerboard: 1500,
      radial: 1200,
      mosaic: 1500,
      crt: 1000,
      'random-pixel': 1500,
      'pixel-drop': 3000,
      'horizontal-load': 7000
    };
    setTimeout(() => {
      setActiveTransition(null);
    }, durations[type] || 2000);
  };

  return (
    <div className="app-container">
      {/* Blue gradient overlay */}
      <div className="blue-gradient-overlay"></div>

      {/* Transition overlays */}
      {activeTransition === 'scanline' && <div className="scanline-overlay"></div>}
      {activeTransition === 'checkerboard' && <div className="transition-overlay checkerboard"></div>}
      {activeTransition === 'radial' && <div className="transition-overlay radial"></div>}
      {activeTransition === 'mosaic' && <div className="transition-overlay mosaic"></div>}
      {activeTransition === 'crt' && <div className="transition-overlay crt"></div>}
      {activeTransition === 'random-pixel' && (
        <RandomPixelOverlay 
          isActive={true} 
          onComplete={() => setActiveTransition(null)}
        />
      )}
      {activeTransition === 'pixel-drop' && (
        <PixelDropOverlay 
          isActive={true} 
          onComplete={() => setActiveTransition(null)}
        />
      )}
      {activeTransition === 'horizontal-load' && (
        <HorizontalPixelLoad 
          isActive={true} 
          onComplete={() => setActiveTransition(null)}
        />
      )}

      <div className="main-content">
        <div className="title-section">
          <p className="title-line-1">TRANSITION</p>
          <p className="title-line-2">test page</p>
        </div>

        <div className="transition-test-buttons">
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('scanline')}
          >
            Scanline Wipe
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('checkerboard')}
          >
            Checkerboard Wipe
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('radial')}
          >
            Radial Wipe
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('mosaic')}
          >
            Mosaic/Pixelate
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('crt')}
          >
            CRT + Scanlines
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('random-pixel')}
          >
            Random Pixel Dissolve
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('pixel-drop')}
          >
            Pixel Drop
          </button>
          <button 
            className="transition-button" 
            onClick={() => triggerTransition('horizontal-load')}
          >
            Horizontal Random Load
          </button>
        </div>

        <div className="transition-test-buttons" style={{ marginTop: '20px' }}>
          <button 
            className="transition-button" 
            onClick={() => navigate('/')}
          >
            → Landing Page
          </button>
          <button 
            className="transition-button" 
            onClick={() => navigate('/quiz')}
          >
            → Quiz Page
          </button>
          <button 
            className="transition-button" 
            onClick={() => navigate('/capture')}
          >
            → Camera Capture
          </button>
          <button 
            className="transition-button" 
            onClick={() => navigate('/results')}
          >
            → Results Page
          </button>
        </div>

        <div className="transition-test-info">
          <p>Click any transition button to test the retro effects</p>
          <p>Navigate between pages to test transitions</p>
        </div>
      </div>
    </div>
  );
}

export default TransitionTestPage;

