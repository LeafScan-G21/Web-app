import React from 'react'
import { Check, Play } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-10 py-30 overflow-y-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-700 via-green-700 to-green-700 bg-clip-text text-transparent">
                  #1 FREE
                </span>
                <span className="text-gray-300 ml-3 text-green-600">App</span>
                <br />
                <span className="text-gray-800">for Plant Disease</span>
                <br />
                <span className="text-gray-800">Detection</span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Take a photo of your diseased plant and get instant AI-powered 
                diagnosis with treatment recommendations. Join our community of plant 
                enthusiasts and agricultural experts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
                <span>Get Started Free</span>
                <span className="text-xl">→</span>
              </button>
              
              <button className="border-2 border-green-500 text-green-500 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 font-medium">100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 font-medium">Instant Results</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 font-medium">Expert Community</span>
              </div>
            </div>
          </div>

          {/* Right side Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Green leaves with water droplets" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-transparent"></div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-200 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
  )
}

export default Home