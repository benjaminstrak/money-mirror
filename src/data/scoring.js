import { getPersonalityByProfile } from './personalities';
import { questions } from './questions';

// Script order for 4-letter profile
const SCRIPT_ORDER = [
  'Money Avoidance',
  'Money Worship',
  'Money Status',
  'Money Vigilance'
];

/**
 * Calculate script scores from quiz answers
 * @param {Array<number>} answers - Array of 12 answers (values 1-5) indexed by original question order
 * @returns {Object} Object with script names as keys and scores as values
 */
export const calculateScriptScores = (answers) => {
  if (!answers || answers.length !== 12) {
    throw new Error('Answers array must contain exactly 12 values');
  }

  const scores = {
    'Money Avoidance': 0,
    'Money Worship': 0,
    'Money Status': 0,
    'Money Vigilance': 0
  };

  // Sum scores for each script using question's script property
  // Answers array is indexed by original question index (0-11)
  for (let i = 0; i < answers.length; i++) {
    const question = questions[i];
    const answer = answers[i];
    
    if (question && question.script && answer >= 1 && answer <= 5) {
      scores[question.script] += answer;
    }
  }

  return scores;
};

/**
 * Normalize script scores to High (H) or Low (L)
 * Threshold: 10 or above = High, below 10 = Low
 * If exactly on threshold (10), default to Low
 * @param {Object} scores - Object with script names and numeric scores
 * @returns {Array<string>} Array of 'H' or 'L' values in script order
 */
export const normalizeScores = (scores) => {
  return SCRIPT_ORDER.map(script => {
    const score = scores[script];
    // Threshold is 10, but if exactly 10, default to Low
    return score >= 10 ? 'H' : 'L';
  });
};

/**
 * Derive personality from 4-letter profile
 * @param {string} profile - 4-letter profile code (e.g., "HLLH")
 * @returns {Object|null} Personality object or null if not found
 */
export const derivePersonality = (profile) => {
  if (!profile || profile.length !== 4) {
    return null;
  }
  
  return getPersonalityByProfile(profile);
};

/**
 * Process quiz answers and return complete results
 * @param {Array<number>} answers - Array of 12 answers (values 1-5)
 * @returns {Object} Results object with scores, profile, and personality
 */
export const processQuizAnswers = (answers) => {
  // Calculate raw scores
  const scriptScores = calculateScriptScores(answers);
  
  // Normalize to H/L
  const normalized = normalizeScores(scriptScores);
  
  // Create 4-letter profile
  const profile = normalized.join('');
  
  // Get personality
  const personality = derivePersonality(profile);
  
  if (!personality) {
    throw new Error(`No personality found for profile: ${profile}`);
  }
  
  return {
    scriptScores,      // Raw numeric scores per script
    scriptProfile: normalized,  // Array of H/L values
    profile,           // 4-letter string (e.g., "HLLH")
    personality        // Full personality object
  };
};

/**
 * Format script profile for display
 * @param {Array<string>} profile - Array of H/L values
 * @returns {string} Formatted string (e.g., "H L L H")
 */
export const formatProfile = (profile) => {
  return profile.join(' ');
};

