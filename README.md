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

### Selfie Capture & AI-Generated Tarot Card

The following features are planned for the next iteration:

#### 1. Selfie Capture Step
- **Location**: Add a new step after quiz completion, before results page
- **Route**: `/capture` or integrate into quiz flow
- **Features**:
  - Request camera permissions using `navigator.mediaDevices.getUserMedia()`
  - Display camera feed in a dithered viewfinder
  - Capture selfie image
  - Store image in state/session for processing

#### 2. Dithered Camera Viewfinder
- **Design**: Blue and white dithered pattern overlay
- **Style**: Match existing pixelated aesthetic
- **Implementation**: CSS `repeating-linear-gradient` or similar dithering pattern
- **Visual**: Retro camera viewfinder feel with blue/white color scheme

#### 3. AI Tarot Card Generation
- **API**: ChatGPT Image API (DALL·E or similar)
- **Input**: 
  - User's selfie image
  - Money personality type
  - Personality name and characteristics
- **Output**: Unique retro tarot card image representing the user's money personality
- **Style**: Retro/pixelated aesthetic matching the app design
- **Storage**: Store generated image URL or base64 in session state

#### 4. Results Page Integration
- **Display**: Show generated tarot card image on results page
- **Layout**: Integrate with existing personality display
- **Positioning**: Above or alongside personality summary
- **Styling**: Match pixelated design system

#### 5. Social Media Sharing
- **Feature**: Share tarot card as social media story/post
- **Format**: Optimized image card (e.g., 1080x1920 for stories)
- **Implementation**: 
  - Web Share API for native sharing
  - Fallback to download option
  - Include personality name/type in share card
- **Design**: Nice social media card format with branding

### Technical Considerations

- **Camera Permissions**: Handle permission denial gracefully
- **Image Processing**: May need to resize/optimize selfie before API call
- **API Integration**: Set up ChatGPT Image API credentials
- **Error Handling**: Handle API failures, network issues
- **Privacy**: Consider image storage/retention policies
- **Mobile Optimization**: Ensure camera works well on mobile devices

### Implementation Order

1. Add camera capture component with permissions
2. Style dithered viewfinder (blue/white)
3. Integrate ChatGPT Image API
4. Generate tarot card from selfie + personality
5. Display on results page
6. Add social sharing functionality

## Acknowledgments

- Based on the Klontz Money Script Inventory
- Design inspired by retro pixel art aesthetics
