import React, {useState} from 'react'
import { Check, Play, Camera, Users, BookOpen, Sprout, ChevronRight, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'lucide-react';
import diagnosis from "../assets/hero-app.png";
import PlantCard from '../components/ui/PlantCard';
import Footer from '../components/ui/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/diagnosis');
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const plants = [
    {
      name: 'Apple',
      image: 'https://images.unsplash.com/photo-1505611202014-8c9470f8d068?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Bean',
      image: 'https://plus.unsplash.com/premium_photo-1661904096621-94b9b9222182?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Cherry',
      image: 'https://plus.unsplash.com/premium_photo-1700089302927-4213458cde94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Chilli',
      image: 'https://images.unsplash.com/photo-1754994641903-38360759005e?q=80&w=699&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Grape',
      image: 'https://plus.unsplash.com/premium_photo-1675727579600-b2656a265c15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available' 
    },
    {
      name: 'Peach',
      image: 'https://images.unsplash.com/photo-1438274754346-45322cac87e4?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Bell Pepper',
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&h=400&fit=crop',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Strawberry',
      image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Tea',
      image: 'https://images.unsplash.com/photo-1602943543714-cf535b048440?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Tomato',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=400&fit=crop',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Potato',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=400&fit=crop',
      description: 'AI-powered diagnosis available'
    },
    {
      name: 'Corn',
      image: 'https://www.ugaoo.com/cdn/shop/articles/9f9b3771a2.jpg?v=1727692315&width=1780',
      description: 'AI-powered diagnosis available'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % plants.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + plants.length) % plants.length);
  };

  const getVisiblePlants = () => {
    const visible = [];
    for (let i = 0; i < 4; i++) {
      visible.push(plants[(currentIndex + i) % plants.length]);
    }
    return visible;
  };

  return (
    <div className="container mx-auto px-10 overflow-y-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-green-700 via-green-700 to-green-700 bg-clip-text text-transparent">
                  #1 FREE
                </span>
                <span className="text-green-600 ml-3">App</span>
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
              <button 
                onClick={handleGetStarted}
                className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
              >
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

        <div className="bg-green-50 min-h-screen">
      {/* Hero Section */}
          <section className="text-center py-16 px-6">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
              Boost your crop production
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps you identify, treat, and prevent plant diseases
              with the support of a thriving community.
            </p>
          </section>

          {/* Features Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mb-16">
            {/* Diagnose */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Camera className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Diagnose your sick crop</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Take a photo of your sick crop and get a free diagnosis and treatment
                suggestions — all in a few seconds!
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Get a free diagnosis
              </button>
            </div>

            {/* Community */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Get expert advice</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Have a question? Our community of agri-experts will help you. Learn
                about crop cultivation and help fellow farmers.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Join community
              </button>
            </div>

            {/* Library */}
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Sprout className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Maximize crop yields</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Our library covers specific crop diseases and prevention methods to
                ensure a successful harvest.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Explore library
              </button>
            </div>
          </section>

          {/* Plant Disease Detection Section */}
          <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div>
                <img
                  src={diagnosis}
                  alt="Plant diagnosis"
                  className="rounded-xl shadow-md"
                />
              </div>

              {/* Text */}
              <div>
                <h2 className="text-3xl font-bold text-green-700 mb-4">
                  Plant disease detection made simple
                </h2>
                <p className="text-gray-600 mb-6">
                  Our advanced CNN model analyzes your plant photos and provides
                  accurate disease identification with personalized care
                  recommendations.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Instant AI-powered analysis
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    95%+ accuracy rate
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Trusted by thousands of farmers
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-green-50 py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-5xl font-bold mb-4 text-green-700">Plants We Diagnose
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Our AI can diagnose diseases across multiple plant species with high accuracy
                  </p>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-center gap-6">
                    <button
                      onClick={prevSlide}
                      className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors z-10"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <div className="flex gap-6 overflow-hidden">
                      {getVisiblePlants().map((plant, index) => (
                        <PlantCard key={index} plant={plant} index={index} />
                      ))}
                    </div>
                    <button
                      onClick={nextSlide}
                      className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors z-10"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <a
                    href="/diseases"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors"
                  >
                    View All Diseases
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="text-center py-16 px-6 bg-white rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to save your crops?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of farmers and plant enthusiasts who trust LeafScan
              for accurate plant disease detection and treatment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2" onClick={handleGetStarted}>
                Start Free Diagnosis <ChevronRight className="w-4 h-4" />
              </button>
              <button className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition">
                Sign In
              </button>
            </div>
          </section>
          <section>
            <Footer />
          </section>
        </div>
      </div>
  )
}

export default Home