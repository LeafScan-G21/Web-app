import React, { useState, useMemo, useEffect } from 'react';
import { Search, Leaf, ChevronRight, X, Eye, AlertTriangle, Stethoscope, Info, Zap, Droplets, Wind } from 'lucide-react';

const DiseaseData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('all');
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseaseData, setDiseaseData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const PREDICTION_URL = `${import.meta.env.VITE_BACKEND_URL}/prediction`;

  // Fetch diseases from backend
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${PREDICTION_URL}/api/v1/diseases?limit=20&skip=0&include_count=true`);
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setDiseaseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  // Fetch detailed disease data
  const fetchDiseaseDetail = async (diseaseId) => {
    try {
      setDetailLoading(true);
      setDetailError(null);
      const res = await fetch(`${PREDICTION_URL}/api/v1/diseases/${diseaseId}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setSelectedDisease(data);
    } catch (err) {
      setDetailError(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  const uniquePlants = useMemo(() => {
    const plants = diseaseData.items.map(item => item.plant_name);
    return [...new Set(plants)].sort();
  }, [diseaseData]);

  const filteredDiseases = useMemo(() => {
    return diseaseData.items.filter(disease => {
      const matchesSearch =
        disease.disease_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.plant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlant = selectedPlant === 'all' || disease.plant_name === selectedPlant;

      return matchesSearch && matchesPlant;
    });
  }, [searchTerm, selectedPlant, diseaseData]);

  const truncateText = (text, maxLength = 150) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substr(0, maxLength) + '...';
  };

  const formatTextWithBullets = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => {
      if (line.trim() === '') return null;

      if (line.trim().endsWith(':') && !line.includes('.')) {
        return (
          <div key={index} className="font-semibold text-gray-800 mt-4 mb-2 text-lg">
            {line.trim()}
          </div>
        );
      }

      return (
        <div key={index} className="text-gray-700 mb-2 ml-4 leading-relaxed">
          {line.trim().startsWith('-') || line.trim().startsWith('•')
            ? <span className="flex items-start"><span className="text-green-600 mr-2 mt-1">•</span><span>{line.replace(/^[-•]\s*/, '')}</span></span>
            : <span>{line.trim()}</span>}
        </div>
      );
    }).filter(Boolean);
  };

  const handleDiseaseClick = (disease) => {
    fetchDiseaseDetail(disease.disease_id);
  };

  // Show loading / error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading diseases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Failed to load data: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Disease detail view
  if (selectedDisease) {
    if (detailLoading) {
      return (
        <div className="min-h-screen">
          <div className="bg-white shadow-sm border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <h1 className="text-xl font-bold text-gray-900">Plant Disease Database</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading disease details...</p>
            </div>
          </div>
        </div>
      );
    }

    if (detailError) {
      return (
        <div className="min-h-screen">
          <div className="bg-white shadow-sm border-b border-green-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <h1 className="text-xl font-bold text-gray-900">Plant Disease Database</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg mx-4">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">Failed to load disease details: {detailError}</p>
              <button 
                onClick={() => fetchDiseaseDetail(selectedDisease.disease_id || 'D002')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 mr-2"
              >
                Try Again
              </button>
              <button 
                onClick={() => setSelectedDisease(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedDisease(null)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Leaf className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">Plant Disease Database</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Disease Detail Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Disease Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
              <div className="flex items-start justify-between text-white">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{selectedDisease.disease_name}</h1>
                  <p className="text-green-100 text-lg">Affects: {selectedDisease.plant_name}</p>
                  <p className="text-green-100 text-sm mt-1">Disease ID: {selectedDisease.disease_id}</p>
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <span className="text-white font-medium">{selectedDisease.plant_name}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed">{selectedDisease.description}</p>
            </div>
          </div>

          {/* Image Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-green-100 px-6 py-4 border-b">
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Healthy Leaf</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="aspect-w-16 aspect-h-12 mb-4">
                  <img
                    src={selectedDisease.healthy_img}
                    alt="Healthy leaf"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-600 text-center">Normal, healthy appearance</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-red-100 px-6 py-4 border-b">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Diseased Leaf</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="aspect-w-16 aspect-h-12 mb-4">
                  <img
                    src={selectedDisease.diseased_img}
                    alt="Diseased leaf"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <p className="text-gray-600 text-center">Showing symptoms of {selectedDisease.disease_name}</p>
              </div>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Symptoms */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-5 w-5 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Symptoms</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  {formatTextWithBullets(selectedDisease.symptoms)}
                </div>
              </div>
            </div>

            {/* Causes */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-orange-50 px-6 py-4 border-b border-orange-100">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Causes</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  {formatTextWithBullets(selectedDisease.causes)}
                </div>
              </div>
            </div>

            {/* Spread Mechanisms */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
                <div className="flex items-center space-x-2">
                  <Wind className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Spread Mechanisms</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  {formatTextWithBullets(selectedDisease.spread_mechanisms)}
                </div>
              </div>
            </div>

            {/* Care Advice */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Care Advice</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-700 leading-relaxed">
                  {formatTextWithBullets(selectedDisease.care_advices)}
                </div>
              </div>
            </div>
          </div>

          {/* Back to List Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setSelectedDisease(null)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Back to Disease List
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Plant Disease Database</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive database of plant diseases. Learn about symptoms,
              causes, and treatment options for various crop diseases.
            </p>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search diseases or plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Plant filter */}
            <div className="md:w-64">
              <select
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              >
                <option value="all">All Plants</option>
                {uniquePlants.map(plant => (
                  <option key={plant} value={plant}>{plant}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
              <span className="font-medium">{filteredDiseases.length}</span>
              <span className="ml-1">results</span>
            </div>
          </div>
        </div>

        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDiseases.map((disease) => (
            <div
              key={disease._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleDiseaseClick(disease)}
            >
              <div className="relative h-48">
                <img
                  src={disease.diseased_img}
                  alt={disease.disease_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {disease.plant_name}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{disease.disease_name}</h3>
                <p className="text-green-600 font-medium mb-3">Affects: {disease.plant_name}</p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {truncateText(disease.description)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">ID: {disease.disease_id}</div>
                  <button className="flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                    Learn more
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDiseases.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No diseases found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseData;
