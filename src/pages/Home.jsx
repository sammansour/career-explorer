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

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
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
