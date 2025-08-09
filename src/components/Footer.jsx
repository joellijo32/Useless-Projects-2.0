import React from 'react'

const Footer = () => {
  return (
    <footer className="glass-card rounded-3xl p-8 text-center">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-white mb-4">InediCalc Pro™</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            The world's most advanced calorie calculator for objects you should never consume. 
            Pioneering the future of useless technology since 2024.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Premium Plans</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
          </ul>
        </div>
        
        {/* Support */}
        <div>
          <h3 className="font-bold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Report a Bug</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Emergency Hotline</a></li>
          </ul>
        </div>
        
        {/* Legal */}
        <div>
          <h3 className="font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Liability Waiver</a></li>
          </ul>
        </div>
      </div>
      
      {/* Social Media */}
      <div className="flex justify-center space-x-6 mb-8">
        <a href="#" className="text-2xl hover:scale-110 transition-transform">📘</a>
        <a href="#" className="text-2xl hover:scale-110 transition-transform">🐦</a>
        <a href="#" className="text-2xl hover:scale-110 transition-transform">📷</a>
        <a href="#" className="text-2xl hover:scale-110 transition-transform">🔗</a>
        <a href="#" className="text-2xl hover:scale-110 transition-transform">📺</a>
      </div>
      
      {/* Newsletter Signup */}
      <div className="mb-8">
        <h3 className="font-bold text-white mb-4">Stay Updated with Useless Innovations</h3>
        <div className="flex max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email for more nonsense"
            className="flex-1 px-4 py-2 rounded-l-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-r-lg transition-all duration-300">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          We promise to send you only the most pointless updates. Unsubscribe anytime you regain sanity.
        </p>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/20 pt-6">
        <p className="text-gray-400 text-sm mb-2">
          © 2024 InediCalc Pro™. All rights reserved. No objects were harmed in the making of this app.
        </p>
        <p className="text-xs text-gray-500">
          Built with React, Vite, Tailwind CSS, excessive JavaScript animations, and questionable life choices.
        </p>
      </div>
      
      {/* Final Disclaimer */}
      <div className="mt-6 p-4 bg-red-900/30 border border-red-400/50 rounded-xl">
        <p className="text-red-200 text-xs leading-relaxed">
          <strong>FINAL WARNING:</strong> This entire application is a work of satire. Do not consume any of the items featured. 
          We are not responsible for any medical emergencies, existential crises, or questions about your life choices that may result from using this app. 
          Please seek professional help if you're actually considering eating office supplies.
        </p>
      </div>
    </footer>
  )
}

export default Footer
