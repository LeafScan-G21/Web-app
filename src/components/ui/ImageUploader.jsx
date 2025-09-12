import React, { useState } from "react";
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle, Loader } from "lucide-react";

const ImageUploader = ({ onImageUpload, onPredictionResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(""); 
      setError(null);
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
      setPrediction(""); 
      setError(null);
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

    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("lat", "6.9271"); // Example latitude
    formData.append("lon", "79.8612"); // Example longitude
    formData.append("consent_location", true);

    const authData = JSON.parse(localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}");
    const token = authData?.access_token || "";

    try {
      const response = await fetch("http://localhost:8000/api/v1/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error(`❌ HTTP ERROR: ${response.status} ${response.statusText}`);
        console.log("error response:", await response.text());
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Upload Response:", data);
      
      // Set local prediction for immediate feedback
      setPrediction(data);
      
      // Pass the full result to parent component to navigate to prediction page
      if (onPredictionResult) {
        onPredictionResult(data);
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      setError(`Failed to process image: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div className="text-red-800">
              <p className="font-medium">Error occurred</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

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
                setError(null);
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

      
    </div>
  );
};

export default ImageUploader;