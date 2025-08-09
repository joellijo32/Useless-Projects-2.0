import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { inedibleItems } from '../data/inedibleItems'

const Calculator = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [totalCalories, setTotalCalories] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateCalories = () => {
    if (!selectedItem) return
    
    setIsCalculating(true)
    setTimeout(() => {
      const calories = selectedItem.caloriesPerUnit * quantity
      setTotalCalories(calories)
      setIsCalculating(false)
    }, 1000)
  }

  return (
    <div className="calculator-page">
      <div className="page-header">
        <div className="container">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Calorie Calculator</h1>
          <p>Professional nutritional analysis for comprehensive item database</p>
        </div>
      </div>

      <div className="calculator-content">
        <div className="container">
          <div className="calculator-grid">
            <div className="item-selection-panel">
              <h2>Select Item</h2>
              <div className="item-grid">
                {inedibleItems.map((item) => (
                  <div
                    key={item.id}
                    className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="item-emoji">{item.emoji}</div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-category">{item.category}</div>
                    <div className="item-calories">{item.caloriesPerUnit} cal</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="calculation-panel">
              {selectedItem ? (
                <>
                  <h2>Calculate Calories</h2>
                  <div className="selected-item-info">
                    <div className="selected-item-display">
                      <span className="selected-emoji">{selectedItem.emoji}</span>
                      <div>
                        <div className="selected-name">{selectedItem.name}</div>
                        <div className="selected-category">{selectedItem.category}</div>
                      </div>
                    </div>
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
                    onClick={calculateCalories}
                    className="btn btn-primary calculate-btn"
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Calories'}
                  </button>

                  {totalCalories > 0 && !isCalculating && (
                    <div className="result-section">
                      <div className="result-display">
                        <div className="result-number">{totalCalories.toLocaleString()}</div>
                        <div className="result-label">Total Calories</div>
                        <div className="result-breakdown">
                          {quantity} × {selectedItem.caloriesPerUnit} cal = {totalCalories} cal
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-selection">
                  <h2>Select an Item</h2>
                  <p>Choose an item from the left panel to begin calculation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
