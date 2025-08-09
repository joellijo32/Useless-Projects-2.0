import React from 'react'

const NutritionalFacts = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Nutrition Facts</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition-all duration-200 hover:scale-110"
          >
            ×
          </button>
        </div>
        
        {/* Classic Nutrition Label Style */}
        <div className="border-4 border-black bg-white text-black">
          {/* Header */}
          <div className="border-b-8 border-black p-2">
            <h1 className="text-3xl font-black">Nutrition Facts</h1>
            <div className="text-sm">Serving size: 1 {item.unit.slice(0, -3)} ({item.name})</div>
          </div>
          
          {/* Calories */}
          <div className="border-b-4 border-black p-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Calories</span>
              <span className="text-2xl font-bold">{item.caloriesPerUnit}</span>
            </div>
          </div>
          
          {/* Daily Value Header */}
          <div className="border-b border-black p-1 text-right text-sm font-bold">
            % Daily Value*
          </div>
          
          {/* Macronutrients */}
          <div className="border-b border-black">
            <div className="flex justify-between p-1 border-b border-gray-400">
              <span className="font-bold">Total Fat {item.macros.fat}</span>
              <span className="font-bold">67%</span>
            </div>
            <div className="flex justify-between p-1 pl-4 text-sm border-b border-gray-400">
              <span>Saturated Fat 8g</span>
              <span className="font-bold">40%</span>
            </div>
            <div className="flex justify-between p-1 pl-4 text-sm border-b border-gray-400">
              <span><em>Trans</em> Fat 0g</span>
              <span></span>
            </div>
          </div>
          
          <div className="border-b border-black">
            <div className="flex justify-between p-1 border-b border-gray-400">
              <span className="font-bold">Cholesterol 0mg</span>
              <span className="font-bold">0%</span>
            </div>
          </div>
          
          <div className="border-b border-black">
            <div className="flex justify-between p-1 border-b border-gray-400">
              <span className="font-bold">Sodium 2,300mg</span>
              <span className="font-bold">100%</span>
            </div>
          </div>
          
          <div className="border-b border-black">
            <div className="flex justify-between p-1 border-b border-gray-400">
              <span className="font-bold">Total Carbohydrate {item.macros.carbs}</span>
              <span className="font-bold">0%</span>
            </div>
            <div className="flex justify-between p-1 pl-4 text-sm border-b border-gray-400">
              <span>Dietary Fiber {item.macros.fiber}</span>
              <span className="font-bold">0%</span>
            </div>
            <div className="flex justify-between p-1 pl-4 text-sm border-b border-gray-400">
              <span>Total Sugars 0g</span>
              <span></span>
            </div>
            <div className="flex justify-between p-1 pl-8 text-sm border-b border-gray-400">
              <span>Includes 0g Added Sugars</span>
              <span className="font-bold">0%</span>
            </div>
          </div>
          
          <div className="border-b-4 border-black">
            <div className="flex justify-between p-1">
              <span className="font-bold">Protein {item.macros.protein}</span>
              <span className="font-bold">0%</span>
            </div>
          </div>
          
          {/* Vitamins and Minerals */}
          <div className="border-b border-black text-sm">
            <div className="flex justify-between p-1">
              <span>Vitamin D 0mcg</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between p-1">
              <span>Calcium 260mg</span>
              <span>{item.vitamins.Calcium}</span>
            </div>
            <div className="flex justify-between p-1">
              <span>Iron 8mg</span>
              <span>{item.vitamins.Iron}</span>
            </div>
            <div className="flex justify-between p-1">
              <span>Potassium 235mg</span>
              <span>5%</span>
            </div>
          </div>
          
          {/* Special Ingredients */}
          <div className="p-2">
            <p className="text-xs font-bold mb-2">INGREDIENTS:</p>
            <p className="text-xs leading-tight">
              {item.ingredients.join(', ').toUpperCase()}, ARTIFICIAL FLAVORING, 
              INDUSTRIAL PRESERVATIVES, SYNTHETIC COMPOUNDS, NON-FOOD GRADE MATERIALS.
            </p>
          </div>
          
          {/* Footer */}
          <div className="border-t border-black p-2 text-xs">
            <p className="mb-1">
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 
              2,000 calories a day is used for general nutrition advice.
            </p>
            <p className="font-bold text-red-600">
              ⚠️ WARNING: This product is NOT INTENDED FOR HUMAN CONSUMPTION. For entertainment purposes only.
            </p>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-2">Additional Product Information:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Manufactured in a facility that processes industrial materials</li>
            <li>• Contains no actual nutritional value</li>
            <li>• May contain traces of common sense</li>
            <li>• Not recommended by any medical professional</li>
            <li>• Side effects may include regret and confusion</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NutritionalFacts
