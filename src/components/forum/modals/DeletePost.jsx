import React, { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";

const DeletePost = ({ post_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call delay
    setTimeout(() => {
      console.log(`Post with ID ${post_id} deleted`);
      setIsDeleting(false);
      closeModal();
    }, 1000);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
      >
        <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
        Delete Post
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md transform transition-all duration-300 scale-100">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Delete Post
                      </h3>
                    </div>
                    <button
                      onClick={closeModal}
                      disabled={isDeleting}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/80 rounded-full transition-all duration-200 disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Trash2 className="h-8 w-8 text-red-600" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold text-gray-900">
                        Are you sure?
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        This action cannot be undone. Your post and all its
                        comments will be permanently deleted from the community.
                      </p>
                    </div>

                    {/* Warning Box */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-red-800">
                          <p className="font-medium mb-1">
                            This will permanently:
                          </p>
                          <ul className="space-y-1 text-red-700">
                            <li>• Remove your post from the community</li>
                            <li>• Delete all associated comments</li>
                            <li>• Remove any uploaded images</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button
                      onClick={closeModal}
                      disabled={isDeleting}
                      className="w-full sm:w-auto px-6 py-3 text-gray-700 font-medium bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {isDeleting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Deleting...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Yes, Delete Post
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
