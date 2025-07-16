import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingPage from './components/LandingPage';
import SuggestionPage from './components/SuggestionPage';
import TutorialPage from './components/TutorialPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/suggestions" element={<SuggestionPage />} />
            <Route path="/tutorial/:id" element={<TutorialPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
