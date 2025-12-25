/**
 * Vercel Serverless Function for generating tarot card images
 * This securely handles OpenAI API calls on the backend
 * 
 * POST /api/generate-image
 * Body: { selfie: base64Image, profileCode: string, prompt: string }
 */

const FormData = require('form-data');
const fetch = require('node-fetch');
const sharp = require('sharp');

module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { selfie, profileCode, prompt } = req.body;

    // Validate required fields (selfie is optional)
    if (!profileCode || !prompt) {
      return res.status(400).json({ 
        error: 'Missing required fields: profileCode and prompt are required' 
      });
    }
    
    // Note: GPT-Image 1 doesn't use masks - it incorporates the image directly

    // Get API key from environment variable (set in Vercel dashboard)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: OpenAI API key not found' 
      });
    }

    // Prepare the selfie image if provided (remove data URL prefix if present)
    let imageBase64 = null;
    
    if (selfie) {
      imageBase64 = selfie.replace(/^data:image\/[a-z]+;base64,/, '');
    }

    console.log('Generating image for profile:', profileCode);
    console.log('Prompt length:', prompt.length);
    console.log('Has selfie:', !!selfie);

    // Process image if provided
    let imageBuffer = null;
    if (imageBase64) {
      // Call OpenAI GPT-Image 1 API
      // Using GPT-Image 1 for image-to-image generation with likeness
      // Reference: https://platform.openai.com/docs/guides/image-generation
      // GPT-Image 1 supports direct image input for incorporating user likeness
      
      // Convert base64 to buffer
      imageBuffer = Buffer.from(imageBase64, 'base64');
      
      // Process image: convert to PNG, resize to 1024x1536 portrait, and ensure < 4MB
      try {
        const processedImage = await sharp(imageBuffer)
          .resize(1024, 1536, {
            fit: 'cover', // Crop to 1024x1536 portrait ratio
            position: 'center'
          })
          .png()
          .toBuffer();
        
        // Check size (must be < 4MB)
        let sizeInMB = processedImage.length / (1024 * 1024);
        if (sizeInMB >= 4) {
          // Compress further if still too large
          imageBuffer = await sharp(processedImage)
            .png({ quality: 90, compressionLevel: 9 })
            .toBuffer();
          sizeInMB = imageBuffer.length / (1024 * 1024);
        } else {
          imageBuffer = processedImage;
        }
        
        console.log(`✅ Processed image: ${sizeInMB.toFixed(2)}MB, format: PNG, dimensions: 1024x1536`);
        
        if (sizeInMB >= 4) {
          throw new Error(`Image is still too large after processing: ${sizeInMB.toFixed(2)}MB (max 4MB)`);
        }
      } catch (error) {
        console.error('❌ Error processing image:', error);
        // Re-throw the error so it's caught by the API handler
        throw new Error(`Image processing failed: ${error.message}`);
      }
    }
    
    let response;
    
    if (imageBuffer) {
      // If we have an image, use the edits endpoint (image-to-image)
      // GPT-Image 1 uses FormData with File objects (like the example)
      // Use /v1/images/edits endpoint with FormData, similar to images.edit()
      const formData = new FormData();
      
      // Add image as a file buffer (GPT-Image expects File/blob, not base64)
      formData.append('image', imageBuffer, {
        filename: 'selfie.png',
        contentType: 'image/png'
      });
      
      // Add prompt
      formData.append('prompt', prompt);
      
      // Add model - use 'gpt-image-1' based on the example
      formData.append('model', 'gpt-image-1');
      
      // Add size - 1024x1536 portrait ratio
      formData.append('size', '1024x1536');

      console.log('📤 Sending request to GPT-Image 1 API (with image)...');
      console.log('   Model: gpt-image-1');
      console.log('   Endpoint: /v1/images/edits');
      console.log('   Image size:', (imageBuffer.length / (1024 * 1024)).toFixed(2), 'MB');
      console.log('   Prompt length:', prompt.length, 'characters');

      // Make request to OpenAI GPT-Image 1 API (uses edits endpoint, like images.edit())
      response = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          ...formData.getHeaders() // FormData sets Content-Type with boundary
        },
        body: formData
      });
    } else {
      // If no image, use the generations endpoint (text-to-image)
      // Use gpt-image-1.5 for text-to-image generation
      console.log('📤 Sending request to GPT-Image 1.5 API (text-only)...');
      console.log('   Model: gpt-image-1.5');
      console.log('   Endpoint: /v1/images/generations');
      console.log('   Prompt length:', prompt.length, 'characters');

      response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-image-1.5',
          prompt: prompt,
          n: 1,
          size: '1024x1536', // Portrait format
          quality: 'low'
        })
      });
    }

    const responseText = await response.text();
    
    console.log('📥 OpenAI API Response Status:', response.status);
    console.log('📥 Response Text (first 500 chars):', responseText.substring(0, 500));

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        errorData = { message: responseText || 'Unknown error' };
      }
      
      console.error('OpenAI API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      return res.status(response.status).json({
        error: `OpenAI API error: ${errorData.error?.message || errorData.message || responseText}`,
        details: errorData
      });
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('📥 Parsed Response Structure:', {
        hasData: !!data.data,
        dataLength: data.data?.length,
        firstItem: data.data?.[0] ? Object.keys(data.data[0]) : null,
        fullData: JSON.stringify(data).substring(0, 500)
      });
    } catch (parseError) {
      console.error('❌ Failed to parse OpenAI response as JSON:', parseError);
      console.error('❌ Raw response:', responseText);
      return res.status(500).json({ 
        error: 'Invalid JSON response from OpenAI API',
        rawResponse: responseText.substring(0, 500)
      });
    }

    // Check for different response formats
    let imageUrl = null;
    
    // Format 1: { data: [{ url: "..." }] }
    if (data.data && Array.isArray(data.data) && data.data[0]?.url) {
      imageUrl = data.data[0].url;
    }
    // Format 2: { url: "..." } (direct URL)
    else if (data.url) {
      imageUrl = data.url;
    }
    // Format 3: { data: [{ b64_json: "..." }] } (base64)
    else if (data.data && Array.isArray(data.data) && data.data[0]?.b64_json) {
      imageUrl = `data:image/png;base64,${data.data[0].b64_json}`;
    }
    
    if (!imageUrl) {
      console.error('❌ Invalid response structure. Expected data.data[0].url, data.url, or data.data[0].b64_json');
      console.error('❌ Full response:', JSON.stringify(data, null, 2));
      return res.status(500).json({ 
        error: 'Invalid response from OpenAI API',
        receivedStructure: Object.keys(data),
        dataStructure: data.data ? (Array.isArray(data.data) ? `Array[${data.data.length}]` : typeof data.data) : 'missing'
      });
    }

    console.log('✅ Successfully extracted image URL (format:', imageUrl.startsWith('data:') ? 'base64' : 'URL', ')');

    // Return the generated image URL (could be a URL or base64 data URL)
    return res.status(200).json({
      imageUrl: imageUrl,
      profileCode
    });

  } catch (error) {
    console.error('Error in generate-image API:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

