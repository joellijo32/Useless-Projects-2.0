import React, { useState } from 'react'
import { inedibleItems } from '../data/inedibleItems'

const CalorieCalculator = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = () => {
    if (!selectedItem) return
    
    setIsCalculating(true)
    setTimeout(() => {
      const totalCalories = selectedItem.caloriesPerUnit * quantity
      setResults({
        calories: totalCalories,
        protein: Math.round(totalCalories * 0.15),
        carbs: Math.round(totalCalories * 0.55),
        fat: Math.round(totalCalories * 0.30),
        fiber: Math.round(totalCalories * 0.05)
      })
      setIsCalculating(false)
    }, 1200)
  }

  return (
    <div className="calculator-page">
      <div className="page-header glass-card">
        <h1>Nutritional Calculator</h1>
        <p>Select an item to analyze its complete nutritional profile</p>
      </div>

      <div className="calculator-grid">
        <div className="item-selection glass-card">
          <h2>Select Item</h2>
          <div className="item-grid">
            {inedibleItems.map((item) => (
              <div
                key={item.id}
                className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
               
                <div className="item-name">{item.name}</div>
                <div className="item-category">{item.category}</div>
                <div className="item-calories">{item.caloriesPerUnit} cal</div>
              </div>
            ))}
          </div>
        </div>

        <div className="calculation-panel glass-card">
          <h2>Analysis Configuration</h2>
          
          {selectedItem && (
            <>
              <div className="selected-item">
                
                <span className="selected-name">{selectedItem.name}</span>
              </div>

              <div className="quantity-section">
                <label>Quantity</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn minus"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="quantity-input"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(100, quantity + 1))}
                    className="quantity-btn plus"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                className="btn btn-primary calculate-btn"
                disabled={isCalculating}
              >
                {isCalculating ? 'Analyzing...' : 'Calculate Nutrition'}
              </button>
            </>
          )}

          {!selectedItem && (
            <div className="no-selection">
              <p>Please select an item to begin analysis</p>
            </div>
          )}
        </div>
      </div>

      {results && (
        <div className="results-section glass-card">
          <h2>Nutritional Analysis Results</h2>
          <div className="results-grid">
            <div className="result-card">
              <div className="result-value">{results.calories.toLocaleString()}</div>
              <div className="result-label">Total Calories</div>
            </div>
            <div className="result-card">
              <div className="result-value">{results.protein}g</div>
              <div className="result-label">Protein</div>
            </div>
            <div className="result-card">
              <div className="result-value">{results.carbs}g</div>
              <div className="result-label">Carbohydrates</div>
            </div>
            <div className="result-card">
              <div className="result-value">{results.fat}g</div>
              <div className="result-label">Fat</div>
            </div>
            <div className="result-card">
              <div className="result-value">{results.fiber}g</div>
              <div className="result-label">Fiber</div>
            </div>
          </div>
        </div>
      )}

      {isCalculating && (
        <div className="analyzing-overlay">
          <div className="analyzing-content">
            <div className="spinner"></div>
            <p>Performing nutritional analysis...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CalorieCalculator
