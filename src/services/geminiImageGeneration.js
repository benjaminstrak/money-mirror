/**
 * Service for generating tarot card images using Gemini Nano Banana API
 */

import { loadPrompts } from './imageGeneration';

/**
 * Generate a tarot card image using Gemini Nano Banana API
 * This function matches the signature of generateTarotCard for easy replacement
 * 
 * @param {string} selfieBase64 - Base64 encoded selfie image (data URL)
 * @param {string} profileCode - 4-letter profile code (e.g., "HLLH")
 * @param {string} personalityName - Name of the personality type (not used but kept for compatibility)
 * @param {string} speed - Generation speed: 'fast' or 'longer' (default: 'fast')
 * @returns {Promise<string>} Base64 data URL of the generated image
 */
export async function generateTarotCardGemini(selfieBase64, profileCode, personalityName, speed = 'fast') {
  try {
    // Load prompts (same as ChatGPT version)
    const promptData = await loadPrompts();
    
    // Get the card-specific prompt for this profile
    const cardPrompt = promptData.cardPrompts[profileCode];
    if (!cardPrompt) {
      throw new Error(`No prompt found for profile code: ${profileCode}`);
    }
    
    // Combine master prompt + card-specific prompt + negative prompt
    const fullPrompt = `${promptData.masterPrompt}\n\n${cardPrompt}\n\nNegative prompt: ${promptData.negativePrompt}`;
    
    console.log('Calling Gemini Nano Banana API to generate image');
    console.log('Profile code:', profileCode);
    console.log('Full prompt length:', fullPrompt.length, 'characters');
    console.log('Has selfie:', !!selfieBase64);
    console.log('Speed:', speed);
    
    // Call our backend API endpoint (Vercel serverless function or local dev server)
    const apiUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001/api/generate-image-gemini'
      : '/api/generate-image-gemini';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: fullPrompt,
        selfie: selfieBase64 || null,
        speed: speed
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      throw new Error(errorData.error || `Gemini API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.imageUrl) {
      throw new Error('Invalid response from Gemini API');
    }
    
    return data.imageUrl;
  } catch (error) {
    console.error('Error generating tarot card with Gemini:', error);
    throw error;
  }
}

