// Quiz questions mapped to money scripts
// Each question belongs to exactly one script
// 3 questions per script = 12 total questions

export const questions = [
  // Money Avoidance questions (indices 0-2)
  {
    id: 1,
    text: 'I believe that money corrupts people.',
    script: 'Money Avoidance'
  },
  {
    id: 2,
    text: 'I feel guilty when I spend money on myself.',
    script: 'Money Avoidance'
  },
  {
    id: 3,
    text: 'I believe that rich people are greedy.',
    script: 'Money Avoidance'
  },
  
  // Money Worship questions (indices 3-5)
  {
    id: 4,
    text: 'I believe that having more money would solve most of my problems.',
    script: 'Money Worship'
  },
  {
    id: 5,
    text: 'I believe that money can buy happiness.',
    script: 'Money Worship'
  },
  {
    id: 6,
    text: 'I believe that the more money I have, the happier I will be.',
    script: 'Money Worship'
  },
  
  // Money Status questions (indices 6-8)
  {
    id: 7,
    text: 'I believe that my net worth is a measure of my success.',
    script: 'Money Status'
  },
  {
    id: 8,
    text: 'I believe that people judge me by how much money I have.',
    script: 'Money Status'
  },
  {
    id: 9,
    text: 'I believe that having money makes me more important.',
    script: 'Money Status'
  },
  
  // Money Vigilance questions (indices 9-11)
  {
    id: 10,
    text: 'I believe that it is important to save as much money as possible.',
    script: 'Money Vigilance'
  },
  {
    id: 11,
    text: 'I believe that it is important to be careful with money.',
    script: 'Money Vigilance'
  },
  {
    id: 12,
    text: 'I believe that it is important to keep track of every dollar I spend.',
    script: 'Money Vigilance'
  }
];

// Likert scale labels
export const likertScale = {
  1: 'Strongly disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly agree'
};

// Get question by index
export const getQuestion = (index) => {
  return questions[index] || null;
};

// Get questions by script
export const getQuestionsByScript = (script) => {
  return questions.filter(q => q.script === script);
};

// Get script for a question index
export const getScriptForQuestion = (index) => {
  const question = questions[index];
  return question ? question.script : null;
};

// Total number of questions
export const TOTAL_QUESTIONS = questions.length;

