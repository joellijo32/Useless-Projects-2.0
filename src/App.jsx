import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import DietPlanner from './pages/DietPlanner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="app">
        {/* Animated Background Elements */}
        <div className="background-animation">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
        </div>

        <Navbar />
        
        {/* Pages handle their own containers to avoid double-padding */}
        <Routes>
          <Route path="/" element={<div className="container"><Home /></div>} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/diet-planner" element={<div className="container"><DietPlanner /></div>} />
        </Routes>

  <Footer />
      </div>
    </Router>
  )
}

export default App
