import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { sendMessage } from '../utils/chatApi';

const AICounselor = () => {
  const location = useLocation();
  const careerContext = location.state?.career;
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: careerContext 
        ? `Hi! I'm your AI career counselor. I see you're interested in learning more about ${careerContext.title}. I can help you discover the best universities for this field, companies that are hiring, required degrees, and career paths. What would you like to know?`
        : "Hi! I'm your AI career counselor. I'm here to help you explore different career paths and make informed decisions about your future. I can recommend universities, suggest companies that hire for different roles, and provide guidance on education requirements. What career interests you?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const history = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const result = await sendMessage(userMessage, careerContext?.id, history);

      if (result.success) {
        const assistantMessage = {
          role: 'assistant',
          content: result.data.message,
          timestamp: result.data.timestamp || Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = careerContext ? [
    `What universities are best for ${careerContext.title}?`,
    `Which companies hire ${careerContext.title}s?`,
    `What degrees do I need for ${careerContext.title}?`,
    `What's the career path for ${careerContext.title}?`
  ] : [
    "What tech careers pay the most?",
    "Best universities for software development?",
    "How do I become a UX designer?",
    "What careers combine creativity and technology?"
  ];

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-7xl"
            >
              🤖
            </motion.div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            AI Career <span className="gradient-text">Counselor</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get personalized career advice powered by AI. Ask about universities, companies, 
            degree requirements, and career paths.
          </p>
        </motion.div>

        {/* Main Chat Interface */}
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">AI Career Counselor</h3>
                    <p className="text-white/80 text-sm flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Online • Powered by OpenAI
                    </p>
                  </div>
                </div>
                
                {careerContext && (
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <p className="text-white/80 text-xs">Discussing</p>
                    <p className="text-white font-semibold text-sm">{careerContext.title}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-900">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-primary-600' 
                        : 'bg-gradient-to-br from-accent-500 to-accent-600'
                    }`}>
                      <span className="text-xl">{message.role === 'user' ? '👤' : '🤖'}</span>
                    </div>
                    
                    {/* Message Bubble */}
                    <div
                      className={`rounded-2xl px-5 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 shadow-md">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <p className="text-sm font-semibold text-red-800 dark:text-red-400 mb-1">Error</p>
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 font-medium">💡 Quick questions to get started:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-3 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
              <div className="flex space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about careers, universities, or companies..."
                  className="flex-1 px-5 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span className="font-medium">Send</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                💡 Tip: Be specific in your questions for better answers. Try asking about specific careers, universities, or companies.
              </p>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-lg font-bold text-white mb-2">University Recommendations</h3>
            <p className="text-slate-400 text-sm">
              Get suggestions for top universities and programs for your chosen field
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-lg font-bold text-white mb-2">Company Insights</h3>
            <p className="text-slate-400 text-sm">
              Learn which companies are actively hiring for different career paths
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-white mb-2">Degree Guidance</h3>
            <p className="text-slate-400 text-sm">
              Understand what degrees and certifications you need for your goals
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AICounselor;
