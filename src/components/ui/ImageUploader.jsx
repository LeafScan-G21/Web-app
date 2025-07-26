import React, { useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader } from "lucide-react";

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(""); // Reset previous prediction
      // # Testing
      // console.log("Selected image:", file);
      
      // Notify parent component that an image has been uploaded
      if (onImageUpload) {
        onImageUpload(true);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(""); // Reset previous prediction
      
      // Notify parent component that an image has been uploaded
      if (onImageUpload) {
        onImageUpload(true);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    console.log("=" .repeat(60)); //Test the Preprocess of the Image
    console.log("🚀 FRONTEND: Starting image upload process"); //Test the Preprocess of the Image
    console.log("=" .repeat(60)); //Test the Preprocess of the Image
    console.log("📁 SELECTED FILE DETAILS:"); //Test the Preprocess of the Image
    console.log(`   • Name: ${selectedImage.name}`); //Test the Preprocess of the Image
    console.log(`   • Size: ${(selectedImage.size / 1024).toFixed(2)} KB`); //Test the Preprocess of the Image
    console.log(`   • Type: ${selectedImage.type}`); //Test the Preprocess of the Image
    console.log(`   • Last Modified: ${new Date(selectedImage.lastModified).toLocaleString()}`); //Test the Preprocess of the Image;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    
    console.log("📦 FormData prepared for upload"); //Test the Preprocess of the Image
    console.log("🌐 Sending request to: http://localhost:8001/predict"); //Test the Preprocess of the Image

    // Production code - actual backend call
    try {
      console.log("⏳ Making API request..."); //Test the Preprocess of the Image
      const startTime = performance.now(); //Test the Preprocess of the Image
      
      const response = await fetch("http://localhost:8001/predict", {
        method: "POST",
        body: formData,
      });

      const endTime = performance.now(); //Test the Preprocess of the Image
      const requestTime = (endTime - startTime).toFixed(2); //Test the Preprocess of the Image
      
      console.log(`✅ API RESPONSE RECEIVED (${requestTime}ms):`); //Test the Preprocess of the Image
      console.log(`   • Status: ${response.status} ${response.statusText}`); //Test the Preprocess of the Image
      console.log(`   • Headers:`, Object.fromEntries(response.headers.entries())); //Test the Preprocess of the Image

      if (!response.ok) {
        console.error(`❌ HTTP ERROR: ${response.status} ${response.statusText}`); //Test the Preprocess of the Image
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("📋 RESPONSE DATA RECEIVED:"); //Test the Preprocess of the Image
      console.log("   • Raw response:", data); //Test the Preprocess of the Image
      
      if (data.processing_info) {
        console.log("🔍 DETAILED PROCESSING INFO:"); //Test the Preprocess of the Image
        console.log(`   • Original filename: ${data.processing_info.original_filename}`); //Test the Preprocess of the Image
        console.log(`   • Original size: ${(data.processing_info.original_size_bytes / 1024).toFixed(2)} KB`); //Test the Preprocess of the Image
        console.log(`   • Processed shape: ${data.processing_info.processed_shape}`); //Test the Preprocess of the Image
        console.log(`   • Pixel statistics:`, data.processing_info.pixel_stats); //Test the Preprocess of the Image
        console.log(`   • Ready for CNN: ${data.processing_info.ready_for_cnn}`); //Test the Preprocess of the Image
      }
      
      console.log("🎯 PREDICTION RESULTS:"); //Test the Preprocess of the Image
      console.log(`   • Prediction: ${data.prediction}`); //Test the Preprocess of the Image
      console.log(`   • Confidence: ${(data.confidence * 100).toFixed(1)}%`); //Test the Preprocess of the Image
      console.log(`   • Disease detected: ${data.disease_detected}`); //Test the Preprocess of the Image
      
      setPrediction(data);
      
      console.log("✅ FRONTEND: Upload and processing completed successfully!"); //Test the Preprocess of the Image
      console.log("=" .repeat(60)); //Test the Preprocess of the Image
      
    } catch (error) {
      console.error("=" .repeat(60)); //Test the Preprocess of the Image
      console.error("❌ FRONTEND ERROR OCCURRED:"); //Test the Preprocess of the Image
      console.error(`   • Error type: ${error.name}`); //Test the Preprocess of the Image
      console.error(`   • Error message: ${error.message}`); //Test the Preprocess of the Image
      console.error(`   • Stack trace:`, error.stack); //Test the Preprocess of the Image
      console.error("=" .repeat(60)); //Test the Preprocess of the Image
      
      alert(`Failed to process image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? "border-green-400 bg-green-50"
            : previewUrl
            ? "border-green-300 bg-green-50/50"
            : "border-gray-300 hover:border-green-400 hover:bg-green-50/30"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
        />
        
        {!previewUrl ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop your image here, or{" "}
                <span className="text-green-600 hover:text-green-700 cursor-pointer underline">
                  browse
                </span>
              </h3>
              <p className="text-gray-500 text-sm">
                Supports: JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-full max-h-64 rounded-lg shadow-lg object-cover"
              />
              <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-green-600 font-medium">Image uploaded successfully!</p>
            <button
              onClick={() => {
                setPreviewUrl(null);
                setSelectedImage(null);
                setPrediction("");
                // Notify parent component that image has been removed
                if (onImageUpload) {
                  onImageUpload(false);
                }
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Upload different image
            </button>
          </div>
        )}
      </div>

      {/* Action Button */}
      {selectedImage && (
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          } text-white`}
        >
          {isLoading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5" />
              <span>Analyze Plant Disease</span>
            </>
          )}
        </button>
      )}

      {/* Results Section */}
      {prediction && (
        <div className="space-y-4">
          {/* Main Prediction Result */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Diagnosis Result
                </h3>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <p className="text-gray-800 font-medium text-lg">{prediction.prediction || prediction}</p>
                  {typeof prediction === 'object' && prediction.confidence && (
                    <p className="text-green-600 font-medium mt-2">
                      Confidence: {(prediction.confidence * 100).toFixed(1)}%
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  💡 For detailed treatment recommendations, consider consulting with our expert community in the forum.
                </p>
              </div>
            </div>
          </div>

          {/* Debug Information (Only shown when prediction object has processing_info) */}
          {typeof prediction === 'object' && prediction.processing_info && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="text-md font-semibold text-blue-900 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Debug Information (Processing Details)
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <h5 className="font-medium text-gray-800 mb-2">File Information</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Filename: {prediction.processing_info.original_filename}</li>
                    <li>• Size: {(prediction.processing_info.original_size_bytes / 1024).toFixed(2)} KB</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-3 border border-blue-100">
                  <h5 className="font-medium text-gray-800 mb-2">Preprocessing</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Shape: {prediction.processing_info.processed_shape?.join(' × ')}</li>
                    <li>• Ready for CNN: {prediction.processing_info.ready_for_cnn ? '✅' : '❌'}</li>
                  </ul>
                </div>
                
                {prediction.processing_info.pixel_stats && (
                  <div className="bg-white rounded-lg p-3 border border-blue-100 md:col-span-2">
                    <h5 className="font-medium text-gray-800 mb-2">Pixel Statistics</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-gray-600">
                      <div>Min: {prediction.processing_info.pixel_stats.min?.toFixed(4)}</div>
                      <div>Max: {prediction.processing_info.pixel_stats.max?.toFixed(4)}</div>
                      <div>Mean: {prediction.processing_info.pixel_stats.mean?.toFixed(4)}</div>
                      <div>Std: {prediction.processing_info.pixel_stats.std?.toFixed(4)}</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> This debug information shows the image preprocessing details. 
                  The image has been resized to 224×224 pixels, normalized to 0-1 range, and is ready for CNN model input.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
