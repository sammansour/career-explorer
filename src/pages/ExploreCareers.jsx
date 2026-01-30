import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { careers, categories, interests } from '../data/careers';

const ExploreCareers = ({ favorites, toggleFavorite }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [salaryFilter, setSalaryFilter] = useState({ min: 0, max: 250000 });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const filteredCareers = careers.filter(career => {
    const matchesCategory = selectedCategory === 'All' || career.category === selectedCategory;
    const matchesInterests = selectedInterests.length === 0 || 
      selectedInterests.some(interest => career.interests.includes(interest));
    const matchesSalary = career.salaryRange.median >= salaryFilter.min && 
      career.salaryRange.median <= salaryFilter.max;
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesInterests && matchesSalary && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Explore <span className="gradient-text">Career Paths</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Discover careers that match your interests and goals
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-display font-bold text-white mb-4">Filters</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm text-slate-400 mb-2 block">Search</label>
                <input
                  type="text"
                  placeholder="Search careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm text-slate-400 mb-2 block">Category</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full px-4 py-2 rounded-lg text-left text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="text-sm text-slate-400 mb-2 block">
                  Median Salary Range
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="250000"
                    step="10000"
                    value={salaryFilter.max}
                    onChange={(e) => setSalaryFilter({ ...salaryFilter, max: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-sm text-slate-300 flex justify-between">
                    <span>$0</span>
                    <span>${(salaryFilter.max / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interests.slice(0, 8).map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedInterests.includes(interest)
                          ? 'bg-accent-600 text-white'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedCategory !== 'All' || selectedInterests.length > 0 || salaryFilter.max < 250000 || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedInterests([]);
                    setSalaryFilter({ min: 0, max: 250000 });
                    setSearchQuery('');
                  }}
                  className="w-full mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-sm font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>

          {/* Career Cards */}
          <div className="lg:col-span-3">
            <div className="mb-6 text-slate-400">
              Showing {filteredCareers.length} {filteredCareers.length === 1 ? 'career' : 'careers'}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCareers.map((career, index) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
                        <span className="text-2xl">
                          {favorites.includes(career.id) ? '❤️' : '🤍'}
                        </span>
                      </button>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                      {career.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Median Salary</span>
                        <span className="text-green-400 font-semibold">
                          ${(career.salaryRange.median / 1000).toFixed(0)}k
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
                      {career.interests.length > 3 && (
                        <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-400">
                          +{career.interests.length - 3} more
                        </span>
                      )}
                    </div>

                    <Link to={`/career/${career.id}`}>
                      <button className="w-full py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-shadow">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredCareers.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  No careers found
                </h3>
                <p className="text-slate-400">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCareers;
