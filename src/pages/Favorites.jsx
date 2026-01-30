import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { careers } from '../data/careers';

const Favorites = ({ favorites, toggleFavorite }) => {
  const favoriteCareers = careers.filter(career => favorites.includes(career.id));

  if (favoriteCareers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-6">📋</div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            No Favorites Yet
          </h2>
          <p className="text-slate-400 mb-8">
            Start exploring careers and save your favorites to compare them later
          </p>
          <Link to="/explore">
            <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
              Explore Careers
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Your <span className="gradient-text">Favorite</span> Careers
          </h1>
          <p className="text-slate-400 text-lg">
            You have {favoriteCareers.length} {favoriteCareers.length === 1 ? 'career' : 'careers'} saved
          </p>
        </motion.div>

        {/* Comparison Table */}
        <div className="glass rounded-3xl p-8 mb-8 overflow-x-auto">
          <h2 className="text-2xl font-display font-bold text-white mb-6">
            Quick Comparison
          </h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Career</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Median Salary</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Outlook</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favoriteCareers.map((career, index) => (
                <motion.tr
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{career.title}</div>
                    <div className="text-sm text-slate-400">{career.subcategory}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold badge-${career.category.toLowerCase()}`}>
                      {career.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-green-400 font-semibold">
                      ${(career.salaryRange.median / 1000).toFixed(0)}k
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-primary-400 font-semibold text-sm">
                      {career.outlook.split('(')[0]}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Link to={`/career/${career.id}`}>
                        <button className="px-3 py-1 bg-primary-600 hover:bg-primary-500 text-white rounded text-sm font-medium">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => toggleFavorite(career.id)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCareers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass rounded-2xl p-6 card-hover relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full -mr-16 -mt-16" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 badge-${career.category.toLowerCase()}`}>
                      {career.category}
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-2">
                      {career.title}
                    </h3>
                    <p className="text-sm text-slate-400">{career.subcategory}</p>
                  </div>
                  
                  <button
                    onClick={() => toggleFavorite(career.id)}
                    className="p-2 hover:scale-110 transition-transform"
                  >
                    <span className="text-2xl">❤️</span>
                  </button>
                </div>

                <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                  {career.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Entry Salary</span>
                    <span className="text-green-400 font-semibold">
                      ${(career.salaryRange.entry / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Median Salary</span>
                    <span className="text-green-400 font-semibold">
                      ${(career.salaryRange.median / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Senior Salary</span>
                    <span className="text-green-400 font-semibold">
                      ${(career.salaryRange.senior / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Job Outlook</span>
                    <span className="text-primary-400 font-semibold">
                      {career.outlook.split('(')[0]}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {career.interests.slice(0, 3).map(interest => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <Link to={`/career/${career.id}`}>
                  <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-shadow">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
