import { useEffect, useState } from "react";
import { X, Plus, Edit3, Save, Lightbulb } from "lucide-react";
import React from "react";

const EditPost = ({ post, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    plantName: "General",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        content: post.content || "",
        plantName: post.plantName || "General",
        tags: post.tags || [],
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

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call delay
    setTimeout(() => {
      onSave(form);
      setIsSaving(false);
      onClose();
    }, 1000);
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
        <div className="relative w-full max-w-3xl transform transition-all duration-300 scale-100">
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
                    value={form.plantName}
                    onChange={(e) =>
                      handleInputChange("plantName", e.target.value)
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
                      {" "}
                      <Lightbulb />
                    </span>
                    <span className="text-green-500 mt-0.5">
                      Be specific and detailed to get the best help from the
                      community.
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
