import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatButton from './components/ChatButton';
import ChatWindow from './components/ChatWindow';
import Home from './pages/Home';
import ExploreCareers from './pages/ExploreCareers';
import CareerDetail from './pages/CareerDetail';
import Quiz from './pages/Quiz';
import Favorites from './pages/Favorites';
import { careers } from './data/careers';
import './styles/index.css';

function AppContent() {
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentCareer, setCurrentCareer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Update current career based on route
  useEffect(() => {
    const pathMatch = location.pathname.match(/\/career\/(.+)/);
    if (pathMatch) {
      const careerId = pathMatch[1];
      const career = careers.find(c => c.id === careerId);
      setCurrentCareer(career);
    } else {
      setCurrentCareer(null);
    }
  }, [location]);

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

      {/* AI Career Counselor Chatbot */}
      <ChatButton 
        onClick={() => setIsChatOpen(!isChatOpen)} 
        isOpen={isChatOpen}
      />
      <ChatWindow 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        careerId={currentCareer?.id}
        careerTitle={currentCareer?.title}
      />
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
