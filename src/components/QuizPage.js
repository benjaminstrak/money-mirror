import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, likertScale, TOTAL_QUESTIONS } from '../data/questions';
import { processQuizAnswers } from '../data/scoring';
import { validateAnswers, calculateProgress } from '../utils/quizLogic';
import '../App.css';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function QuizPage() {
  const navigate = useNavigate();
  
  // Create shuffled order of question indices on mount (memoized so it doesn't change)
  const shuffledOrder = useMemo(() => {
    return shuffleArray(Array.from({ length: TOTAL_QUESTIONS }, (_, i) => i));
  }, []);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Answers array indexed by original question index
  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null));

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    // Store answer at original question index
    const originalIndex = shuffledOrder[currentQuestion];
    newAnswers[originalIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Last question - check if all answered and proceed
      if (validateAnswers(answers)) {
        handleComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleComplete = () => {
    if (!validateAnswers(answers)) {
      alert('Please answer all questions before completing the quiz.');
      return;
    }

    try {
      const results = processQuizAnswers(answers);
      navigate('/results', { state: { results } });
    } catch (error) {
      console.error('Error processing quiz:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const progress = calculateProgress(currentQuestion);
  // Get the original question index for current displayed question
  const originalQuestionIndex = shuffledOrder[currentQuestion];
  const question = questions[originalQuestionIndex];
  // Get answer from original question index
  const currentAnswer = answers[originalQuestionIndex];

  return (
    <div className="app-container">
      {/* Blue gradient overlay */}
      <div className="blue-gradient-overlay"></div>

      <div className="main-content quiz-content">
        {/* Question Number */}
        <div className="question-number">
          <p className="question-number-text">QUESTION {currentQuestion + 1}</p>
        </div>

        {/* Progress indicator */}
        <div className="quiz-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Question */}
        <div className="question-container">
          <h2 className="question-text">{question.text}</h2>
        </div>

        {/* Likert Scale - Horizontal Radio Buttons */}
        <div className="likert-scale-horizontal">
          <div className="likert-buttons-row">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`likert-radio ${currentAnswer && value <= currentAnswer ? 'filled' : ''}`}
                onClick={() => handleAnswerSelect(value)}
                aria-label={`${likertScale[value]}`}
              />
            ))}
          </div>
          <div className="likert-labels">
            <span className="label-disagree">DISAGREE</span>
            <span className="label-agree">AGREE</span>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="quiz-navigation">
          <button
            className="nav-button prev-button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            BACK
          </button>
          
          {currentQuestion === TOTAL_QUESTIONS - 1 ? (
            <button
              className="nav-button complete-button"
              onClick={handleComplete}
              disabled={!validateAnswers(answers)}
            >
              Complete
            </button>
          ) : (
            <button
              className="nav-button next-button"
              onClick={handleNext}
              disabled={currentAnswer === null}
            >
              NEXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;

