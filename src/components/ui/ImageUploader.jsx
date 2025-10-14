import React, { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import DiagnosisLoader from "../loaders/DiagnosisLoader";

const ImageUploader = ({ onImageUpload, onPredictionResult }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  // const IMAGE_UPLOAD_SERVICE_URL =
  //   import.meta.env.VITE_IMAGE_UPLOAD_SERVICE_URL || "http://localhost:8002";
 const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/upload/api/v1/upload`;



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

  // Main upload logic, receives location or null
  const handleUpload = async (location) => {
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", selectedImage);
    if (location) {
      formData.append("lat", location.lat);
      formData.append("lon", location.lng);
      formData.append("consent_location", true);
    } else {
      formData.append("consent_location", false);
    }

    const authData = JSON.parse(
      localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
    );
    const token = authData?.access_token || "";

    try {
      console.log(formData);
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        console.error(
          `❌ HTTP ERROR: ${response.status} ${response.statusText}`
        );
        console.log("error response:", await response.text());
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("✅ Upload Response:", data);
      setPrediction(data);
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

  // Called when user clicks Analyze
  const handleAnalyzeClick = () => {
    const saved = localStorage.getItem("location");
    if (!saved) {
      setShowLocationPrompt(true);
    } else {
      handleUpload(JSON.parse(saved));
    }
  };

  // Called if user allows location in modal
  const handleAllowLocation = () => {
    setLocationLoading(true);
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      setShowLocationPrompt(false);
      handleUpload(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        localStorage.setItem("location", JSON.stringify(loc));
        setLocationLoading(false);
        setShowLocationPrompt(false);
        handleUpload(loc);
      },
      (err) => {
        setError("Location permission denied or unavailable.");
        setLocationLoading(false);
        setShowLocationPrompt(false);
        handleUpload(null);
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
    );
  };

  if (isLoading && !prediction) {
    return <DiagnosisLoader />;
  }

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
            <p className="text-green-600 font-medium">
              Image uploaded successfully!
            </p>
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
          onClick={handleAnalyzeClick}
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

      {/* Location Permission Modal */}
      {showLocationPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-green-700 text-xl font-bold"
              onClick={() => setShowLocationPrompt(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-green-700 mb-2 text-center">
              Allow Location Access?
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              Allowing location helps us provide more accurate disease
              predictions based on your region and local conditions. Your
              location is only used for this analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={handleAllowLocation}
                disabled={locationLoading}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-semibold shadow hover:from-green-700 hover:to-emerald-600 transition-all disabled:opacity-60"
              >
                {locationLoading ? "Getting Location..." : "Allow Location"}
              </button>
              <button
                onClick={() => {
                  setShowLocationPrompt(false);
                  handleUpload(null);
                }}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition-all"
              >
                Continue Without Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
