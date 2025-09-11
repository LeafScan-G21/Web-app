import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, X, Plus, Lightbulb } from "lucide-react";
import { createPost, uploadpostImages } from "../../services/forum/post";
import toast from "react-hot-toast";

const AddPost = () => {
  const navigate = useNavigate();
  const supabaseAuth = JSON.parse(localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}");
  const [form, setForm] = useState({
    title: "",
    content: "",
    plant_name: "General",
    tags: [],
    image_urls: [],
    author_id: supabaseAuth?.user?.id || ""
  });

  const [images, setImages] = useState([]);

  const [currentTag, setCurrentTag] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (
      currentTag.trim() &&
      !form.tags.includes(currentTag.trim().toLowerCase())
    ) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim().toLowerCase()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      setImages((prev) => [...prev, ...files].slice(0, 5));
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    if (validImages.length > 0) {
      setImages((prev) => [...prev, ...validImages].slice(0, 5));
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setIsSubmitting(true);
      let updatedForm = { ...form };
      if (images && images.length > 0) {
        const uploadResponse = await uploadpostImages(images);
        console.log("Image upload response:", uploadResponse.data);
        if (uploadResponse.errors) {
          console.error("Image upload errors:", uploadResponse.errors);
          toast.error("Failed to upload images");
          setIsSubmitting(false);
          return;
        }
        updatedForm = { ...form, image_urls: uploadResponse.data };
      }
      const saveResponse = await createPost(updatedForm);
      if (saveResponse.data) {
        toast.success("Post created successfully!");
        navigate("/forum");
      }
      if (saveResponse.errors) {
        console.error("Error creating post:", saveResponse.errors);
        toast.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("An error occurred while creating the post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/forum")}
                className="inline-flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-green-300/20 rounded-xl transition-all duration-200 group"
              >
                <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Create New Post
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Share your plant knowledge with the community
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
          {/* Post Details */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">1</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Post Details
              </h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-4 py-3 sm:py-4 border border-gray-200 rounded-xl text-base sm:text-lg font-medium text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="What's your plant question or experience?"
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="plant_name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Plant Name
                </label>
                <input
                  id="plant_name"
                  value={form.plant_name}
                  onChange={(e) =>
                    handleInputChange("plant_name", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="e.g., Fiddle Leaf Fig, Monstera, General"
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="content"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl min-h-[200px] sm:min-h-[240px] text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300 resize-none"
                  placeholder="Share your question, experience, or advice with the community..."
                />
                <p className="text-sm text-gray-500 flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">
                    {" "}
                    <Lightbulb />
                  </span>
                  <span className="text-green-500 mt-0.5">
                    Be specific and detailed to get the best help from the
                    community.
                  </span>
                </p>
              </div>
            </div>
          </section>

          {/* Tags */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">2</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tags
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label
                  htmlFor="tags"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Add Tags
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="e.g., disease, watering, leaves"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    disabled={!currentTag.trim()}
                    className="inline-flex items-center justify-center px-4 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">Add</span>
                  </button>
                </div>
                <p className="text-sm text-gray-500 flex items-center space-x-2">
                  <span className="text-green-500">
                    Press Enter or click Add to add a tag.
                  </span>
                </p>
              </div>

              {form.tags.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700">
                    Tags ({form.tags.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.tags.map((tag) => (
                      <div
                        key={tag}
                        className="inline-flex items-center bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-800 text-sm font-medium px-3 py-2 rounded-full group hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-0.5 transition-all duration-200"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Images */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">3</span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Images
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Optional - Add up to 5 images
                </p>
              </div>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 group ${
                isDragOver
                  ? "border-green-400 bg-purple-50 scale-[1.02]"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
              }`}
              onDrop={handleImageDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
            >
              <div className="space-y-4">
                <div
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDragOver
                      ? "bg-purple-200 scale-110"
                      : "bg-gray-100 group-hover:bg-purple-100"
                  }`}
                >
                  <Upload
                    className={`h-8 w-8 transition-colors duration-300 ${
                      isDragOver
                        ? "text-green-600"
                        : "text-gray-400 group-hover:text-green-500"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop images here
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    or click to select files (max 5 images, 10MB each)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  id="image-upload"
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Images
                </button>
              </div>
            </div>

            {images.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">
                    Selected Images ({images.length}/5)
                  </p>
                  <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 ml-4">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(images.length / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Submit Buttons */}
          <div className="sticky bottom-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 sm:gap-0">
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={isSubmitting}
                className="order-2 sm:order-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="order-1 sm:order-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Publishing...
                  </div>
                ) : (
                  "Publish Post"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-15 blur-3xl pointer-events-none" />
        <div className="fixed top-1/2 right-20 w-24 h-24 bg-blue-300 rounded-full opacity-10 blur-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default AddPost;
