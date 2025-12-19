import { TOTAL_QUESTIONS, getScriptForQuestion } from '../data/questions';

/**
 * Validate that all questions have been answered
 * @param {Array<number|null>} answers - Array of answers (1-5 or null)
 * @returns {boolean} True if all questions answered
 */
export const validateAnswers = (answers) => {
  if (!answers || answers.length !== TOTAL_QUESTIONS) {
    return false;
  }
  
  return answers.every(answer => answer !== null && answer !== undefined && answer >= 1 && answer <= 5);
};

/**
 * Get which script a question belongs to by index
 * @param {number} index - Question index (0-11)
 * @returns {string|null} Script name or null if invalid index
 */
export const getQuestionScript = (index) => {
  return getScriptForQuestion(index);
};

/**
 * Format profile array as readable string
 * @param {Array<string>} profile - Array of H/L values
 * @returns {string} Formatted string (e.g., "H L L H")
 */
export const formatProfile = (profile) => {
  if (!profile || !Array.isArray(profile)) {
    return '';
  }
  return profile.join(' ');
};

/**
 * Calculate progress percentage
 * @param {number} currentIndex - Current question index (0-based)
 * @param {number} total - Total number of questions
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = (currentIndex, total = TOTAL_QUESTIONS) => {
  return Math.round(((currentIndex + 1) / total) * 100);
};

/**
 * Check if answer is valid (1-5)
 * @param {number} answer - Answer value
 * @returns {boolean} True if valid
 */
export const isValidAnswer = (answer) => {
  return answer !== null && answer !== undefined && answer >= 1 && answer <= 5;
};

