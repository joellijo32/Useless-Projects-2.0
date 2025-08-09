import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero-section glass-card">
        <h1 className="hero-title">
          NutriTrack Pro
        </h1>
        <p className="hero-subtitle">
          Advanced Nutritional Analysis & Diet Planning Platform
        </p>
        <p className="hero-description">
          Discover comprehensive nutritional information and create personalized diet plans 
          with our cutting-edge analysis technology.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card glass-card">
          <div className="feature-icon">🧮</div>
          <h3>Calorie Calculator</h3>
          <p>
            Analyze nutritional content with precision. Our advanced algorithms provide 
            detailed caloric breakdown for comprehensive dietary planning.
          </p>
          <Link to="/calculator" className="btn btn-primary">
            Start Calculating
          </Link>
        </div>

        <div className="feature-card glass-card">
          <div className="feature-icon">📋</div>
          <h3>Diet Planner</h3>
          <p>
            Create customized meal plans tailored to your nutritional goals. 
            Generate balanced diet schedules with scientific precision.
          </p>
          <Link to="/diet-planner" className="btn btn-secondary">
            Plan Your Diet
          </Link>
        </div>
      </div>

      <div className="stats-section glass-card">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Items Analyzed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Available</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Diet Plans Created</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
