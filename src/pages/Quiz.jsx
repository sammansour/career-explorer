import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { careers, interests } from '../data/careers';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'interests',
      question: 'What activities do you enjoy most?',
      type: 'multiple',
      options: [
        { value: 'problem-solving', label: 'Solving complex problems', icon: '🧩' },
        { value: 'creativity', label: 'Creating and designing things', icon: '🎨' },
        { value: 'technology', label: 'Working with technology', icon: '💻' },
        { value: 'communication', label: 'Communicating with people', icon: '💬' },
        { value: 'analysis', label: 'Analyzing data and patterns', icon: '📊' },
        { value: 'hands-on', label: 'Building things with my hands', icon: '🔧' },
      ],
    },
    {
      id: 'environment',
      question: 'What work environment appeals to you?',
      type: 'single',
      options: [
        { value: 'office', label: 'Office or remote', icon: '🏢' },
        { value: 'creative', label: 'Creative studio', icon: '🎭' },
        { value: 'lab', label: 'Laboratory or research facility', icon: '🔬' },
        { value: 'outdoor', label: 'Outdoor or field work', icon: '🌳' },
        { value: 'flexible', label: 'Flexible/Startup environment', icon: '🚀' },
      ],
    },
    {
      id: 'skills',
      question: 'Which skills do you want to develop?',
      type: 'multiple',
      options: [
        { value: 'programming', label: 'Programming and coding', icon: '⌨️' },
        { value: 'design', label: 'Visual design', icon: '🎨' },
        { value: 'mathematics', label: 'Mathematics and statistics', icon: '📐' },
        { value: 'leadership', label: 'Leadership and management', icon: '👥' },
        { value: 'innovation', label: 'Innovation and strategy', icon: '💡' },
        { value: 'engineering', label: 'Engineering and building', icon: '⚙️' },
      ],
    },
    {
      id: 'salary',
      question: 'What salary range are you targeting?',
      type: 'single',
      options: [
        { value: '50-75', label: '$50k - $75k', icon: '💵' },
        { value: '75-100', label: '$75k - $100k', icon: '💰' },
        { value: '100-150', label: '$100k - $150k', icon: '💎' },
        { value: '150+', label: '$150k+', icon: '🏆' },
      ],
    },
    {
      id: 'growth',
      question: 'How important is job growth to you?',
      type: 'single',
      options: [
        { value: 'very', label: 'Very important - I want high growth', icon: '📈' },
        { value: 'moderate', label: 'Moderately important', icon: '📊' },
        { value: 'stable', label: 'Stability is more important', icon: '🛡️' },
      ],
    },
  ];

  const handleAnswer = (questionId, value) => {
    const question = questions.find(q => q.id === questionId);
    
    if (question.type === 'multiple') {
      const currentAnswers = answers[questionId] || [];
      const newAnswers = currentAnswers.includes(value)
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value];
      
      setAnswers({ ...answers, [questionId]: newAnswers });
    } else {
      setAnswers({ ...answers, [questionId]: value });
    }
  };

  const calculateMatches = () => {
    const selectedInterests = answers.interests || [];
    const selectedSkills = answers.skills || [];
    const salaryRange = answers.salary || '';
    
    const scored = careers.map(career => {
      let score = 0;
      
      // Interest matching (40 points)
      const interestMatch = selectedInterests.filter(i => 
        career.interests.includes(i)
      ).length;
      score += interestMatch * 10;
      
      // Skills matching (30 points)
      selectedSkills.forEach(skill => {
        if (career.skills.some(s => s.toLowerCase().includes(skill))) {
          score += 10;
        }
      });
      
      // Salary matching (20 points)
      if (salaryRange) {
        const [min, max] = salaryRange.split('-').map(s => parseInt(s.replace('+', '')) * 1000);
        if (max) {
          if (career.salaryRange.median >= min && career.salaryRange.median <= max) {
            score += 20;
          }
        } else {
          if (career.salaryRange.median >= min) {
            score += 20;
          }
        }
      }
      
      // Growth outlook (10 points)
      if (answers.growth === 'very' && career.outlook.includes('faster than average')) {
        score += 10;
      }
      
      return { ...career, matchScore: score };
    });
    
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const matches = calculateMatches();
    
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Your Career Matches
            </h1>
            <p className="text-slate-400 text-lg">
              Based on your interests and preferences, here are your top career recommendations
            </p>
          </motion.div>

          <div className="space-y-6 mb-8">
            {matches.map((career, index) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl font-display font-bold text-primary-400">
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-white">
                          {career.title}
                        </h3>
                        <p className="text-sm text-slate-400">{career.category}</p>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">{career.description}</p>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-sm text-slate-400 mb-1">Match Score</div>
                    <div className="text-2xl font-bold gradient-text">
                      {career.matchScore}%
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Median Salary</div>
                    <div className="text-lg font-bold text-green-400">
                      ${(career.salaryRange.median / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-1">Job Outlook</div>
                    <div className="text-lg font-bold text-primary-400">
                      {career.outlook.split('(')[0]}
                    </div>
                  </div>
                </div>

                <Link to={`/career/${career.id}`}>
                  <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
                    Learn More About This Career
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium"
            >
              Retake Quiz
            </button>
            <Link to="/explore">
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium">
                Explore All Careers
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-4">
            Career Discovery Quiz
          </h1>
          <p className="text-slate-400">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8">
              {currentQ.question}
            </h2>

            <div className={`grid ${currentQ.type === 'multiple' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4 mb-8`}>
              {currentQ.options.map((option) => {
                const isSelected = currentQ.type === 'multiple'
                  ? (currentAnswer || []).includes(option.value)
                  : currentAnswer === option.value;

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(currentQ.id, option.value)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{option.icon}</span>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={handleNext}
                disabled={!currentAnswer || (currentQ.type === 'multiple' && (!currentAnswer || currentAnswer.length === 0))}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentAnswer && (currentQ.type === 'single' || (currentAnswer && currentAnswer.length > 0))
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:shadow-lg'
                    : 'bg-white/5 text-slate-500 cursor-not-allowed'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
