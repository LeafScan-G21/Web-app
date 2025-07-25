import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage); // Changed from "image" to "file" to match FastAPI

    try {
      const response = await fetch("http://localhost:8001/predict", { // Changed to port 8001 and /predict endpoint
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction); // This will show the predicted disease/health status
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to process image. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload a Plant Leaf Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default ImageUploader;
