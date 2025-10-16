import React, { useState, useEffect } from 'react'
import { 
  Sparkles, Camera, Shield, Users, TrendingUp, ArrowRight, Play, CheckCircle2, 
  Cloud, Brain, Zap, Heart, MessageCircle, ChevronRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlantCard from '../components/ui/PlantCard';
import Footer from '../components/ui/Footer';
import home_1 from '../assets/home_1.jfif';
import emma from '../assets/emma.jfif';
import michael from '../assets/michael.jfif';
import sarah from '../assets/sarah.jfif';

const Home = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleGetStarted = () => {
    navigate('/diagnosis');
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced deep learning models analyze plant diseases with 95%+ accuracy in seconds',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate diagnosis and treatment recommendations for your plants',
      gradient: 'from-green-400 to-emerald-500',
    },
    {
      icon: Cloud,
      title: 'Weather Intelligence',
      description: 'Personalized care advice based on your local weather conditions',
      gradient: 'from-teal-400 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Connect with agricultural experts and fellow plant enthusiasts worldwide',
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

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

  const testimonials = [
    {
      text: 'LeafScan saved my entire tomato harvest. The AI detected early blight before I could even see it!',
      author: 'Sarah Johnson',
      role: 'Home Gardener',
      image:  sarah,
    },
    {
      text: 'As a commercial farmer, LeafScan has increased my yield by 30%. The weather recommendations are spot-on.',
      author: 'Michael Chen',
      role: 'Commercial Farmer',
      image: michael,
    },
    {
      text: 'The community feature is amazing. I got expert advice within minutes when my plants were struggling.',
      author: 'Emma Rodriguez',
      role: 'Urban Farmer',
      image: emma,
    },
  ];

  const stats = [
    { value: '156+', label: 'Plants Diagnosed' },
    { value: '89%', label: 'Accuracy Rate' },
    { value: '10K+', label: 'Active Users' },
    { value: '38+', label: 'Plant Species' },
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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-green-200 shadow-sm mb-8 animate-fade-in-down">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-800">AI-Powered Plant Health Platform</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up">
              <span className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                Detect Plant Diseases
              </span>
              <br />
              <span className="text-gray-800">Instantly with AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
              Upload a photo and get instant, accurate diagnosis powered by advanced AI.
              Save your crops with personalized treatment recommendations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
              <button 
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Camera className="w-6 h-6" />
                <span>Upload Image</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 bg-white text-gray-700 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 border-gray-200">
                <Play className="w-6 h-6 text-green-700" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm animate-fade-in-up animation-delay-600">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-20 animate-fade-in-up animation-delay-800">
            {/* gradient overlay behind floating cards */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0 pointer-events-none" />
            <img
              src={home_1}
              alt="Plant analysis"
              className="w-full max-w-5xl mx-auto rounded-3xl shadow-2xl border-8 border-white"
            />
            <div className="absolute top-10 left-10 bg-white rounded-2xl shadow-xl p-4 animate-float z-20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-bold text-gray-800">Disease Detected</div>
                  <div className="text-sm text-gray-600">Early Blight - 94% confidence</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 right-10 bg-white rounded-2xl shadow-xl p-4 animate-float animation-delay-1000 z-20">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-bold text-gray-800">Treatment Ready</div>
                  <div className="text-sm text-gray-600">3 solutions available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Powered by Advanced <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AI Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge machine learning models provide instant, accurate diagnosis for your plants
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-br from-green-100 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              How It <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to healthier plants
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { step: '01', title: 'Capture', description: 'Take a photo of your plant leaf showing signs of disease', icon: Camera },
              { step: '02', title: 'Analyze', description: 'Our AI analyzes the image using deep learning models', icon: Brain },
              { step: '03', title: 'Treat', description: 'Get instant diagnosis with personalized treatment plans', icon: Sparkles },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="text-6xl font-bold text-blue-200 mb-4">{item.step}</div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-800 to-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-green-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Supports 38+ Plant Species</h3>
            
            {/* Image Runner - Horizontal Scrolling Carousel */}
            <div className="relative w-full overflow-hidden bg-gradient-to-r from-emerald-50 via-transparent to-emerald-50 rounded-2xl p-6">
              <div className="scrolling-container">
                <div className="scrolling-track">
                  {/* First set of plants */}
                  {plants.map((plant, index) => (
                    <div
                      key={`first-${index}`}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-40 h-48"
                    >
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                        <span className="text-white font-bold text-sm">{plant.name}</span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Duplicate set for seamless loop */}
                  {plants.map((plant, index) => (
                    <div
                      key={`second-${index}`}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-40 h-48"
                    >
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                        <span className="text-white font-bold text-sm">{plant.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gradient overlays for smooth fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white to-transparent z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Community/Testimonials Section */}
      <section id="community" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Loved by <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Farmers</span> Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of plant enthusiasts who trust LeafScan
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-xl">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 p-12'
                  }`}
                >
                  <MessageCircle className="w-12 h-12 text-green-600 mb-6" />
                  <p className="text-2xl text-gray-700 mb-8 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <div className="font-bold text-gray-800 text-lg">{testimonial.author}</div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-green-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Shield className="w-20 h-20 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Start Protecting Your Plants Today
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Join 10,000+ farmers and gardeners using AI to keep their plants healthy.
            100% free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleGetStarted}
              className="group px-10 py-5 bg-white text-green-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Camera className="w-6 h-6" />
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-transparent text-white rounded-2xl font-bold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-12 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Always Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home