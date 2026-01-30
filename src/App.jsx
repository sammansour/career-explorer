import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ExploreCareers from './pages/ExploreCareers';
import CareerDetail from './pages/CareerDetail';
import Quiz from './pages/Quiz';
import Favorites from './pages/Favorites';
import './styles/index.css';

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [darkMode, setDarkMode] = useState(true);

  const toggleFavorite = (careerId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(careerId)
        ? prev.filter(id => id !== careerId)
        : [...prev, careerId];
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/explore" 
            element={
              <ExploreCareers 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            } 
          />
          <Route 
            path="/career/:id" 
            element={
              <CareerDetail 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            } 
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route 
            path="/favorites" 
            element={
              <Favorites 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
