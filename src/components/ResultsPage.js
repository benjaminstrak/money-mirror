import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { processQuizAnswers } from '../data/scoring';
import { formatProfile } from '../utils/quizLogic';
import '../App.css';

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
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

  // If still no results, redirect to quiz
  if (!results) {
    navigate('/quiz');
    return null;
  }

  const { personality, scriptProfile, profile } = results;
  const scriptOrder = ['Money Avoidance', 'Money Worship', 'Money Status', 'Money Vigilance'];

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
          <p className="title-line-1">your money personality</p>
          <p className="title-line-2">{personality.name}</p>
        </div>

        {/* Personality Summary */}
        <div className="personality-summary">
          <p className="summary-text">{personality.summary}</p>
        </div>

        {/* Script Reflections */}
        <div className="script-reflections">
          <h2 className="reflections-title">Your money scripts</h2>
          {scriptOrder.map((script, index) => {
            const scriptLevel = scriptProfile[index] === 'H' ? 'High' : 'Low';
            return (
              <div key={script} className="reflection-item">
                <h3 className="reflection-script">{script} | {scriptLevel}</h3>
                <p className="reflection-text">{personality.scriptReflections[script]}</p>
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

