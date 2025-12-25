# Money Mirror

A quiz application that identifies users' money personalities based on the Klontz Money Script Inventory. Discover your subconscious money beliefs through a 12-question assessment.

## Overview

Money Mirror helps users understand their relationship with money by uncovering underlying money beliefs rather than judging financial outcomes. The quiz analyzes four money scripts (Money Avoidance, Money Worship, Money Status, and Money Vigilance) to classify users into one of 16 distinct money personalities.

## Features

- **12-Question Quiz**: Comprehensive assessment using a 5-point Likert scale
- **16 Personality Types**: Detailed personality classifications with reflective summaries
- **Script Reflections**: Personalized insights for each of the four money scripts
- **Pixelated Aesthetic**: Retro gaming-inspired design with smooth animations
- **Session-Based**: No data persistence - answers are kept in memory during the session

## Technology Stack

- **React 19.1.0**: UI framework
- **React Router DOM**: Client-side routing
- **CSS3**: Custom styling with pixelated design system
- **Google Fonts**: Pixelify Sans and Geist Mono fonts

## Project Structure

```
src/
├── components/
│   ├── LandingPage.js      # Landing page with animated mirror
│   ├── QuizPage.js         # 12-question quiz interface
│   └── ResultsPage.js       # Personality results display
├── data/
│   ├── questions.js        # Quiz questions mapped to scripts
│   ├── personalities.js    # 16 personality definitions
│   └── scoring.js          # Scoring and classification logic
├── utils/
│   └── quizLogic.js       # Helper functions for validation
├── App.js                  # Router setup and main app
├── App.css                 # Global styles with pixelated theme
└── index.js                # Entry point
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd money-mirror
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## How It Works

### Quiz Flow

1. **Landing Page**: Users see the Money Mirror landing page with animated mirror effect
2. **Quiz**: 12 questions with 5-point Likert scale (Strongly disagree to Strongly agree)
3. **Scoring**: Each question maps to one of four money scripts
4. **Classification**: Script scores are normalized to High/Low and mapped to a 4-letter profile
5. **Results**: Users receive their personality type with detailed reflections

### Scoring Model

- Each script has 3 questions
- Script score = sum of 3 question responses (range: 3-15)
- Normalization:
  - **High (H)**: Score ≥ 10
  - **Low (L)**: Score < 10
- 4-letter profile maps to one of 16 personalities

### Personality Types

The 16 personality types are:

- LLLL – The Bare Bones Boss
- LLHL – The Quiet Maven
- LHLL – Dollar Dandelion
- LHHL – The Luxe Chaser
- HLLL – The Cosmic Escapist
- HLHL – The Velvet Ascender
- HHLL – Freedom Hunter
- HHHL – The Gilded Player
- LLLH – Zen Penny
- LLHH – Grounded Tycoon
- LHLH – The Money Monk
- LHHH – Gold Sentinel
- HLLH – The Wealth Skeptic
- HLHH – The Slow Flame
- HHLH – Rainy Day Rebel
- HHHH – Cautious Crown

## Design Principles

- **No Judgment**: No personality is good or bad
- **Reflective**: Results feel reflective, not diagnostic
- **Descriptive**: High and Low are descriptive, not moral
- **Pixelated Aesthetic**: Consistent retro gaming-inspired design throughout

## Deployment

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (optional, or use web interface):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```
   Follow the prompts, or deploy directly from GitHub:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import the `money-mirror` repository
   - Vercel will auto-detect React and configure it

3. **Connect Custom Domain**:
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add `moneymirror.me` and `www.moneymirror.me`
   - Update your domain's DNS records:
     - Add an A record pointing to Vercel's IP (they'll provide it)
     - Or add a CNAME record pointing to `cname.vercel-dns.com`
   - Vercel will handle SSL certificates automatically

### Option 2: Netlify

1. **Deploy via Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git" → Select `money-mirror`
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

2. **Connect Custom Domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `moneymirror.me`
   - Update DNS records as instructed by Netlify

### Option 3: Traditional Hosting

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Upload `build` folder** to your web server via FTP/SFTP

3. **Configure web server** to serve `index.html` for all routes (required for React Router):
   - **Apache**: Add `.htaccess` file in `build` folder
   - **Nginx**: Configure `try_files` directive
   - **Node.js**: Use `serve` package or Express with catch-all route

### Important Notes

- **React Router**: Requires server configuration to handle client-side routing
- **HTTPS**: Ensure SSL certificate is set up for custom domain
- **Environment Variables**: If needed, configure in hosting platform's dashboard

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

### Key Files

- **Data Layer**: `src/data/` contains questions, personalities, and scoring logic
- **Components**: `src/components/` contains page components
- **Styling**: `src/App.css` contains all styles with pixelated theme
- **Routing**: `src/App.js` sets up React Router

