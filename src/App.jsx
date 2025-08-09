import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ItemSelector from './components/ItemSelector'
import CalorieCalculator from './components/CalorieCalculator'
import DietPlan from './components/DietPlan'
import NutritionalFacts from './components/NutritionalFacts'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

function App() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [calculatedCalories, setCalculatedCalories] = useState(0)
  const [showDietPlan, setShowDietPlan] = useState(false)
  const [showNutritionFacts, setShowNutritionFacts] = useState(false)

  return (
    <div className="app">
      {/* Animated Background Elements */}
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container">
        <Header />
        
        <ItemSelector 
          onItemSelect={setSelectedItem} 
          selectedItem={selectedItem}
        />
        
        {selectedItem && (
          <CalorieCalculator 
            item={selectedItem}
            onCaloriesCalculated={setCalculatedCalories}
            onShowDietPlan={() => setShowDietPlan(true)}
            onShowNutritionFacts={() => setShowNutritionFacts(true)}
          />
        )}
        
        {showDietPlan && calculatedCalories > 0 && (
          <DietPlan 
            item={selectedItem}
            calories={calculatedCalories}
            onClose={() => setShowDietPlan(false)}
          />
        )}
        
        {showNutritionFacts && selectedItem && (
          <NutritionalFacts 
            item={selectedItem}
            onClose={() => setShowNutritionFacts(false)}
          />
        )}
        
        <Reviews />
        <Footer />
      </div>
    </div>
  )
}

export default App
