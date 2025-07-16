import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import LandingPage from './components/LandingPage';
import SuggestionPage from './components/SuggestionPage';
import TutorialPage from './components/TutorialPage';
import './App.css';

// Animated Routes component to handle page transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
        <Route path="/tutorial/:id" element={<TutorialPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <Router basename="/RandomlyInspired">
        <div className="App">
          <AnimatedRoutes />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
