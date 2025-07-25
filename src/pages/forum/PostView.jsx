import React from "react";
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

const PostDetail = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Post not found
        </h1>
        <Link to="/">
          <button className="border px-4 py-2 rounded-md text-sm flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </button>
        </Link>
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
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/">
          <button className="text-sm flex items-center space-x-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Posts</span>
          </button>
        </Link>
      </div>

      {/* Post Content */}
      <div className="border rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{post.author.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="inline-block bg-gray-100 text-sm px-2 py-1 rounded">
                {post.plantName}
              </div>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="border rounded px-2 py-0.5 text-sm text-gray-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Images */}
        {post.imageUrls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {post.imageUrls.map((url, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden bg-gray-100"
              >
                <img
                  src={url}
                  alt={`${post.title} - Image ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mb-6">
          <p className="whitespace-pre-line leading-relaxed">{post.content}</p>
        </div>

        {/* Voting */}
        <div className="flex items-center space-x-6 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVote("up")}
              className="flex items-center space-x-1 text-green-600 text-sm"
            >
              <ChevronUp className="h-5 w-5" />
              <span>{post.upvotes}</span>
            </button>
            <button
              onClick={() => handleVote("down")}
              className="flex items-center space-x-1 text-sm text-gray-500"
            >
              <ChevronDown className="h-5 w-5" />
              <span>{post.downvotes}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments.length} comments</span>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="border rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Comments</h2>

        {/* Add Comment */}
        <div className="mb-6 space-y-2">
          <textarea
            placeholder="Share your thoughts or advice..."
            className="w-full border rounded p-3 min-h-[100px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {post.comments.length > 0 ? (
            <>
              {(showAllComments
                ? post.comments
                : post.comments.slice(0, 3)
              ).map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onVote={handleCommentVote}
                />
              ))}
              {post.comments.length > 3 && (
                <div className="text-center pt-4 border-t">
                  <button
                    onClick={() => setShowAllComments(!showAllComments)}
                    className="text-sm text-gray-700 flex items-center space-x-1"
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
            <div className="text-center py-8 text-gray-500">
              No comments yet. Be the first to share your thoughts!
            </div>
          )}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border rounded-lg p-6 mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-xl font-bold">Related Articles</h2>
            <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">
              {relatedPosts.length}
            </span>
          </div>
          <div className="space-y-6">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment, onVote }) => {
  const commentDate = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div className="flex space-x-4">
      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
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

      <div className="flex-1 space-y-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-black">
            {comment.author.name}
          </span>
          <span>•</span>
          <span>{commentDate}</span>
        </div>

        <p className="text-gray-800">{comment.content}</p>

        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => onVote(comment.id, "up")}
            className="flex items-center space-x-1 text-green-600"
          >
            <ChevronUp className="h-4 w-4" />
            <span>{comment.upvotes}</span>
          </button>
          <button
            onClick={() => onVote(comment.id, "down")}
            className="flex items-center space-x-1 text-gray-500"
          >
            <ChevronDown className="h-4 w-4" />
            <span>{comment.downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
