import React from 'react'

const Header = () => {
  return (
    <div className="glass-card animate-float">
      <div>
        <h1>
          🖊️ InediCalc Pro™ 📱
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          The World's First Professional Calorie Calculator for Inedible Objects
        </p>
        <p className="text-sm text-gray-400 italic">
          "Finally! Nutritional information for things you should NEVER consume!"
        </p>
      </div>
      
      <div className="badges-container">
        <span className="badge badge-green">
          ⭐ 4.9/5 Stars
        </span>
        <span className="badge badge-blue">
          🏆 Award Winning
        </span>
        <span className="badge badge-purple">
          🔥 Trending #1
        </span>
      </div>
      
      <div className="alert alert-danger">
        <p>
          ⚠️ <strong>EXTREMELY IMPORTANT DISCLAIMER:</strong> This application is 100% satirical entertainment. 
          Please DO NOT actually consume any of these items. They are completely inedible and potentially dangerous. 
          Consult a real nutritionist for actual dietary advice. We are not responsible for any poor life choices.
        </p>
      </div>
      
      <div className="footer-text">
        <p>Powered by Advanced Nonsense Technology™ | ISO 9001 Certified Absurdity</p>
      </div>
    </div>
  )
}

export default Header
