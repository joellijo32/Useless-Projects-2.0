import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          NutriTrack Pro
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/calculator" 
            className={`nav-link ${location.pathname === '/calculator' ? 'active' : ''}`}
          >
            Calculator
          </Link>
          <Link 
            to="/diet-planner" 
            className={`nav-link ${location.pathname === '/diet-planner' ? 'active' : ''}`}
          >
            Diet Planner
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
