import { useEffect, useState } from "react";
import { X, Plus, Edit3, Save, Lightbulb, Upload, Camera } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  uploadpostImages,
  deletePostImages,
  updatePost,
} from "../../../services/forum/post";
import React from "react";

const EditPost = ({ post, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    plant_name: "General",
    tags: [],
    image_urls: [],
    author_id: "currentUserId", // Replace with actual user ID
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletedUrls, setDeletedUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        content: post.content || "",
        plant_name: post.plant_name || "General",
        tags: post.tags || [],
        image_urls: post.image_urls || [],
        author_id: post.author_id || "currentUserId", // Replace with actual user ID
      });
    }
  }, [post]);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
      setCurrentTag("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleDeleteImage = (imageUrl) => {
    setForm((prev) => ({
      ...prev,
      image_urls: prev.image_urls.filter((url) => url !== imageUrl),
    }));
    setDeletedUrls((prev) => [...prev, imageUrl]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = form.image_urls.length + newImages.length;
    const availableSlots = 5 - totalImages;

    if (availableSlots <= 0) {
      alert("Maximum 5 images allowed");
      return;
    }

    const filesToAdd = files.slice(0, availableSlots);
    setNewImages((prev) => [...prev, ...filesToAdd]);

    // Clear the input
    e.target.value = "";
  };

  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const getTotalImageCount = () => {
    return form.image_urls.length + newImages.length;
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (!form.title || !form.content) {
        toast.error("Title and content are required");
        return;
      }
      if (!form.plant_name) {
        toast.error("Plant name is required");
        return;
      }
      if (deletedUrls.length > 0) {
        console.log("Deleting images:", deletedUrls);
        await deletePostImages(deletedUrls);
      }
      let postData = form;
      if (newImages.length > 0) {
        const uploadedImages = await uploadpostImages(newImages);
        postData = {
          ...postData,
          image_urls: [...form.image_urls, ...uploadedImages.data],
        };
      }

      const updateResponse = await updatePost(post._id, postData);
      if (updateResponse.errors) {
        console.error("Error updating post:", updateResponse.errors);
        toast.error(updateResponse.errors || "Failed to update post");
        return;
      }
      if (updateResponse.data) {
        //toast.success("Post updated successfully!");
        onClose();
        window.location.reload(); // Reload to reflect changes
      }
    } catch (error) {
      console.error("Error saving post:", error);
      //toast.error("Failed to save post");
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl transform transition-all duration-300 scale-100">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 px-6 sm:px-8 py-6 border-b border-green-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Edit3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      Edit Post
                    </h2>
                    <p className="text-green-700 text-sm mt-1">
                      Update your community post
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  disabled={isSaving}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 sm:px-8 py-8 max-h-[70vh] overflow-y-auto">
              <div className="space-y-8">
                {/* Title */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-4 py-3 text-lg font-medium border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="Update your title"
                    disabled={isSaving}
                  />
                </div>

                {/* Plant Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Plant Name
                  </label>
                  <input
                    value={form.plant_name}
                    onChange={(e) =>
                      handleInputChange("plant_name", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                    placeholder="e.g., Snake Plant, Monstera"
                    disabled={isSaving}
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl min-h-[160px] text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300 resize-none"
                    placeholder="Update your content..."
                    disabled={isSaving}
                  />
                  <p className="text-sm text-gray-500 flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">
                      <Lightbulb className="h-4 w-4" />
                    </span>
                    <span className="text-green-500 mt-0.5">
                      Be specific and detailed to get the best help from the
                      community.
                    </span>
                  </p>
                </div>

                {/* Images Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                      Images ({getTotalImageCount()}/5)
                    </label>
                    <span className="text-xs text-gray-500">
                      Maximum 5 images allowed
                    </span>
                  </div>

                  {/* Existing Images */}
                  {form.image_urls.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-600">
                        Current Images
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {form.image_urls.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors">
                              <img
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => {
                                handleDeleteImage(imageUrl);
                                console.log("Deleted image:", imageUrl);
                                console.log(deletedUrls);
                              }}
                              disabled={isSaving}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg group-hover:opacity-100 disabled:opacity-50"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Images Preview */}
                  {newImages.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-600">
                        New Images
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {newImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden border-2 border-green-200 hover:border-green-300 transition-colors bg-green-50">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`New image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              onClick={() => handleRemoveNewImage(index)}
                              disabled={isSaving}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-50"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add Images Input */}
                  {getTotalImageCount() < 5 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB (
                              {5 - getTotalImageCount()} slots remaining)
                            </p>
                          </div>
                        </label>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isSaving || getTotalImageCount() >= 5}
                          className="hidden"
                        />
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 flex items-center space-x-2">
                    <Camera className="h-4 w-4 text-green-500" />
                    <span>
                      Add images to help the community better understand your
                      post.
                    </span>
                  </p>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    Tags
                  </label>

                  {/* Add Tag Input */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300"
                      placeholder="e.g., watering, insects, diseases"
                      disabled={isSaving}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={!currentTag.trim() || isSaving}
                      className="inline-flex items-center justify-center px-4 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="ml-2 hidden sm:inline">Add</span>
                    </button>
                  </div>

                  {/* Tags Display */}
                  {form.tags.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                          Current Tags ({form.tags.length})
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {form.tags.map((tag) => (
                          <div
                            key={tag}
                            className="inline-flex items-center bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-green-800 text-sm font-medium px-3 py-2 rounded-full group hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                          >
                            <span>#{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              disabled={isSaving}
                              className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full p-0.5 transition-all duration-200 disabled:opacity-50"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 flex items-center space-x-2">
                    <span className="text-green-500">
                      Press Enter or click Add to add a tag.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 sm:px-8 py-6 border-t border-gray-100">
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                <button
                  onClick={onClose}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-3 text-gray-700 font-medium bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {isSaving ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Saving...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center space-x-4">
            <div className="animate-spin h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full"></div>
            <span className="text-gray-700 font-medium">
              Updating your post...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
