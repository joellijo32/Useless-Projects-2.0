import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { inedibleItems } from '../data/inedibleItems'

const Calculator = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [totalCalories, setTotalCalories] = useState(0)
  const [billItems, setBillItems] = useState([])

  const addToBill = () => {
    if (!selectedItem || quantity < 1) return
    setBillItems(prev => {
      const idx = prev.findIndex(i => i.id === selectedItem.id)
      if (idx !== -1) {
        const updated = [...prev]
        const newQty = Math.min(100, updated[idx].quantity + quantity)
        updated[idx] = { ...updated[idx], quantity: newQty }
        return updated
      }
      return [
        ...prev,
        {
          id: selectedItem.id,
          name: selectedItem.name,
          emoji: selectedItem.emoji,
          caloriesPerUnit: selectedItem.caloriesPerUnit,
          quantity: Math.min(100, quantity)
        }
      ]
    })
  }

  const removeFromBill = (id) => {
    setBillItems(prev => prev.filter(i => i.id !== id))
  }

  const clearBill = () => setBillItems([])

  const billTotal = billItems.reduce((sum, i) => sum + i.caloriesPerUnit * i.quantity, 0)

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
                    onClick={addToBill}
                    className="btn btn-primary calculate-btn"
                  >
                    Add to Bill
                  </button>

                  <div className="bill-section">
                    {billItems.length === 0 ? (
                      <div className="no-selection">
                        <h2>No items added</h2>
                        <p>Add items to build your calorie bill</p>
                      </div>
                    ) : (
                      <>
                        <div className="bill-header">
                          <span>Item</span>
                          <span>Qty</span>
                          <span>Per Unit</span>
                          <span>Subtotal</span>
                          <span></span>
                        </div>
                        <div className="bill-list">
                          {billItems.map(item => (
                            <div key={item.id} className="bill-item-row">
                              <div className="bill-item-name">
                                <span className="bill-emoji">{item.emoji}</span>
                                {item.name}
                              </div>
                              <div className="bill-qty">{item.quantity}</div>
                              <div className="bill-unit">{item.caloriesPerUnit} cal</div>
                              <div className="bill-subtotal">{(item.caloriesPerUnit * item.quantity).toLocaleString()} cal</div>
                              <button className="btn remove-btn" onClick={() => removeFromBill(item.id)}>Remove</button>
                            </div>
                          ))}
                        </div>
                        <div className="bill-actions">
                          <button className="btn clear-btn" onClick={clearBill}>Clear Bill</button>
                        </div>
                        <div className="result-section">
                          <div className="result-display">
                            <div className="result-number">{billTotal.toLocaleString()}</div>
                            <div className="result-label">Total Calories</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
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
