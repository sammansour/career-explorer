import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ExploreCareers from './pages/ExploreCareers';
import CareerDetail from './pages/CareerDetail';
import Quiz from './pages/Quiz';
import Favorites from './pages/Favorites';
import AICounselor from './pages/AICounselor';
import './styles/index.css';

function AppContent() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

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
    <div className="min-h-screen dark">
      <Header />
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
        <Route path="/counselor" element={<AICounselor />} />
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
