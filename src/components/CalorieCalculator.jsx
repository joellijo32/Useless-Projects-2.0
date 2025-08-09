import React, { useState, useEffect } from 'react'

const CalorieCalculator = ({ item, onCaloriesCalculated, onShowDietPlan, onShowNutritionFacts }) => {
  const [quantity, setQuantity] = useState(1)
  const [totalCalories, setTotalCalories] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (item) {
      setIsCalculating(true)
      // Fake loading time for dramatic effect
      setTimeout(() => {
        const calories = item.caloriesPerUnit * quantity
        setTotalCalories(calories)
        onCaloriesCalculated(calories)
        setIsCalculating(false)
      }, 800)
    }
  }, [item, quantity, onCaloriesCalculated])

  if (!item) return null

  return (
    <div className="glass-card">
      <h2>
        Calculating Calories for {item.emoji} {item.name}
      </h2>
      
      {/* Quantity Selector */}
      <div className="form-group">
        <label className="quantity-label">
          Quantity Selection
        </label>
        <div className="quantity-controls">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="quantity-btn minus"
          >
            -
          </button>
          <div>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="quantity-input"
            />
            <div className="unit-label">{item.unit}</div>
          </div>
          <button 
            onClick={() => setQuantity(Math.min(100, quantity + 1))}
            className="quantity-btn plus"
          >
            +
          </button>
        </div>
      </div>

      {/* Calorie Display */}
      <div className="calorie-display">
        {isCalculating ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <span>Calculating nutritional complexity...</span>
          </div>
        ) : (
          <div>
            <div className="calorie-number">
              {totalCalories.toLocaleString()}
            </div>
            <div className="calorie-label">calories</div>
            <div className="calorie-per-unit">
              ({item.caloriesPerUnit} cal per {item.unit.slice(0, -3)})
            </div>
          </div>
        )}
      </div>

      {/* Item Description */}
      <div className="item-description">
        <p>
          {item.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="two-column-grid">
        <button 
          onClick={onShowDietPlan}
          className="btn btn-primary"
        >
          📋 Generate Diet Plan
        </button>
        <button 
          onClick={onShowNutritionFacts}
          className="btn btn-secondary"
        >
          📊 Nutrition Facts
        </button>
      </div>

      {/* Fun Fact */}
      <div className="alert alert-info">
        <div>
          <strong>🤓 Did you know?</strong> {item.funFact}
        </div>
      </div>
    </div>
  )
}

export default CalorieCalculator
