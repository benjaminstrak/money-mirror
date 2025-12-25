import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoadingPage from './components/LoadingPage';
import Loading2Page from './components/Loading2Page';
import QuizPage from './components/QuizPage';
import CameraCapture from './components/CameraCapture';
import ResultsPage from './components/ResultsPage';
import TransitionTestPage from './components/TransitionTestPage';
import ImageGenTestPage from './components/ImageGenTestPage';
import TransitionWrapper from './components/TransitionWrapper';
import './App.css';

function AppRoutes() {
  return (
    <TransitionWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/loading2" element={<Loading2Page />} />
              <Route path="/capture" element={<CameraCapture />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/test-transitions" element={<TransitionTestPage />} />
              <Route path="/test-image-gen" element={<ImageGenTestPage />} />
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
