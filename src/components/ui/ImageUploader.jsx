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

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    
    // # Testing
    // console.log("Uploading image:", selectedImage);

    // # Testing - Comment out for production
    // alert("Image is ready to be uploaded!");

    // Production code - actual backend call
    try {
      const response = await fetch("http://localhost:8001/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to process image. Please try again.");
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
                <p className="text-gray-800 font-medium text-lg">{prediction}</p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                💡 For detailed treatment recommendations, consider consulting with our expert community in the forum.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
