import React, { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  User,
  Calendar,
  ArrowLeft,
  Share2,
} from "lucide-react";
import PostCard from "../../components/forum/PostCard.jsx";
import { getPostById, getRelatedPosts } from "../../data/mockdata.js";
import EditPostModal from "../../components/forum/modals/EditPostModal.jsx";
import DeletePost from "../../components/forum/modals/DeletePost.jsx";

const PostDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view");

  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Post not found
            </h1>
            <p className="text-gray-600 mb-8">
              The post you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <Link to="/forum">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post.id, post.tags, post.plantName);
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleVote = () => {
    // Simulate vote
  };

  const handleCommentVote = () => {
    // Simulate comment vote
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setNewComment("");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link to="/">
            <button className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Posts</span>
            </button>
          </Link>
        </div>

        {/* Post Content */}
        <article className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 mb-8">
          {/* Post Header */}
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
            <div className="flex items-start space-x-4 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-2 ring-gray-100">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  {post.author.name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{formattedDate}</span>
                </div>
                <div className="inline-flex items-center bg-gray-100 text-sm font-medium px-3 py-1.5 rounded-full text-gray-700">
                  {post.plantName}
                </div>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="self-start flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              title="Share post"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </header>

          {/* Post Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            {/* TODO: HIDE THE ICONS FOR OTHERS */}
            <div className="flex items-center space-x-4 mt-2 sm:mt-2">
              <button
                className="text-gray-500 hover:text-green-500/70 transition-colors duration-200"
                title="Edit Post"
                onClick={() => {
                  setMode("edit");
                  setModalOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
              <button
                className="text-gray-500 hover:text-green-500/70 transition-colors duration-200"
                title="Delete Post"
                onClick={() => {
                  setMode("delete");
                  setModalOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Images */}
          {post.imageUrls.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="group relative rounded-xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={url}
                      alt={`${post.title} - Image ${index + 1}`}
                      className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mb-8">
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-line leading-relaxed text-gray-800 text-base sm:text-lg">
                {post.content}
              </p>
            </div>
          </div>

          {/* Voting and Stats */}
          <footer className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleVote("up")}
                className="flex items-center space-x-2 px-3 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 group"
              >
                <ChevronUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{post.upvotes}</span>
              </button>
              <button
                onClick={() => handleVote("down")}
                className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              >
                <ChevronDown className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{post.downvotes}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 px-3 py-2 text-gray-500 bg-gray-50 rounded-lg">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">
                {post.comments.length} comments
              </span>
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 mb-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Comments
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {post.comments.length}
              </span>
            </h2>
          </header>

          {/* Add Comment Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <div className="space-y-4">
              <textarea
                placeholder="Share your thoughts or advice..."
                className="w-full border border-gray-200 rounded-xl p-4 min-h-[120px] text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin -ml-1 mr-3 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Posting...
                    </>
                  ) : (
                    "Post Comment"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.length > 0 ? (
              <>
                {(showAllComments
                  ? post.comments
                  : post.comments.slice(0, 3)
                ).map((comment, index) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onVote={handleCommentVote}
                    isLast={
                      index ===
                      (showAllComments
                        ? post.comments.length - 1
                        : Math.min(2, post.comments.length - 1))
                    }
                  />
                ))}
                {post.comments.length > 3 && (
                  <div className="text-center pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setShowAllComments(!showAllComments)}
                      className="inline-flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>
                        {showAllComments
                          ? "Show Less Comments"
                          : `Show All ${post.comments.length} Comments`}
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
            <header className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Articles
              </h2>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {relatedPosts.length}
              </span>
            </header>
            <div className="space-y-6">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
      {modalOpen && mode === "edit" && (
        <EditPostModal
          post={post}
          onClose={() => setModalOpen(false)}
          onSave={() => {}}
        />
      )}
      {modalOpen && mode === "delete" && <DeletePost post_id={post.id} />}
    </div>
  );
};

const CommentItem = ({ comment, onVote, isLast }) => {
  const commentDate = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div
      className={`flex space-x-4 ${
        !isLast ? "pb-6 border-b border-gray-100" : ""
      }`}
    >
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-2 ring-gray-100">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-bold text-gray-900 truncate">
            {comment.author.name}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 truncate">{commentDate}</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed">{comment.content}</p>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => onVote(comment.id, "up")}
            className="flex items-center space-x-2 px-3 py-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 group"
          >
            <ChevronUp className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-sm">{comment.upvotes}</span>
          </button>
          <button
            onClick={() => onVote(comment.id, "down")}
            className="flex items-center space-x-2 px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
          >
            <ChevronDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="font-medium text-sm">{comment.downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
