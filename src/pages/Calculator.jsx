import React, { useEffect, useMemo, useState } from 'react'
import { apiFetch } from '../utils/api'
import { Link } from 'react-router-dom'
import { inedibleItems as localItems } from '../data/inedibleItems'

const Calculator = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [totalCalories, setTotalCalories] = useState(0)
  const [billItems, setBillItems] = useState([])
  const [items, setItems] = useState(localItems)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  // Format calories to 2–3 decimal places with grouping
  const formatCal = (value) => {
    const num = Number(value) || 0
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
      useGrouping: true,
    })
  }

  useEffect(() => {
    let cancelled = false
    const fetchItems = async () => {
      setLoading(true)
      setError('')
      try {
  const res = await apiFetch('/api/items')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!cancelled && Array.isArray(data) && data.length) {
          setItems(data)
        }
      } catch (e) {
        if (!cancelled) {
          setError('Using local dataset (backend unavailable).')
          setItems(localItems)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchItems()
    return () => { cancelled = true }
  }, [])

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

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((it) =>
      String(it.name || '').toLowerCase().includes(q) ||
      String(it.category || '').toLowerCase().includes(q) ||
      String(it.emoji || '').toLowerCase().includes(q)
    )
  }, [items, query])

  // Detect edible searches and block with an error message
  const isEdibleSearch = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return false
    const EDIBLE_KEYWORDS = [
      'apple','banana','orange','grape','mango','rice','bread','milk','egg','eggs','chicken','fish','meat','beef','pork','mutton','vegetable','vegetables','veggie','fruit','fruits','pizza','burger','sandwich','pasta','noodle','noodles','soup','curry','dal','lentil','chapati','roti','dosa','idli','upma','sambar','cake','biscuit','cookie','chocolate','ice cream','juice','tea','coffee','water','soda','cola','pepsi'
    ]
    return EDIBLE_KEYWORDS.some(k => q.includes(k))
  }, [query])

  const displayItems = isEdibleSearch ? [] : filteredItems

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
              <div className="search-row">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search items (name, category)"
                  className="form-input search-input"
                  aria-label="Search items"
                />
              </div>
              {loading && <p className="muted">Loading items…</p>}
              {!loading && error && <p className="muted">{error}</p>}
              {isEdibleSearch && (
                <p className="error">Edible food found. Seach Failed.</p>
              )}
              <div className="item-grid">
                {!isEdibleSearch && displayItems.length === 0 && (
                  <div className="no-selection" style={{ gridColumn: '1 / -1' }}>
                    <h2>No matching items</h2>
                    <p>Try a different search term</p>
                  </div>
                )}
                {displayItems.map((item) => (
                  <div
                    key={item.id}
                    className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="item-name">{item.name}</div>
                    <div className="item-category">{item.category}</div>
          <div className="item-calories">{formatCal(item.caloriesPerUnit)} cal</div>
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
                    Add
                  </button>

                  <div className="bill-section">
                    {billItems.length === 0 ? (
                      <div className="no-selection">
                        <h2>No items added</h2>
                        <p>Add items to your list</p>
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
                                {item.name}
                              </div>
                              <div className="bill-qty">{item.quantity}</div>
                              <div className="bill-unit">{formatCal(item.caloriesPerUnit)} cal</div>
                              <div className="bill-subtotal">{formatCal(item.caloriesPerUnit * item.quantity)} cal</div>
                              <button className="btn remove-btn" onClick={() => removeFromBill(item.id)}>Remove</button>
                            </div>
                          ))}
                        </div>
                        <div className="bill-actions">
                          <button className="btn clear-btn" onClick={clearBill}>Clear</button>
                        </div>
                        <div className="result-section">
                          <div className="result-display">
                            <div className="result-number">{formatCal(billTotal)}</div>
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
