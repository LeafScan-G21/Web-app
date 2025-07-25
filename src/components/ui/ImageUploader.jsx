import React, { useState } from "react";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    // # Testing
    // console.log("Selected image:", file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

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
    }
  };

  return (
    <div>
      <h2>Upload a Plant Leaf Image</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: "200px", height: "auto", border: "1px solid #ccc" }}
          />
        </div>
      )}
      <button onClick={handleUpload}>Upload & Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};
import React from "react";
// # Testing - Comment out for production
// import ImageUploader from "../components/ui/ImageUploader.jsx";  

export default ImageUploader;
