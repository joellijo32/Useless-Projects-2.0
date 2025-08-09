import React from 'react'
import { inedibleItems } from '../data/inedibleItems'

const ItemSelector = ({ onItemSelect, selectedItem }) => {
  return (
    <div className="glass-card">
      <h2>
        Choose Your "Nutritious" Item 🍽️
      </h2>
      
      <div className="item-grid">
        {inedibleItems.map((item) => (
          <div
            key={item.id}
            className={`item-card ${selectedItem?.id === item.id ? 'selected' : ''}`}
            onClick={() => onItemSelect(item)}
          >
            {/* Selection indicator */}
            {selectedItem?.id === item.id && (
              <div className="selection-indicator">
                <span>✓</span>
              </div>
            )}
            
            {/* Item emoji with animation */}
            <div className="item-emoji">
              {item.emoji}
            </div>
            
            {/* Item name */}
            <div className="item-name">
              {item.name}
            </div>
            
            {/* Category */}
            <div className="item-category">
              {item.category}
            </div>
            
            {/* Calorie preview */}
            <div className="item-calories">
              {item.caloriesPerUnit} cal
            </div>
          </div>
        ))}
      </div>
      
      <div className="selection-status">
        <p>
          {selectedItem ? `Selected: ${selectedItem.name}` : 'Select an item to view its nutritional "information"'}
        </p>
      </div>
    </div>
  )
}

export default ItemSelector
