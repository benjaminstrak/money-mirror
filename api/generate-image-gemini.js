/**
 * Vercel Serverless Function for generating tarot card images using Gemini Nano Banana API
 * 
 * POST /api/generate-image-gemini
 * Body: { prompt: string }
 */

const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, selfie, speed = 'fast' } = req.body;

    // Validate required fields (selfie and speed are optional)
    if (!prompt) {
      return res.status(400).json({ 
        error: 'Missing required field: prompt is required' 
      });
    }
    
    // Validate speed parameter
    if (speed && speed !== 'fast' && speed !== 'longer') {
      return res.status(400).json({ 
        error: 'Invalid speed parameter. Must be "fast" or "longer"' 
      });
    }

    // Get API key from environment variable
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Google API key not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: Google API key not found' 
      });
    }

    console.log('📤 Sending request to Gemini Nano Banana API...');
    console.log('   Model: gemini-2.5-flash-image');
    console.log('   Prompt length:', prompt.length, 'characters');
    console.log('   Has selfie:', !!selfie);
    console.log('   Speed:', speed);

    // Add aspect ratio instruction to the prompt since API doesn't support it as a parameter
    let promptWithAspectRatio = `${prompt}\n\nGenerate this image in a 2:3 portrait aspect ratio (portrait orientation, taller than wide).`;
    
    // Add quality modifiers for "longer" generation mode
    // Gemini doesn't have explicit speed parameters, so we enhance the prompt for higher quality
    if (speed === 'longer') {
      promptWithAspectRatio = `${promptWithAspectRatio}\n\nGenerate this image with high quality, detailed, sharp focus, professional quality, 4K resolution, intricate details, refined textures.`;
    }

    // Build parts array - include image if provided, then text
    const parts = [];
    
    // Add image reference if selfie is provided
    if (selfie) {
      // Remove data URL prefix if present
      const imageBase64 = selfie.replace(/^data:image\/[a-z]+;base64,/, '');
      
      parts.push({
        inlineData: {
          mimeType: 'image/png',
          data: imageBase64
        }
      });
      
      console.log('   Including selfie image as reference');
    }
    
    // Add text prompt
    parts.push({
      text: promptWithAspectRatio
    });

    // Call Google Gemini API
    // Reference: https://ai.google.dev/gemini-api/docs/nanobanana
    // Gemini supports image input in parts array for reference
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: parts
        }]
      })
    });

    const responseText = await response.text();
    
    console.log('📥 Gemini API Response Status:', response.status);
    console.log('📥 Response Text (first 500 chars):', responseText.substring(0, 500));

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText || 'Unknown error' };
      }
      
      console.error('Gemini API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      return res.status(response.status).json({
        error: `Gemini API error: ${errorData.error?.message || errorData.message || responseText}`,
        details: errorData
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('📥 Parsed Response Structure:', {
        hasCandidates: !!data.candidates,
        candidatesLength: data.candidates?.length,
        firstCandidate: data.candidates?.[0] ? Object.keys(data.candidates[0]) : null,
        fullResponseKeys: Object.keys(data)
      });
      
      // Log full response structure for debugging
      if (data.candidates && data.candidates[0]) {
        console.log('📥 First Candidate Structure:', JSON.stringify(data.candidates[0], null, 2).substring(0, 1000));
      }
    } catch (parseError) {
      console.error('❌ Failed to parse Gemini response as JSON:', parseError);
      console.error('❌ Raw response:', responseText);
      return res.status(500).json({ 
        error: 'Invalid JSON response from Gemini API',
        rawResponse: responseText.substring(0, 500)
      });
    }

    // Check for API errors in response
    if (data.error) {
      console.error('❌ Gemini API returned an error:', data.error);
      return res.status(500).json({
        error: `Gemini API error: ${data.error.message || JSON.stringify(data.error)}`,
        details: data.error
      });
    }

    // Extract image from response
    // Gemini returns images as inline data in parts
    let imageBase64 = null;
    
    if (data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      
      // Check different possible response structures
      if (candidate.content && candidate.content.parts) {
        console.log('📥 Checking content.parts for image data...');
        for (const part of candidate.content.parts) {
          console.log('📥 Part keys:', Object.keys(part));
          if (part.inlineData && part.inlineData.data) {
            imageBase64 = part.inlineData.data;
            console.log('✅ Found image in content.parts');
            break;
          }
        }
      }
      
      // Also check if parts are directly on candidate
      if (!imageBase64 && candidate.parts) {
        console.log('📥 Checking candidate.parts for image data...');
        for (const part of candidate.parts) {
          console.log('📥 Part keys:', Object.keys(part));
          if (part.inlineData && part.inlineData.data) {
            imageBase64 = part.inlineData.data;
            console.log('✅ Found image in candidate.parts');
            break;
          }
        }
      }
      
      // Check if there's a finishReason that indicates why no image
      if (candidate.finishReason) {
        console.log('📥 Finish reason:', candidate.finishReason);
        if (candidate.finishReason !== 'STOP') {
          console.warn('⚠️  Generation may have been stopped:', candidate.finishReason);
        }
      }
    }
    
    if (!imageBase64) {
      console.error('❌ No image data found in Gemini response');
      console.error('❌ Full response structure:', JSON.stringify(data, null, 2));
      return res.status(500).json({ 
        error: 'No image data in Gemini API response',
        receivedStructure: Object.keys(data),
        candidatesInfo: data.candidates ? {
          count: data.candidates.length,
          firstCandidateKeys: data.candidates[0] ? Object.keys(data.candidates[0]) : null,
          finishReason: data.candidates[0]?.finishReason
        } : null
      });
    }

    // Convert base64 to data URL
    const imageUrl = `data:image/png;base64,${imageBase64}`;
    
    console.log('✅ Successfully extracted image from Gemini response');

    // Return the generated image as base64 data URL
    return res.status(200).json({
      imageUrl: imageUrl
    });

  } catch (error) {
    console.error('Error in generate-image-gemini API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

