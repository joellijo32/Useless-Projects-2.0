import React, { useState } from 'react'
import { generateDietPlan } from '../utils/dietPlanGenerator'

const DietPlanner = () => {
  const [formData, setFormData] = useState({
    goal: '',
    calories: '',
    meals: '3',
    duration: '7'
  })
  const [dietPlan, setDietPlan] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGeneratePlan = () => {
    if (!formData.goal || !formData.calories) return
    
    setIsGenerating(true)
    setTimeout(() => {
      const plan = generateDietPlan(formData)
      setDietPlan(plan)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="diet-planner-page">
      <div className="page-header glass-card">
        <h1>Diet Plan Generator</h1>
        <p>Create a personalized nutrition plan based on your goals and preferences</p>
      </div>

      <div className="planner-grid">
        <div className="form-section glass-card">
          <h2>Your Information</h2>
          
          <div className="form-group">
            <label>Primary Goal</label>
            <select 
              name="goal" 
              value={formData.goal} 
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select your goal</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="muscle-gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
              <option value="performance">Athletic Performance</option>
            </select>
          </div>

          <div className="form-group">
            <label>Target Daily Calories</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              placeholder="e.g., 2000"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Meals Per Day</label>
            <select 
              name="meals" 
              value={formData.meals} 
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="3">3 Meals</option>
              <option value="4">4 Meals</option>
              <option value="5">5 Meals</option>
              <option value="6">6 Meals</option>
            </select>
          </div>

          <div className="form-group">
            <label>Plan Duration</label>
            <select 
              name="duration" 
              value={formData.duration} 
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="7">1 Week</option>
              <option value="14">2 Weeks</option>
              <option value="30">1 Month</option>
            </select>
          </div>

          <button 
            onClick={handleGeneratePlan}
            className="btn btn-primary generate-btn"
            disabled={isGenerating || !formData.goal || !formData.calories}
          >
            {isGenerating ? 'Generating Plan...' : 'Generate Diet Plan'}
          </button>
        </div>

        <div className="preview-section glass-card">
          <h2>Plan Preview</h2>
          
          {!dietPlan && !isGenerating && (
            <div className="no-plan">
              <p>Complete the form to generate your personalized diet plan</p>
            </div>
          )}

          {isGenerating && (
            <div className="generating">
              <div className="spinner"></div>
              <p>Creating your personalized diet plan...</p>
            </div>
          )}

          {dietPlan && (
            <div className="plan-summary">
              <div className="plan-header">
                <h3>Your {dietPlan.duration}-Day Plan</h3>
                <div className="plan-stats">
                  <span>{dietPlan.dailyCalories} cal/day</span>
                  <span>{dietPlan.mealsPerDay} meals/day</span>
                </div>
              </div>
              
              <div className="macros-breakdown">
                <div className="macro-item">
                  <span className="macro-label">Protein</span>
                  <span className="macro-value">{dietPlan.macros.protein}g</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Carbs</span>
                  <span className="macro-value">{dietPlan.macros.carbs}g</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Fat</span>
                  <span className="macro-value">{dietPlan.macros.fat}g</span>
                </div>
              </div>

              <div className="sample-day">
                <h4>Sample Day</h4>
                {dietPlan.sampleMeals.map((meal, index) => (
                  <div key={index} className="meal-item">
                    <span className="meal-time">{meal.time}</span>
                    <span className="meal-name">{meal.name}</span>
                    <span className="meal-calories">{meal.calories} cal</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DietPlanner
