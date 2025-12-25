import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTarotCard, loadPrompts } from '../services/imageGeneration';
import { generateTarotCardGemini } from '../services/geminiImageGeneration';
import '../App.css';

function ImageGenTestPage() {
  const navigate = useNavigate();
  const [selfieFile, setSelfieFile] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);
  const [profileCode, setProfileCode] = useState('HLLH');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingGemini, setIsGeneratingGemini] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [generatedImageUrlGemini, setGeneratedImageUrlGemini] = useState(null);
  const [usedPrompt, setUsedPrompt] = useState(null);
  const [error, setError] = useState(null);
  const [errorGemini, setErrorGemini] = useState(null);
  const [geminiSpeed, setGeminiSpeed] = useState('fast'); // 'fast' or 'longer'

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelfieFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfiePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (apiType = 'both') => {
    if (!profileCode) {
      setError('Please enter a profile code');
      return;
    }

    // Load the prompts for this profile code
    const promptData = await loadPrompts();
    const cardPrompt = promptData.cardPrompts[profileCode];
    
    if (!cardPrompt) {
      setError(`No prompt found for profile code: ${profileCode}`);
      return;
    }
    
    // Combine master prompt + card-specific prompt + negative prompt
    const fullPrompt = `${promptData.masterPrompt}\n\n${cardPrompt}\n\nNegative prompt: ${promptData.negativePrompt}`;
    
    // Store the full prompt before generating
    setUsedPrompt(fullPrompt);

    // Generate with ChatGPT Image Gen
    if (apiType === 'both' || apiType === 'chatgpt') {
      setIsGenerating(true);
      setError(null);
      setGeneratedImageUrl(null);

      try {
        const imageUrl = await generateTarotCard(selfiePreview || null, profileCode, 'Test Personality');
        setGeneratedImageUrl(imageUrl);
        setIsGenerating(false);
      } catch (err) {
        console.error('ChatGPT Generation error:', err);
        setError(err.message || 'Failed to generate image with ChatGPT');
        setIsGenerating(false);
      }
    }

    // Generate with Gemini Nano Banana
    if (apiType === 'both' || apiType === 'gemini') {
      setIsGeneratingGemini(true);
      setErrorGemini(null);
      setGeneratedImageUrlGemini(null);

      try {
        // Pass profile code and speed option to Gemini (now matches ChatGPT signature)
        const imageUrl = await generateTarotCardGemini(selfiePreview || null, profileCode, 'Test Personality', geminiSpeed);
        setGeneratedImageUrlGemini(imageUrl);
        setIsGeneratingGemini(false);
      } catch (err) {
        console.error('Gemini Generation error:', err);
        setErrorGemini(err.message || 'Failed to generate image with Gemini');
        setIsGeneratingGemini(false);
      }
    }
  };

  return (
    <div className="app-container">
      <div className="blue-gradient-overlay"></div>
      
      <div className="main-content" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'white', fontFamily: 'Pixelify Sans', marginBottom: '30px' }}>
          Image Generation Test
        </h1>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: 'white', display: 'block', marginBottom: '10px', fontFamily: 'Pixelify Sans' }}>
            Profile Code:
          </label>
          <input
            type="text"
            value={profileCode}
            onChange={(e) => setProfileCode(e.target.value.toUpperCase())}
            style={{
              padding: '10px',
              fontSize: '16px',
              fontFamily: 'Pixelify Sans',
              width: '100px',
              textTransform: 'uppercase'
            }}
            maxLength={4}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: 'white', display: 'block', marginBottom: '10px', fontFamily: 'Pixelify Sans' }}>
            Upload Selfie Image (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ color: 'white', fontFamily: 'Pixelify Sans' }}
          />
          {selfiePreview && (
            <div style={{ marginTop: '20px' }}>
              <img
                src={selfiePreview}
                alt="Preview"
                style={{
                  maxWidth: '300px',
                  maxHeight: '300px',
                  border: '2px solid white',
                  imageRendering: 'pixelated'
                }}
              />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleGenerate('both')}
            disabled={(isGenerating || isGeneratingGemini) || !profileCode}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontFamily: 'Pixelify Sans',
              backgroundColor: (isGenerating || isGeneratingGemini) ? '#666' : '#3498cb',
              color: 'white',
              border: '2px solid white',
              cursor: (isGenerating || isGeneratingGemini) ? 'not-allowed' : 'pointer'
            }}
          >
            {(isGenerating || isGeneratingGemini) ? 'Generating...' : 'Generate Both'}
          </button>
          <button
            onClick={() => handleGenerate('chatgpt')}
            disabled={isGenerating || !profileCode}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontFamily: 'Pixelify Sans',
              backgroundColor: isGenerating ? '#666' : '#10a37f',
              color: 'white',
              border: '2px solid white',
              cursor: isGenerating ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating ? 'Generating...' : 'ChatGPT Only'}
          </button>
          <button
            onClick={() => handleGenerate('gemini')}
            disabled={isGeneratingGemini || !profileCode}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontFamily: 'Pixelify Sans',
              backgroundColor: isGeneratingGemini ? '#666' : '#4285f4',
              color: 'white',
              border: '2px solid white',
              cursor: isGeneratingGemini ? 'not-allowed' : 'pointer'
            }}
          >
            {isGeneratingGemini ? 'Generating...' : 'Gemini Only'}
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
          <label style={{ color: 'white', fontFamily: 'Pixelify Sans', fontSize: '16px' }}>
            Gemini Speed:
          </label>
          <button
            onClick={() => setGeminiSpeed('fast')}
            disabled={isGeneratingGemini}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontFamily: 'Pixelify Sans',
              backgroundColor: geminiSpeed === 'fast' ? '#4285f4' : 'transparent',
              color: 'white',
              border: '2px solid white',
              cursor: isGeneratingGemini ? 'not-allowed' : 'pointer',
              opacity: geminiSpeed === 'fast' ? 1 : 0.6
            }}
          >
            Fast
          </button>
          <button
            onClick={() => setGeminiSpeed('longer')}
            disabled={isGeneratingGemini}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontFamily: 'Pixelify Sans',
              backgroundColor: geminiSpeed === 'longer' ? '#4285f4' : 'transparent',
              color: 'white',
              border: '2px solid white',
              cursor: isGeneratingGemini ? 'not-allowed' : 'pointer',
              opacity: geminiSpeed === 'longer' ? 1 : 0.6
            }}
          >
            Longer
          </button>
        </div>

        {(error || errorGemini) && (
          <div style={{ marginBottom: '20px' }}>
            {error && (
              <div style={{
                padding: '15px',
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                border: '2px solid red',
                color: 'white',
                marginBottom: '10px',
                fontFamily: 'Pixelify Sans'
              }}>
                <strong>ChatGPT Error:</strong> {error}
              </div>
            )}
            {errorGemini && (
              <div style={{
                padding: '15px',
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                border: '2px solid red',
                color: 'white',
                marginBottom: '10px',
                fontFamily: 'Pixelify Sans'
              }}>
                <strong>Gemini Error:</strong> {errorGemini}
              </div>
            )}
          </div>
        )}

        {(isGenerating || isGeneratingGemini) && (
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(52, 152, 203, 0.5)',
            border: '2px solid white',
            color: 'white',
            marginBottom: '20px',
            fontFamily: 'Pixelify Sans',
            textAlign: 'center'
          }}>
            {isGenerating && <div>Generating with ChatGPT...</div>}
            {isGeneratingGemini && <div>Generating with Gemini...</div>}
          </div>
        )}

        {(generatedImageUrl || generatedImageUrlGemini) && (
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ color: 'white', fontFamily: 'Pixelify Sans', marginBottom: '30px', textAlign: 'center' }}>
              Comparison Results
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '30px',
              marginBottom: '30px'
            }}>
              {generatedImageUrl && (
                <div>
                  <h3 style={{ color: 'white', fontFamily: 'Pixelify Sans', marginBottom: '15px', textAlign: 'center' }}>
                    ChatGPT Image Gen
                  </h3>
                  <img
                    src={generatedImageUrl}
                    alt="ChatGPT generated tarot card"
                    style={{
                      width: '100%',
                      border: '4px solid white',
                      imageRendering: 'pixelated'
                    }}
                  />
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <a
                      href={generatedImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#10a37f',
                        fontFamily: 'Pixelify Sans',
                        textDecoration: 'underline'
                      }}
                    >
                      Open in new tab
                    </a>
                  </div>
                </div>
              )}
              
              {generatedImageUrlGemini && (
                <div>
                  <h3 style={{ color: 'white', fontFamily: 'Pixelify Sans', marginBottom: '15px', textAlign: 'center' }}>
                    Gemini Nano Banana
                  </h3>
                  <img
                    src={generatedImageUrlGemini}
                    alt="Gemini generated tarot card"
                    style={{
                      width: '100%',
                      border: '4px solid white',
                      imageRendering: 'pixelated'
                    }}
                  />
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <a
                      href={generatedImageUrlGemini}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#4285f4',
                        fontFamily: 'Pixelify Sans',
                        textDecoration: 'underline'
                      }}
                    >
                      Open in new tab
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {usedPrompt && (
              <div style={{ 
                marginTop: '30px', 
                padding: '20px',
                backgroundColor: 'rgba(52, 152, 203, 0.3)',
                border: '2px solid white',
                color: 'white',
                fontFamily: 'Pixelify Sans',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                <h3 style={{ 
                  marginTop: 0, 
                  marginBottom: '15px',
                  fontSize: '18px',
                  textDecoration: 'underline'
                }}>
                  Prompt Used:
                </h3>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{usedPrompt}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '40px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontFamily: 'Pixelify Sans',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              cursor: 'pointer'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageGenTestPage;

