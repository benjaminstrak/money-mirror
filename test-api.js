/**
 * Simple test script for the image generation API
 * Run with: node test-api.js
 */

const fetch = require('node-fetch');

// Create a simple test image (1x1 red pixel)
const createTestImage = () => {
  // Base64 encoded 1x1 red PNG
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
};

async function testAPI() {
  const testImage = createTestImage();
  const testData = {
    selfie: testImage,
    profileCode: 'HLLH', // Test with a valid profile code
    prompt: 'A retro pixelated tarot card featuring the user\'s face as a thoughtful skeptic. The card shows a contemplative figure surrounded by symbols of questioning and reflection. The style is minimalist and zen-like, with pixelated textures. The background is sparse, emphasizing freedom from material clutter.'
  };

  console.log('🧪 Testing image generation API...\n');
  console.log('📤 Sending request to: http://localhost:3001/api/generate-image');
  console.log('📋 Profile Code:', testData.profileCode);
  console.log('📝 Prompt length:', testData.prompt.length, 'characters\n');

  try {
    const response = await fetch('http://localhost:3001/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const responseText = await response.text();
    console.log('📥 Response Status:', response.status, response.statusText);
    console.log('📥 Response Body:', responseText.substring(0, 200));

    if (response.ok) {
      const data = JSON.parse(responseText);
      console.log('\n✅ Success!');
      console.log('🖼️  Generated Image URL:', data.imageUrl);
    } else {
      console.log('\n❌ Error Response:');
      try {
        const errorData = JSON.parse(responseText);
        console.log('Error:', errorData.error);
        if (errorData.details) {
          console.log('Details:', JSON.stringify(errorData.details, null, 2));
        }
      } catch (e) {
        console.log('Raw error:', responseText);
      }
    }
  } catch (error) {
    console.error('\n❌ Request failed:', error.message);
    console.error('Make sure the API server is running on port 3001');
    console.error('Start it with: npm run server');
  }
}

testAPI();

