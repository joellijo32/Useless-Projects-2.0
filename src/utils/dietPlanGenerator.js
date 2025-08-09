export const generateDietPlan = (item, calories) => {
  const weeklyPlan = [
    { 
      day: "Monday", 
      meal: `Breakfast: Grilled ${item.name} with organic free-range morning dew`,
      time: "7:00 AM",
      prepTime: "45 min",
      difficulty: "Expert"
    },
    { 
      day: "Tuesday", 
      meal: `Lunch: ${item.name} Caesar salad with industrial-grade croutons`,
      time: "12:30 PM",
      prepTime: "30 min",
      difficulty: "Intermediate"
    },
    { 
      day: "Wednesday", 
      meal: `Dinner: Pan-seared ${item.name} with a reduction of synthetic compounds`,
      time: "7:00 PM",
      prepTime: "2 hours",
      difficulty: "Master Chef"
    },
    { 
      day: "Thursday", 
      meal: `Snack: ${item.name} smoothie bowl topped with metal shavings`,
      time: "3:00 PM",
      prepTime: "15 min",
      difficulty: "Beginner"
    },
    { 
      day: "Friday", 
      meal: `Breakfast: ${item.name} pancakes with maple-flavored plastic syrup`,
      time: "8:00 AM",
      prepTime: "25 min",
      difficulty: "Intermediate"
    },
    { 
      day: "Saturday", 
      meal: `Lunch: Deconstructed ${item.name} soup with molecular gastronomy foam`,
      time: "1:00 PM",
      prepTime: "3 hours",
      difficulty: "Molecular"
    },
    { 
      day: "Sunday", 
      meal: `Dinner: Slow-roasted ${item.name} with seasonal vegetables and regret`,
      time: "6:30 PM",
      prepTime: "4 hours",
      difficulty: "Life-changing"
    }
  ]

  const benefits = [
    "100% recyclable materials provide sustainable nutrition",
    "Rich in synthetic polymers for enhanced plastic absorption",
    "Excellent source of industrial minerals and heavy metals",
    "Zero organic compounds - perfect for the anti-natural lifestyle",
    "Environmentally sustainable (when not consumed)",
    "Long shelf life measured in geological time scales",
    "Gluten-free, vegan-friendly, and carbon-neutral",
    "No artificial preservatives needed - already artificial",
    "Supports the circular economy through internal recycling",
    "Provides essential non-nutrients your body doesn't need"
  ]

  const sideEffects = [
    "Severe digestive system malfunction and confusion",
    "Potential heavy metal poisoning and toxicity",
    "Dental damage requiring expensive reconstruction",
    "Multiple emergency room visits and medical bills",
    "Confused medical professionals questioning your choices",
    "Existential crisis about life priorities and decisions",
    "Possible legal complications and court appearances",
    "Social media mockery and viral TikTok videos",
    "Insurance claims rejection and financial ruin",
    "Permanent regret and therapy recommendations",
    "Family interventions and concerned friend meetings",
    "Potential appearance on reality TV shows about poor decisions"
  ]

  const testimonials = [
    {
      quote: "This diet plan completely revolutionized my understanding of what not to eat. Highly recommend!",
      author: "Dr. Sarah Johnson",
      title: "Fictional Nutritionist"
    },
    {
      quote: "I've never felt more confused about nutrition. This app exceeded my expectations for uselessness.",
      author: "Mike Peterson",
      title: "Professional Procrastinator"
    },
    {
      quote: "Finally, a diet plan that makes absolutely no sense. Perfect for my lifestyle!",
      author: "Jennifer Lee",
      title: "Certified Life Coach"
    },
    {
      quote: "The scientific accuracy is questionable, but the entertainment value is off the charts.",
      author: "Dr. Robert Williams",
      title: "Professor of Common Sense"
    }
  ]

  const shoppingList = [
    {
      category: "Hardware Store",
      items: [`Premium ${item.name}`, "Industrial lubricant", "Safety goggles", "First aid kit"]
    },
    {
      category: "Electronics Store", 
      items: ["Backup electronics", "Warranty extensions", "Technical manuals", "Customer service numbers"]
    },
    {
      category: "Medical Supplies",
      items: ["Poison control hotline", "Emergency contacts", "Health insurance cards", "Legal representation"]
    }
  ]

  return {
    weeklyPlan,
    benefits,
    sideEffects,
    testimonials,
    shoppingList
  }
}
