import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function LoadingPage() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(-1); // -1 means show "Loading..."
  
  const fullText = "Money is subconscious. Answer these twelve questions to learn your hidden beliefs about money and unleash your financial potential.";
  const words = fullText.split(' ');
  const loadingDelay = 4000; // 4 seconds for initial "Loading..."
  const wordDelay = 500; // 0.5 seconds per word (default)
  const finalLoadingDelay = 2000; // 2 seconds for final "Loading..."

  useEffect(() => {
    // First show "Loading..." for 4 seconds
    const loadingTimeout = setTimeout(() => {
      // Then start showing words one by one
      let currentIndex = 0;
      
      const showNextWord = () => {
        if (currentIndex < words.length) {
          const isLastWord = currentIndex === words.length - 1;
          setCurrentWordIndex(currentIndex);
          
          // Custom delays for specific words
          let delay = wordDelay;
          if (words[currentIndex] === 'Money' || words[currentIndex] === 'money') {
            delay = 1000; // 1s
          } else if (words[currentIndex] === 'is') {
            delay = 1000; // 1s
          } else if (words[currentIndex] === 'subconscious.' || words[currentIndex] === 'subconscious') {
            delay = 2000; // 2s
          } else if (words[currentIndex] === 'questions') {
            delay = 2000; // 2s
          } else if (words[currentIndex] === 'beliefs') {
            delay = 2000; // 2s
          } else if (words[currentIndex] === 'potential' || words[currentIndex] === 'potential.') {
            delay = 3000; // 3s
          }
          
          currentIndex++;
          
          if (!isLastWord) {
            // Not the last word, continue to next word
            setTimeout(showNextWord, delay);
          } else {
            // This is the last word ("potential"), wait for its delay, then show "Loading..." again for 2 seconds, then navigate
            setTimeout(() => {
              setCurrentWordIndex(-1); // Show "Loading..." again
              setTimeout(() => {
                navigate('/quiz');
              }, finalLoadingDelay);
            }, delay);
          }
        }
      };
      
      showNextWord();
    }, loadingDelay);
    
    return () => clearTimeout(loadingTimeout);
  }, [words, navigate, wordDelay, finalLoadingDelay]);

  const displayText = currentWordIndex === -1 ? 'Loading...' : words[currentWordIndex];
  const isShowingLoading = currentWordIndex === -1;

  return (
    <div className="app-container">
      {/* Blue gradient overlay */}
      <div className="blue-gradient-overlay"></div>

      <div className="main-content loading-content">
        <div className="loading-text-container">
          {isShowingLoading ? (
            <p className="loading-title loading-word-replace">
              Loading<span className="loading-dots">
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
              </span>
            </p>
          ) : (
            <p className="loading-title loading-word-replace">
              {displayText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;

