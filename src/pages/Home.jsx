import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Discover Your Path',
      description: 'Explore 40+ careers with detailed insights on salary, education, and growth outlook.',
    },
    {
      icon: '💡',
      title: 'Take the Quiz',
      description: 'Answer questions about your interests and get personalized career recommendations.',
    },
    {
      icon: '📊',
      title: 'Real Data',
      description: 'Access accurate salary ranges and job outlook data to make informed decisions.',
    },
    {
      icon: '🚀',
      title: 'Action Steps',
      description: 'Get concrete next steps to pursue your dream career starting today.',
    },
  ];

  const stats = [
    { number: '40+', label: 'Careers' },
    { number: '15+', label: 'Industries' },
    { number: '100%', label: 'Free' },
    { number: '∞', label: 'Possibilities' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-600/20 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-8">
                🎓 Your Future Starts Here
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
              Design Your{' '}
              <span className="gradient-text">Dream Career</span>
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore career paths based on your interests, discover salary potential, 
              and get actionable steps to build the future you want.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-glow px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-primary-500/50 hover:shadow-xl hover:shadow-primary-500/60"
                >
                  Explore Careers
                </motion.button>
              </Link>
              
              <Link to="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold text-lg hover:bg-white/20"
                >
                  Take the Quiz
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 animate-float">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tech-400/30 to-tech-600/30 blur-xl" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-design-400/30 to-design-600/30 blur-xl" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 text-lg">
              Powerful tools to help you make informed career decisions
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Counselor Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tech-600/10 via-transparent to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 max-w-5xl mx-auto relative overflow-hidden"
          >
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-tech-500/20 to-accent-500/20 blur-3xl" />

            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              {/* Left column: Text content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-tech-500/20 to-accent-500/20 border border-tech-500/30 text-tech-300 text-sm font-medium mb-6">
                    ✨ AI-Powered Guidance
                  </span>

                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    Meet Your AI{' '}
                    <span className="gradient-text">Career Counselor</span>
                  </h2>

                  <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                    Get personalized career advice powered by AI. Ask about universities,
                    companies hiring in your field, degree requirements, and career paths
                    — all tailored to your interests.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      'University recommendations for your chosen field',
                      'Companies actively hiring in your area of interest',
                      'Degree and certification guidance',
                      'Personalized career path planning',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-slate-300"
                      >
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <Link to="/counselor">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-glow px-8 py-4 bg-gradient-to-r from-tech-600 to-accent-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-tech-500/30 hover:shadow-xl hover:shadow-tech-500/40"
                    >
                      Start a Conversation
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* Right column: Static chat preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="hidden md:block"
              >
                <div className="bg-slate-900/80 rounded-2xl border border-white/10 p-6 shadow-2xl">
                  {/* Mock chat header */}
                  <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                      <span className="text-xl">🎓</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">AI Career Counselor</div>
                      <div className="text-green-400 text-xs flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse" />
                        Online
                      </div>
                    </div>
                  </div>

                  {/* Mock conversation */}
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[85%]">
                        <p className="text-sm text-slate-300">What career paths combine creativity and technology?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[85%]">
                        <p className="text-sm text-white">Great question! UX Design, Creative Technology, and Game Development all blend artistic creativity with technical skills...</p>
                      </div>
                    </div>
                  </div>

                  {/* Mock input bar */}
                  <div className="mt-6 flex space-x-2">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <span className="text-slate-500 text-sm">Ask me anything...</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-accent-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Take our quick quiz to get personalized career recommendations based on your unique interests and goals.
            </p>
            <Link to="/quiz">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-accent-600 to-accent-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-accent-500/50"
              >
                Take the Quiz Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
