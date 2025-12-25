/**
 * Service for generating tarot card images using ChatGPT Image API (DALL-E)
 */

/**
 * Load prompts from the prompts.txt file
 * @returns {Promise<Object>} Object with masterPrompt, negativePrompt, and cardPrompts mapping profile codes to card-specific prompts
 */
export async function loadPrompts() {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/prompts.txt`);
    if (!response.ok) {
      throw new Error('Failed to load prompts file');
    }
    const text = await response.text();
    
    // Parse the prompts.txt file
    const result = {
      masterPrompt: '',
      negativePrompt: '',
      cardPrompts: {}
    };
    
    const lines = text.split('\n');
    let currentSection = null; // 'master', 'negative', or 'card'
    let currentProfile = null;
    let currentPrompt = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      // Skip empty lines
      if (!trimmed) {
        continue;
      }
      
      // Detect section headers
      if (trimmed.includes('MASTER PROMPT')) {
        currentSection = 'master';
        currentProfile = null;
        currentPrompt = [];
        continue;
      } else if (trimmed.includes('NEGATIVE PROMPT')) {
        // Save master prompt if exists
        if (currentSection === 'master' && currentPrompt.length > 0) {
          result.masterPrompt = currentPrompt.join('\n').trim();
        }
        currentSection = 'negative';
        currentProfile = null;
        currentPrompt = [];
        continue;
      } else if (trimmed.includes('CARD-SPECIFIC PROMPTS')) {
        // Save negative prompt if exists
        if (currentSection === 'negative' && currentPrompt.length > 0) {
          result.negativePrompt = currentPrompt.join('\n').trim();
        }
        currentSection = 'card';
        currentProfile = null;
        currentPrompt = [];
        continue;
      }
      
      // Process content based on current section
      if (currentSection === 'master' || currentSection === 'negative') {
        currentPrompt.push(trimmed);
      } else if (currentSection === 'card') {
        // Check if line starts with a card name and profile code in parentheses
        const cardMatch = trimmed.match(/^[^(]+\(([A-Z]{4})\)/);
        if (cardMatch) {
          // Save previous card prompt if exists
          if (currentProfile && currentPrompt.length > 0) {
            result.cardPrompts[currentProfile] = currentPrompt.join(' ').trim();
          }
          
          // Start new card prompt
          currentProfile = cardMatch[1];
          // Extract text after the parentheses
          const afterParens = trimmed.match(/\)\s*(.*)$/);
          currentPrompt = afterParens ? [afterParens[1].trim()] : [];
        } else if (currentProfile && trimmed) {
          // Continue building current card prompt
          currentPrompt.push(trimmed);
        }
      }
    }
    
    // Save final prompts
    if (currentSection === 'master' && currentPrompt.length > 0) {
      result.masterPrompt = currentPrompt.join('\n').trim();
    } else if (currentSection === 'negative' && currentPrompt.length > 0) {
      result.negativePrompt = currentPrompt.join('\n').trim();
    } else if (currentProfile && currentPrompt.length > 0) {
      result.cardPrompts[currentProfile] = currentPrompt.join(' ').trim();
    }
    
    return result;
  } catch (error) {
    console.error('Error loading prompts:', error);
    throw error;
  }
}

/**
 * Convert base64 image to a format suitable for API
 * @param {string} base64Image - Base64 encoded image data URL
 * @returns {string} Base64 string without data URL prefix
 */
function prepareImageForAPI(base64Image) {
  // Remove data URL prefix if present
  return base64Image.replace(/^data:image\/[a-z]+;base64,/, '');
}

/**
 * Create a mask image for image editing
 * Creates a PNG mask where white areas are editable and black areas are preserved
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Promise<string>} Base64 encoded mask image (data URL)
 */
async function createEditMask(width, height) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Fill entire canvas with white (all areas editable)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Preserve face area in center (black = preserved)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35; // Face area radius (35%)
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Convert canvas to base64 data URL
    const maskDataUrl = canvas.toDataURL('image/png');
    resolve(maskDataUrl);
  });
}

/**
 * Generate a tarot card image using backend API
 * The backend securely handles OpenAI API calls to avoid exposing API keys
 * Reference: https://platform.openai.com/docs/guides/image-generation
 * 
 * @param {string} selfieBase64 - Base64 encoded selfie image (data URL)
 * @param {string} profileCode - 4-letter profile code (e.g., "HLLH")
 * @param {string} personalityName - Name of the personality type
 * @returns {Promise<string>} URL of the generated image
 */
export async function generateTarotCard(selfieBase64, profileCode, personalityName) {
  try {
    // Load prompts
    const promptData = await loadPrompts();
    
    // Get the card-specific prompt for this profile
    const cardPrompt = promptData.cardPrompts[profileCode];
    if (!cardPrompt) {
      throw new Error(`No prompt found for profile code: ${profileCode}`);
    }
    
    // Combine master prompt + card-specific prompt + negative prompt
    // Format: [MASTER PROMPT] [CARD-SPECIFIC PROMPT]. Negative prompt: [NEGATIVE PROMPT]
    const fullPrompt = `${promptData.masterPrompt}\n\n${cardPrompt}\n\nNegative prompt: ${promptData.negativePrompt}`;
    
    console.log('Calling backend API to generate image for', profileCode);
    console.log('Full prompt length:', fullPrompt.length, 'characters');
    console.log('Has selfie:', !!selfieBase64);
    
    // GPT-Image 1 doesn't use masks - it incorporates the image directly into the generation
    // Selfie is optional - if not provided, will generate from prompt only
    
    // Call our backend API endpoint (Vercel serverless function or local dev server)
    // This keeps the OpenAI API key secure on the server
    // In development, use local API server; in production, use Vercel serverless function
    const apiUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001/api/generate-image'
      : '/api/generate-image';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selfie: selfieBase64 || null, // Can be null if no selfie
        profileCode: profileCode,
        prompt: fullPrompt
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend API Error:', errorData);
      throw new Error(errorData.error || `Backend API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.imageUrl) {
      throw new Error('Invalid response from backend API');
    }
    
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating tarot card:', error);
    throw error;
  }
}
