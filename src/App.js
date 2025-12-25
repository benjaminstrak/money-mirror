import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoadingPage from './components/LoadingPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import TransitionTestPage from './components/TransitionTestPage';
import TransitionWrapper from './components/TransitionWrapper';
import './App.css';

function AppRoutes() {
  return (
    <TransitionWrapper>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/test-transitions" element={<TransitionTestPage />} />
      </Routes>
    </TransitionWrapper>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
