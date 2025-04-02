import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/GlobalStyle';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navigation />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </>
  );
}

export default App;