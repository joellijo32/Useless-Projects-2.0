import { inedibleItems as localFallbackItems } from '../data/inedibleItems'

// Weighted random sampling without replacement
function weightedSample(items, weights, k) {
  const selected = []
  const poolItems = items.slice()
  const poolWeights = weights.slice()
  while (selected.length < k && poolItems.length > 0) {
    const total = poolWeights.reduce((a, b) => a + b, 0)
    let r = Math.random() * total
    let idx = 0
    for (; idx < poolWeights.length; idx++) {
      r -= poolWeights[idx]
      if (r <= 0) break
    }
    selected.push(poolItems[idx])
    poolItems.splice(idx, 1)
    poolWeights.splice(idx, 1)
  }
  return selected
}

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const generateDietPlan = async (formData) => {
  // Keep inputs bounded and simple
  const dailyCalories = Math.max(1000, Math.min(6000, Number(formData.calories) || 2000))
  const mealsPerDay = Math.max(2, Math.min(6, Number(formData.meals) || 3))
  const duration = Math.max(1, Math.min(60, Number(formData.duration) || 7))

  const perMealCalories = Math.round(dailyCalories / mealsPerDay)

  // Get items from backend; fallback to local list on failure
  let items = []
  try {
    const res = await fetch('/api/items')
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) items = data
    }
  } catch (e) {
    // ignore and fallback
  }
  if (!items.length) items = Array.isArray(localFallbackItems) ? localFallbackItems : []

  // Build weights favoring items whose caloriesPerUnit are closer to the per-meal target
  const eps = 1e-6
  const weights = items.map(it => {
    const cal = Number(it.caloriesPerUnit) || 0
    const diff = Math.abs(cal - perMealCalories)
    // Inverse distance with smoothing; add a small base weight for variety
    return 1 / (1 + diff) + 0.05
  })

  // Sample items; if not enough unique items, allow wrapping by shuffling
  let picked = weightedSample(items, weights, Math.min(mealsPerDay, items.length))
  if (picked.length < mealsPerDay) {
    const filler = shuffle(items)
    while (picked.length < mealsPerDay && filler.length) picked.push(filler[picked.length % filler.length])
  }

  // Build randomized meal times from a base schedule
  const baseTimes = ['8:00 AM', '10:30 AM', '1:00 PM', '4:00 PM', '7:00 PM', '9:30 PM']
  const times = shuffle(baseTimes).slice(0, mealsPerDay)

  const sampleMeals = picked.map((item, i) => {
    const itemCal = Math.max(1, Number(item?.caloriesPerUnit) || 0)
    let qty = itemCal > 0 ? perMealCalories / itemCal : 1
    // Bound quantity and round to quarter steps for readable portions
    qty = Math.max(0.25, Math.min(4, Math.round(qty / 0.25) * 0.25))
    const qtyStr = Number.isInteger(qty) ? `${qty}` : `${qty.toFixed(2).replace(/\.00$/, '')}`
    const mealCalories = Math.round(itemCal * qty)

    const baseName = item?.name || `Inedible Item ${i + 1}`
    const name = qty !== 1 ? `${baseName} x ${qtyStr}${item?.unit ? ` ${item.unit}` : ''}` : baseName

    return {
      time: times[i] || `${8 + i}:00`,
      name,
      calories: mealCalories
    }
  })

  return {
    duration,
    dailyCalories,
    mealsPerDay,
    sampleMeals
  }
}
