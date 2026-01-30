import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore Careers' },
    { path: '/quiz', label: 'Take Quiz' },
    { path: '/favorites', label: 'Favorites' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass border-b border-white/10"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">C</span>
            </motion.div>
            <span className="text-xl font-display font-bold text-white">
              Career<span className="gradient-text">Explorer</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-4 py-2 text-sm font-medium"
              >
                <span
                  className={`relative z-10 ${
                    location.pathname === item.path
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-slate-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
