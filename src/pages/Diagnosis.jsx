import React, { useState, useEffect } from "react";
import { Camera, Sparkles, Shield, Zap } from "lucide-react";
import ImageUploader from "../components/ui/ImageUploader";
import { useNavigate } from "react-router-dom";

const Diagnosis = () => {
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUploadedImage) {
        e.preventDefault();
        e.returnValue =
          "If you reload this page, your uploaded image and results will be lost. Are you sure you want to leave?";
        return "If you reload this page, your uploaded image and results will be lost. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUploadedImage]);

  const handleImageUpload = (uploaded) => {
    setHasUploadedImage(uploaded);
  };

  const handlePredictionResult = (predictionData) => {
    sessionStorage.setItem("predictionResult", JSON.stringify(predictionData));

    setTimeout(() => {
      navigate("/prediction", {
        state: { predictionData },
        replace: true,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Camera className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Plant Disease Diagnosis
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get instant, accurate disease detection for your plants using
            advanced artificial intelligence. Simply upload a photo and receive
            detailed analysis with treatment recommendations.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-green-100">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                AI-Powered
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-green-100">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                Instant Results
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md border border-green-100">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                99% Accurate
              </span>
            </div>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="max-w-3xl mx-auto">
          <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12 ">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Capture Image
              </h3>
              <p className="text-gray-600 text-sm">
                Take a clear photo of the affected plant leaf in good lighting
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Upload & Analyze
              </h3>
              <p className="text-gray-600 text-sm">
                Our AI will analyze the image and identify potential diseases
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-green-50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive detailed diagnosis with treatment recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Main Upload Section */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
            {/* Upload Area Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Upload Your Plant Image
              </h2>
              <p className="text-green-100 text-center mt-2">
                For best results, ensure the leaf fills most of the frame and is
                well-lit
              </p>
            </div>

            {/* Upload Component */}
            <div className="p-8">
              <ImageUploader
                onImageUpload={handleImageUpload}
                onPredictionResult={handlePredictionResult}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-xl pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-xl pointer-events-none"></div>
    </div>
  );
};

export default Diagnosis;
