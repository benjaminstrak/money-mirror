import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Loading2Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentWordIndex, setCurrentWordIndex] = useState(-1); // -1 means show "Loading..."
  
  // Get results from previous page
  const results = location.state?.results;
  
  const fullText = "Well done. You're nearly there. But now you need to look into the mirror.";
  const words = fullText.split(' ');
  const loadingDelay = 2000; // 2 seconds for initial "Loading..."
  const wordDelay = 500; // 0.5 seconds per word (default)
  const finalLoadingDelay = 2000; // 2 seconds for final "Loading..."

  useEffect(() => {
    // First show "Loading..." for 2 seconds
    const loadingTimeout = setTimeout(() => {
      // Then start showing words one by one
      let currentIndex = 0;
      
      const showNextWord = () => {
        if (currentIndex >= words.length) {
          return; // Safety check
        }
        
        setCurrentWordIndex(currentIndex);
        
        const currentWord = words[currentIndex];
        const isLastWord = currentIndex === words.length - 1;
        
        // Custom delays for specific words
        let delay = wordDelay;
        if (currentWord === 'Well') {
          delay = 1000; // 1s
        } else if (currentWord === 'done.') {
          delay = 1500; // 1.5s
        } else if (currentWord === "You're") {
          delay = 1000; // 1s
        } else if (currentWord === 'nearly') {
          delay = 1000; // 1s
        } else if (currentWord === 'there.') {
          delay = 2000; // 2s
        } else if (currentWord === 'But') {
          delay = 1000; // 1s
        } else if (currentWord === 'now') {
          delay = 1000; // 1s
        } else if (currentWord === 'mirror.') {
          delay = 2000; // 2s
        }
        
        // Increment index for next iteration BEFORE scheduling timeout
        currentIndex++;
        
        if (isLastWord) {
          // This is the last word, wait for its delay, then show "Loading..." again for 2 seconds, then navigate
          setTimeout(() => {
            setCurrentWordIndex(-1); // Show "Loading..." again
            setTimeout(() => {
              navigate('/capture', { state: { results } });
            }, finalLoadingDelay);
          }, delay);
        } else {
          // Not the last word, continue to next word
          setTimeout(showNextWord, delay);
        }
      };
      
      showNextWord();
    }, loadingDelay);
    
    return () => clearTimeout(loadingTimeout);
  }, [navigate, wordDelay, finalLoadingDelay, results]);

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

export default Loading2Page;

