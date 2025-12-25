/**
 * Utility functions for personality types
 */

// Order of personalities as they appear in personalities.js (1-16)
const PROFILE_ORDER = [
  'LLLL', // 1
  'LLHL', // 2
  'LHLL', // 3
  'LHHL', // 4
  'HLLL', // 5
  'HLHL', // 6
  'HHLL', // 7
  'HHHL', // 8
  'LLLH', // 9
  'LLHH', // 10
  'LHLH', // 11
  'LHHH', // 12
  'HLLH', // 13
  'HLHH', // 14
  'HHLH', // 15
  'HHHH'  // 16
];

/**
 * Get the type number (1-16) for a given profile code
 * @param {string} profileCode - 4-letter profile code (e.g., "HLLH")
 * @returns {number} Type number from 1-16, or null if not found
 */
export function getPersonalityTypeNumber(profileCode) {
  const index = PROFILE_ORDER.indexOf(profileCode);
  return index >= 0 ? index + 1 : null;
}

/**
 * Convert a number to Latin numeral
 * @param {number} num - Number from 1-16
 * @returns {string} Latin numeral (I, II, III, IV, etc.)
 */
export function toLatinNumeral(num) {
  const numerals = [
    '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
    'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'
  ];
  return numerals[num] || '';
}

