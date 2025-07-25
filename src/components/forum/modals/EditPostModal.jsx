import { useEffect, useState } from "react";
import { X, Plus } from "lucide-react";
import React from "react";

const EditPostModal = ({ post, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    plantName: "General",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");

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

  const handleSave = () => {
    onSave(form); // Pass updated data back
    onClose(); // Close modal
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold mb-6">Edit Post</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            value={form.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Update your title"
          />
        </div>

        {/* Plant Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Plant Name</label>
          <input
            value={form.plantName}
            onChange={(e) => handleInputChange("plantName", e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="e.g., Snake Plant"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content *</label>
          <textarea
            value={form.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="w-full px-4 py-2 border rounded min-h-[120px]"
            placeholder="Update your content..."
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex space-x-2 mb-2">
            <input
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border rounded"
              placeholder="e.g., watering, insects"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!currentTag.trim()}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {form.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-gray-200 text-sm px-2 py-1 rounded"
              >
                <span>#{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
