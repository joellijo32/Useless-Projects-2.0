export const generateDietPlan = (formData) => {
  const goal = formData.goal || 'maintenance'
  const dailyCalories = Math.max(1000, Math.min(6000, Number(formData.calories) || 2000))
  const mealsPerDay = Math.max(2, Math.min(6, Number(formData.meals) || 3))
  const duration = Math.max(1, Math.min(60, Number(formData.duration) || 7))

  // Macro splits by goal
  const macroSplits = {
    'weight-loss': { protein: 0.35, carbs: 0.35, fat: 0.30 },
    'muscle-gain': { protein: 0.30, carbs: 0.50, fat: 0.20 },
    'performance': { protein: 0.25, carbs: 0.55, fat: 0.20 },
    'maintenance': { protein: 0.25, carbs: 0.45, fat: 0.30 }
  }

  const split = macroSplits[goal] || macroSplits['maintenance']
  const macros = {
    protein: Math.round((dailyCalories * split.protein) / 4), // g
    carbs: Math.round((dailyCalories * split.carbs) / 4),     // g
    fat: Math.round((dailyCalories * split.fat) / 9)          // g
  }

  // Sample meals (generic placeholders)
  const perMealCalories = Math.round(dailyCalories / mealsPerDay)
  const sampleMeals = Array.from({ length: mealsPerDay }).map((_, i) => ({
    time: [
      '8:00 AM', '10:30 AM', '1:00 PM', '4:00 PM', '7:00 PM', '9:30 PM'
    ][i],
    name: `Balanced Meal ${i + 1}`,
    calories: perMealCalories
  }))

  return {
    duration,
    dailyCalories,
    mealsPerDay,
    macros,
    sampleMeals
  }
}
