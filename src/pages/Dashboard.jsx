import React from 'react';
import { Camera, Users, BookOpen, Sprout, MapPin, Thermometer, Cloud, Droplets, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-600 mb-2">
              Welcome to LeafScan
            </h1>
          </div>
          <div className="text-right text-gray-600 font-medium bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm">
            <User className="w-6 h-6 inline-block mr-2" />
            John Doe
          </div>
        </div>

        {/* Current Location & Weather */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Current Location & Weather
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-semibold text-gray-800">Moratuwa, Sri Lanka</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-gray-500 text-sm">Temperature</p>
                <p className="font-semibold text-gray-800">30°C</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-gray-500 text-sm">Condition</p>
                <p className="font-semibold text-gray-800">Partly Cloudy</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-cyan-500" />
              <div>
                <p className="text-gray-500 text-sm">Humidity</p>
                <p className="font-semibold text-gray-800">85%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
          <div className="bg-white rounded-lg shadow-sm px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">156</div>
            <div className="text-gray-600">Plants Diagnosed</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm text-center px-4 py-5 rounded-lg shadow-md border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2.3k</div>
            <div className="text-gray-600">Community Members</div>
          </div>
        </div>

        {/* Explore Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Explore Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Plant Diagnosis */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/diagnosis">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Plant Diagnosis
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Upload photos for AI-powered disease detection
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Get Started
              </button>
              </Link>
            </div>

            {/* LeafScan Community */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <Link to="/forum">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                LeafScan Community
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Connect with experts and fellow gardeners
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Get Started
              </button>
              </Link>
            </div>

            {/* Disease Information */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Disease Information
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Comprehensive plant disease database
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Get Started
              </button>
            </div>

            {/* Cultivation Tips */}
            <div className="bg-white px-4 py-5 rounded-lg shadow-md border border-green-100 text-center">
              
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Cultivation Tips
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Expert advice for healthy plant growth
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}