## Architecture

### State Management

- Uses React `useState` for quiz answers (session-only)
- Results passed via React Router's `navigate` with state
- No persistence - all data cleared on page refresh

### Routing

- `/` - Landing page
- `/quiz` - Quiz page
- `/results` - Results page

### Scoring Flow

```
Answers (12 values, 1-5)
  ↓
Calculate Script Scores (sum per script)
  ↓
Normalize to H/L (threshold: 10)
  ↓
Create 4-letter Profile (e.g., "HLLH")
  ↓
Map to Personality
  ↓
Display Results
```

## Contributing

This is a private project. For questions or contributions, please contact the project maintainer.

## License

Private project - All rights reserved

## Next Steps

### 1. Updates to Loading Page Timings
- **Purpose**: Refine and optimize loading page animation timings
- **Areas to update**:
  - Adjust word-by-word display timings for better pacing
  - Fine-tune ellipsis animation timing
  - Optimize transition delays between loading states
  - Ensure smooth flow from loading to next screen

### 2. Refinements to Results Page
- **Image Loading**:
  - Improve loading states and transitions for tarot card image
  - Add smooth fade-in animation when image loads
  - Handle loading errors gracefully with fallback UI
  - Optimize image display performance
- **Further Info Page**:
  - Create additional details page/section for personality insights
  - Add expandable sections for deeper personality information
  - Include additional resources or explanations
  - Improve navigation between results and detailed info

### 3. One Click Sharing to Social Media
- **Feature**: Share tarot card and results with one click
- **Implementation**: 
  - Web Share API for native sharing (iOS/Android)
  - Fallback to platform-specific sharing (Twitter, Facebook, Instagram)
  - Generate optimized share card image (1080x1920 for stories)
  - Include personality name, type, and tarot card image
  - Add share button to results page
- **Design**: Pixelated share card matching app aesthetic
- **Platforms**: Instagram Stories, Twitter, Facebook, WhatsApp, etc.

### 4. Send Results to Email
- **Feature**: Allow users to email their results
- **Implementation**:
  - Backend email service (SendGrid, Mailgun, or similar)
  - Generate formatted email with personality results
  - Include tarot card image as attachment or inline image
  - Email template matching app design aesthetic
  - Add email input form on results page
- **Content**: 
  - Personality name and type
  - Tarot card image
  - Personality summary
  - Script reflections
  - Link back to app

### Technical Considerations

- **Email Service**: Set up email API credentials (SendGrid/Mailgun)
- **Image Optimization**: Ensure tarot card images are optimized for email clients
- **Share Card Generation**: May need canvas API to generate shareable image
- **Error Handling**: Graceful fallbacks for sharing/email failures
- **Error Handling**: Handle API failures, network issues
- **Privacy**: Consider image storage/retention policies
- **Mobile Optimization**: Ensure camera works well on mobile devices

## Image Generation Setup

### OpenAI API Key Configuration

1. **Get an OpenAI API Key**:
   - Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key

2. **Set up Environment Variable for Local Development**:
   - Create a `.env.local` file in the project root (if it doesn't exist)
   - Add your API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```
   - **Important**: Never commit the `.env.local` file to git (it should be in `.gitignore`)
   - You can copy from `.env.local.example` as a template

3. **Set up Environment Variable for Production (Vercel)**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your API key value
   - Select all environments (Production, Preview, Development)

4. **Run Local Development Server**:
   - **Important**: Use `vercel dev` instead of `npm start` to run the API routes locally:
     ```bash
     vercel dev
     ```
   - This will start both the React app and the serverless API functions
   - The app will be available at `http://localhost:3000`
   - API routes will be available at `http://localhost:3000/api/*`

### Prompt File

The image generation uses prompts from `public/data/prompts.txt`. This file contains prompts for each of the 16 personality types. You can edit this file to customize the image generation prompts without changing code.

**File Format**:
```
[PROFILE_CODE]: [PROMPT DESCRIPTION]
```

Example:
```
HLLH: A retro pixelated tarot card featuring the user's face as a thoughtful skeptic...
```

**Note**: Currently using DALL-E 3, which generates images based on text prompts. The prompts include instructions to incorporate the user's likeness. For more accurate likeness incorporation, consider using DALL-E 2's image editing API or a backend service that can combine images.

### Implementation Order

1. Add quiz loading messages
2. Finesse transitions between screens
3. Refine results design
4. Add camera capture component with permissions
5. Style dithered viewfinder (blue/white)
6. Integrate ChatGPT Image API
7. Generate tarot card from selfie + personality
8. Display on results page
9. Add social sharing functionality

## Acknowledgments

- Based on the Klontz Money Script Inventory
- Design inspired by retro pixel art aesthetics
