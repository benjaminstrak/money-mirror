import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function CameraCapture() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const isRequestingPermissionRef = useRef(false);
  
  // Get results from previous page, or create dummy results for testing
  const results = location.state?.results || {
    personality: { name: 'Test Personality', summary: 'Test summary' },
    scriptProfile: 'H L L H',
    profile: 'HLLH'
  };

  useEffect(() => {
    // Request camera access
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user', // Front-facing camera (selfie)
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        
        if (videoRef.current) {
          // Clear any previous error
          setError(null);
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
          
          // Ensure video plays
          videoRef.current.play().catch(err => {
            console.error('Error playing video:', err);
          });
          
          // Start countdown after camera is ready
          videoRef.current.onloadedmetadata = () => {
            startCountdown();
          };
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera. Please allow camera permissions and try again.');
      }
    };

    // Only start camera if we don't have a stream, haven't captured an image, and aren't manually requesting permissions
    if (!stream && !capturedImage && !isRequestingPermissionRef.current) {
      startCamera();
    }

    // Cleanup: stop camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream, capturedImage]);

  const startCountdown = () => {
    let count = 5;
    setCountdown(count);
    
    const countdownInterval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        // Trigger flash and capture
        triggerFlashAndCapture();
      }
    }, 1000);
  };

  const triggerFlashAndCapture = () => {
    // Show flash
    setShowFlash(true);
    
    // Hide flash after 200ms
    setTimeout(() => {
      setShowFlash(false);
    }, 200);
    
    // Capture image after flash
    setTimeout(() => {
      handleCapture();
    }, 100);
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Convert to base64 image as PNG (required by OpenAI API)
    const imageData = canvas.toDataURL('image/png');
    
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    // Show captured image in viewfinder for 2 seconds
    setCapturedImage(imageData);
    
    // Navigate to results after 2 seconds
    setTimeout(() => {
      navigate('/results', {
        state: {
          results,
          selfie: imageData
        }
      });
    }, 2000);
  };

  const handleSkip = () => {
    // Stop camera stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    // Navigate to results without selfie
    navigate('/results', {
      state: {
        results
      }
    });
  };

  const handleRequestPermission = async () => {
    // Clear error IMMEDIATELY before requesting permissions
    // This ensures the button and blue fill disappear right away
    setError(null);
    
    // Set flag to prevent useEffect from interfering
    isRequestingPermissionRef.current = true;
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        const video = videoRef.current;
        
        // Set stream
        video.srcObject = mediaStream;
        setStream(mediaStream);
        
        // Ensure video plays
        video.play().catch(err => {
          console.error('Error playing video:', err);
        });
        
        // Wait for video metadata to load, then start countdown
        const startCountdownWhenReady = () => {
          if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
            startCountdown();
          } else {
            const onLoaded = () => {
              startCountdown();
            };
            video.addEventListener('loadedmetadata', onLoaded, { once: true });
            // Fallback timeout in case loadedmetadata doesn't fire
            setTimeout(() => {
              if (video.readyState >= 1) {
                startCountdown();
              }
            }, 1000);
          }
        };
        
        startCountdownWhenReady();
      }
      
      // Clear the flag after successful permission grant
      isRequestingPermissionRef.current = false;
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please allow camera permissions and try again.');
      // Clear the flag even on error so user can try again
      isRequestingPermissionRef.current = false;
    }
  };

  return (
    <div className="app-container">
      <div className="blue-gradient-overlay"></div>
      <div className="main-content camera-content">
        <div className="camera-container">
          {/* Ornate frame background image */}
          <div 
            className="camera-frame-background"
            style={{
              '--frame-image-url': `url(${process.env.PUBLIC_URL}/moneymirror.png)`
            }}
          >
            <img 
              src={`${process.env.PUBLIC_URL}/moneymirror.png`} 
              alt="Ornate frame" 
              className="camera-frame-image"
              onError={(e) => {
                console.error('Failed to load frame image:', e.target.src);
              }}
            />
            <div className="camera-frame-pixel-overlay"></div>
          </div>
          
          <div className="camera-viewfinder">
            {error ? (
              /* Show Allow Camera button when permissions denied */
              <div className="camera-viewfinder-inner camera-permission-prompt">
                <button 
                  className="allow-camera-button"
                  onClick={handleRequestPermission}
                >
                  Allow camera
                </button>
              </div>
            ) : (
              <div className="camera-viewfinder-inner">
                {capturedImage ? (
                  /* Show captured image */
                  <img 
                    src={capturedImage} 
                    alt="Captured selfie" 
                    className="camera-captured-image"
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="camera-video"
                    />
                    <div className="dithered-overlay"></div>
                  </>
                )}
                
                {/* Countdown overlay */}
                {countdown !== null && (
                  <div className="countdown-overlay">
                    <div className="countdown-number">{countdown}</div>
                  </div>
                )}
                
                {/* Flash effect */}
                {showFlash && <div className="flash-overlay"></div>}
              </div>
            )}
          </div>
          
          <div className="camera-instructions">
            <p className="camera-instruction-text">Look into the mirror.</p>
          </div>
          
          <div className="camera-actions">
            <button
              className="nav-button skip-button"
              onClick={handleSkip}
              disabled={isCapturing || countdown !== null}
            >
              Skip
            </button>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

export default CameraCapture;

