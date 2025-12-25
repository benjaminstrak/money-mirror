import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { processQuizAnswers } from '../data/scoring';
import { formatProfile } from '../utils/quizLogic';
import { generateTarotCardGemini } from '../services/geminiImageGeneration';
import { getPersonalityTypeNumber, toLatinNumeral } from '../utils/personalityUtils';
import '../App.css';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const tarotCardRef = useRef(null);
  const [deviceRotation, setDeviceRotation] = useState(-3); // Start with default -3deg
  
  // Debug: Log state changes
  useEffect(() => {
    console.log('🔄 ResultsPage state:', { 
      generatedImageUrl: generatedImageUrl ? 'SET' : 'NULL', 
      isGenerating, 
      generationError: generationError || 'NONE' 
    });
  }, [generatedImageUrl, isGenerating, generationError]);
  
  // Get results from route state, or recalculate if missing
  let results = location.state?.results;
  
  // If no results in state, try to recalculate (fallback)
  if (!results && location.state?.answers) {
    try {
      results = processQuizAnswers(location.state.answers);
    } catch (error) {
      console.error('Error recalculating results:', error);
    }
  }

  const { personality, scriptProfile, profile } = results || {};
  const scriptOrder = ['Money Avoidance', 'Money Worship', 'Money Status', 'Money Vigilance'];
  const selfie = location.state?.selfie;

  // Safety check for scriptReflections
  const scriptReflections = personality?.scriptReflections || {};

  // Accelerometer control for mobile tarot card rotation
  useEffect(() => {
    // Check if device orientation API is available (mobile devices)
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ requires permission
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        })
        .catch(console.error);
    } else if (window.DeviceOrientationEvent) {
      // Android and older iOS
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    function handleDeviceOrientation(event) {
      // Use gamma (left-right tilt) for rotation
      // Range is typically -90 to 90 degrees
      // Map to a smaller rotation range for subtle effect (-5 to 5 degrees)
      if (event.gamma !== null) {
        const rotation = Math.max(-5, Math.min(5, event.gamma * 0.1)); // Limit to -5 to 5 degrees
        setDeviceRotation(rotation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, []);

  // Apply rotation to tarot card element based on device orientation
  useEffect(() => {
    if (tarotCardRef.current) {
      tarotCardRef.current.style.transform = `rotate(${deviceRotation}deg)`;
    }
  }, [deviceRotation]);

  // Generate tarot card image when component mounts (if selfie is available)
  // This hook must be called before any conditional returns
  useEffect(() => {
    // Only generate if we have all required data and haven't already generated
    if (results && selfie && profile && personality?.name && !generatedImageUrl && !isGenerating) {
      console.log('Starting tarot card generation...', { profile, personality: personality.name });
      setIsGenerating(true);
      setGenerationError(null);
      
      generateTarotCardGemini(selfie, profile, personality.name, 'fast')
        .then((imageUrl) => {
          console.log('Tarot card generated successfully:', imageUrl);
          console.log('Setting generatedImageUrl state to:', imageUrl);
          setGeneratedImageUrl(imageUrl);
          setIsGenerating(false);
        })
        .catch((error) => {
          console.error('Failed to generate tarot card:', error);
          setGenerationError(error.message || 'Failed to generate tarot card');
          setIsGenerating(false);
        });
    }
  }, [results, selfie, profile, personality?.name]);

  // If still no results, redirect to quiz (after hooks)
  if (!results) {
    navigate('/quiz');
    return null;
  }

  const handleRetake = () => {
    navigate('/quiz');
  };

  return (
    <div className="app-container">
      {/* Blue gradient overlay */}
      <div className="blue-gradient-overlay"></div>

      <div className="main-content results-content">
        {/* Personality Header - matching landing page structure */}
        <div className="title-section">
          <p className="title-line-1">you are</p>
          <p className="title-line-2">{personality?.name || 'Unknown'}</p>
        </div>

        {/* Tarot card frame - always visible */}
        <div className="results-tarot-frame" ref={tarotCardRef}>
          {/* Type number at top */}
          {profile && (() => {
            const typeNumber = getPersonalityTypeNumber(profile);
            const latinNumeral = typeNumber ? toLatinNumeral(typeNumber) : '';
            return latinNumeral ? (
              <div className="tarot-frame-number">{latinNumeral}</div>
            ) : null;
          })()}
          
          {/* Image container */}
          <div className="results-tarot-container">
            {isGenerating && (
              <div className="tarot-generating-placeholder">
                <p className="generating-text">Generating your tarot card...</p>
              </div>
            )}
            {generatedImageUrl && !isGenerating && (
              <img 
                src={generatedImageUrl} 
                alt={`${personality?.name} tarot card`}
                className="results-tarot-image"
                onError={(e) => {
                  console.error('Error loading generated image:', generatedImageUrl);
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                  console.log('✅ Generated tarot card image loaded successfully');
                }}
              />
            )}
            {generationError && !isGenerating && (
              <div className="tarot-error-placeholder">
                <p className="error-text">Unable to generate tarot card</p>
              </div>
            )}
          </div>
          
          {/* Personality name box at bottom */}
          {personality?.name && (
            <div className="tarot-frame-name-box">
              <p className="tarot-frame-name">{personality.name}</p>
            </div>
          )}
        </div>

        {/* Personality Summary */}
        <div className="personality-summary">
          <p className="summary-text">{personality?.summary || ''}</p>
        </div>

        {/* Script Reflections */}
        <div className="script-reflections">
          <h2 className="reflections-title">Your money scripts</h2>
          {scriptOrder.map((script, index) => {
            const scriptLevel = scriptProfile?.[index] === 'H' ? 'High' : 'Low';
            return (
              <div key={script} className="reflection-item">
                <h3 className="reflection-script">{script} | {scriptLevel}</h3>
                <p className="reflection-text">{scriptReflections[script] || 'No reflection available.'}</p>
              </div>
            );
          })}
        </div>

        {/* Retake button */}
        <div className="results-actions">
          <button className="retake-button" onClick={handleRetake}>
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;

