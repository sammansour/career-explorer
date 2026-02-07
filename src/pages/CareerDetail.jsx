import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { careers } from '../data/careers';

const CareerDetail = ({ favorites, toggleFavorite }) => {
  const { id } = useParams();
  const career = careers.find(c => c.id === id);

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-4">Career Not Found</h2>
          <Link to="/explore">
            <button className="px-6 py-3 bg-primary-600 text-white rounded-lg">
              Back to Explore
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedCareersList = career.relatedCareers
    ? careers.filter(c => career.relatedCareers.includes(c.id))
    : [];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link to="/explore" className="text-slate-400 hover:text-white transition-colors">
            ← Back to Explore
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 badge-${career.category.toLowerCase()}`}>
                  {career.category} • {career.subcategory}
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  {career.title}
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl">
                  {career.description}
                </p>
              </div>
              
              <button
                onClick={() => toggleFavorite(career.id)}
                className="p-3 hover:scale-110 transition-transform"
              >
                <span className="text-4xl">
                  {favorites.includes(career.id) ? '❤️' : '🤍'}
                </span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Entry Level</div>
                <div className="text-2xl font-bold text-green-400">
                  ${(career.salaryRange.entry / 1000).toFixed(0)}k
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Median Salary</div>
                <div className="text-2xl font-bold text-green-400">
                  ${(career.salaryRange.median / 1000).toFixed(0)}k
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-sm text-slate-400 mb-1">Senior Level</div>
                <div className="text-2xl font-bold text-green-400">
                  ${(career.salaryRange.senior / 1000).toFixed(0)}k
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                About This Career
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {career.detailedDescription}
              </p>
            </motion.div>

            {/* Typical Day */}
            {career.typicalDay && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-8"
              >
                <h2 className="text-2xl font-display font-bold text-white mb-4">
                  A Day in the Life
                </h2>
                <ul className="space-y-3">
                  {career.typicalDay.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-400 mr-3">•</span>
                      <span className="text-slate-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Action Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                🚀 How to Get Started
              </h2>
              <div className="space-y-4">
                {career.actionSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <p className="text-slate-300 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Key Information
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400 mb-2">Job Outlook</div>
                  <div className="text-white font-semibold">{career.outlook}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-2">Work Environment</div>
                  <div className="text-white font-semibold">{career.workEnvironment}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-2">Education Required</div>
                  <div className="space-y-2">
                    {career.education.map((edu, index) => (
                      <div key={index} className="text-sm text-slate-300 bg-white/5 rounded px-3 py-2">
                        {edu}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-2">Key Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-primary-600/20 to-accent-600/20 border border-primary-500/30 rounded-full text-xs text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-400 mb-2">Interests Match</div>
                  <div className="flex flex-wrap gap-2">
                    {career.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ask AI Counselor */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link to={`/counselor?careerId=${career.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-tech-600 to-accent-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-tech-500/20 hover:shadow-xl hover:shadow-tech-500/30 flex items-center justify-center space-x-2"
                    >
                      <span>🎓</span>
                      <span>Ask AI Counselor</span>
                    </motion.button>
                  </Link>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Get personalized advice about this career
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Careers */}
            {relatedCareersList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-xl font-display font-bold text-white mb-4">
                  Related Careers
                </h3>
                <div className="space-y-3">
                  {relatedCareersList.map(relatedCareer => (
                    <Link
                      key={relatedCareer.id}
                      to={`/career/${relatedCareer.id}`}
                      className="block bg-white/5 hover:bg-white/10 rounded-lg p-3 transition-colors"
                    >
                      <div className="font-semibold text-white text-sm mb-1">
                        {relatedCareer.title}
                      </div>
                      <div className="text-xs text-slate-400">
                        {relatedCareer.category}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
