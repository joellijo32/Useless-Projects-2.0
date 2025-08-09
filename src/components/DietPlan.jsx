import React from 'react'
import { generateDietPlan } from '../utils/dietPlanGenerator'

const DietPlan = ({ item, calories, onClose }) => {
  const dietPlan = generateDietPlan(item, calories)

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">
            🍽️ Your {item.name} Diet Plan
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xl transition-all duration-200 hover:scale-110"
          >
            ×
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 mb-8 border border-blue-400/30">
          <p className="text-xl text-white font-semibold">
            <strong>Daily Intake Goal:</strong> {calories.toLocaleString()} calories from {item.name}
          </p>
          <p className="text-gray-300 mt-2">
            This scientifically calculated intake will revolutionize your relationship with inedible objects.
          </p>
        </div>
        
        {/* Weekly Meal Plan */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
            📅 7-Day Meal Plan
          </h3>
          <div className="grid gap-3">
            {dietPlan.weeklyPlan.map((day, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-400 text-lg">{day.day}</span>
                  <span className="text-xs text-gray-400">{day.time}</span>
                </div>
                <p className="text-gray-300 mt-2">{day.meal}</p>
                <div className="text-xs text-yellow-400 mt-2">
                  Preparation time: {day.prepTime} | Difficulty: {day.difficulty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutritional Benefits */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-900/30 rounded-2xl p-6 border border-green-400/30">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
              💊 "Nutritional" Benefits
            </h3>
            <ul className="space-y-2">
              {dietPlan.benefits.map((benefit, index) => (
                <li key={index} className="text-green-200 flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-900/30 rounded-2xl p-6 border border-red-400/30">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
              ⚠️ Potential Side Effects
            </h3>
            <ul className="space-y-2">
              {dietPlan.sideEffects.map((effect, index) => (
                <li key={index} className="text-red-200 flex items-start">
                  <span className="text-red-400 mr-2">⚠</span>
                  {effect}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expert Testimonials */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">👨‍⚕️ Expert Testimonials</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {dietPlan.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 rounded-xl p-4 border border-white/20">
                <p className="text-gray-300 italic mb-2">"{testimonial.quote}"</p>
                <p className="text-sm text-gray-400">
                  - {testimonial.author}, {testimonial.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping List */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">🛒 Shopping List</h3>
          <div className="bg-white/10 rounded-xl p-6 border border-white/20">
            <div className="grid md:grid-cols-3 gap-4">
              {dietPlan.shoppingList.map((category, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-300 mb-2">{category.category}</h4>
                  <ul className="space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-400 text-sm">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final Warning */}
        <div className="bg-yellow-900/40 border border-yellow-400/50 rounded-xl p-6">
          <div className="text-yellow-200">
            <p className="font-bold text-lg mb-2">🚨 CRITICAL DISCLAIMER</p>
            <p className="text-sm leading-relaxed">
              This entire diet plan is 100% satirical content created for entertainment purposes only. 
              <strong> DO NOT ATTEMPT TO CONSUME ANY OF THESE ITEMS.</strong> They are completely inedible, 
              potentially toxic, and could cause serious harm. This is not medical or nutritional advice. 
              Please consult qualified healthcare professionals for actual dietary guidance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DietPlan
