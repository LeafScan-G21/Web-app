import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";
import { updateComment } from "../../../services/forum/comment";
import { toast } from "react-hot-toast";

const EditComment = ({ comment, onClose }) => {
  const [content, setContent] = useState(comment?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setContent(comment?.content || "");
    console.log(comment);
  }, [comment]);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Comment content cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateComment(comment._id, content);
      if (response.errors) {
        console.error("Error updating comment:", response.errors);
      } else {
        onClose(content);
      }
    } catch (error) {
      console.error("Error saving comment:", error);
      toast.error("Failed to save comment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-green-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Comment
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="comment-content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comment
                </label>
                <textarea
                  id="comment-content"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Write your comment..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 resize-none"
                  autoFocus
                />
                <div className="mt-1 text-xs text-gray-500">
                  Press Cmd/Ctrl + Enter to save, Escape to cancel
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-green-100 px-6 py-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || !content.trim()}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
