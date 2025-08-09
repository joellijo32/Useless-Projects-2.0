import React from 'react'

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      title: "Life-changing app!",
      text: "Finally found out how many calories are in my stapler! This app solved a problem I never knew I had. 10/10 would recommend to anyone with questionable life priorities.",
      verified: true,
      helpful: 847
    },
    {
      id: 2,
      name: "Dr. Mike P.",
      rating: 5,
      title: "Revolutionary technology",
      text: "As a professional who definitely exists, I can confirm this app uses cutting-edge algorithms to calculate the nutritional value of completely inedible objects. Breakthrough science!",
      verified: true,
      helpful: 623
    },
    {
      id: 3,
      name: "Jessica L.",
      rating: 4,
      title: "Great but needs more items",
      text: "Love the app but wish it had more office supplies. Where's the calculator for staplers? Also would love to see furniture nutrition facts. My couch looks delicious.",
      verified: false,
      helpful: 392
    },
    {
      id: 4,
      name: "Anonymous User",
      rating: 5,
      title: "Finally! Someone gets it!",
      text: "I've been wondering about the caloric content of my phone for YEARS. This app saved my marriage, cured my depression, and taught me quantum physics. Also my pen tastes better now.",
      verified: true,
      helpful: 1205
    }
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-400"}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="glass-card rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        What Our Users Say 💬
      </h2>
      <p className="text-gray-400 text-center mb-8">
        Join thousands of satisfied customers who've revolutionized their understanding of inedible nutrition
      </p>
      
      {/* Overall Rating */}
      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">4.9</div>
          <div className="flex text-2xl mb-2">{renderStars(5)}</div>
          <div className="text-gray-400">Based on 15,847 reviews</div>
        </div>
      </div>
      
      {/* Individual Reviews */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-white">{review.name}</span>
                  {review.verified && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">✓ Verified</span>
                  )}
                </div>
                <div className="flex text-sm">{renderStars(review.rating)}</div>
              </div>
            </div>
            
            <h4 className="font-bold text-white mb-2">{review.title}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">{review.text}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{review.helpful} people found this helpful</span>
              <div className="flex space-x-2">
                <button className="hover:text-white transition-colors">👍 Helpful</button>
                <button className="hover:text-white transition-colors">👎 Not helpful</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 hover:scale-105">
          Write a Review ✍️
        </button>
      </div>
      
      {/* Fake Certifications */}
      <div className="mt-8 flex justify-center items-center space-x-6 text-sm text-gray-400">
        <span className="flex items-center space-x-1">
          <span>🏆</span>
          <span>App of the Year 2024</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>🛡️</span>
          <span>FDA Approved*</span>
        </span>
        <span className="flex items-center space-x-1">
          <span>⭐</span>
          <span>Editor's Choice</span>
        </span>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        *Not actually FDA approved. They won't return our calls.
      </p>
    </div>
  )
}

export default Reviews
