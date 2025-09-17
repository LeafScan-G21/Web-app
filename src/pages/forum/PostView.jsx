/* eslint-disable react-hooks/exhaustive-deps */
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
  Edit,
  Trash2,
} from "lucide-react";
import PostCard from "../../components/forum/PostCard.jsx";
import EditPost from "../../components/forum/modals/EditPost.jsx";
import DeletePost from "../../components/forum/modals/DeletePost.jsx";
import EditComment from "../../components/forum/modals/EditComment.jsx";
import DeleteComment from "../../components/forum/modals/DeleteComment.jsx";
import { getPostById, getRelatedPosts } from "../../services/forum/post.js";
import LoadingAnimation from "../../components/forum/PostLoading.jsx";
import toast from "react-hot-toast";
import {
  addComment,
  getCommentsByPostId,
} from "../../services/forum/comment.js";
import {
  addPostVote,
  hasVotedOnPost,
  togglePostVote,
  removePostVote,
  addCommentVote,
  removeCommentVote,
  toggleCommentVote,
  hasVotedOnComment,
} from "../../services/forum/vote.js";

import { getUserDetails } from "../../services/auth/user.js";
import { getUserIdFromLocalStorage } from "../../utils/auth.js";

const PostDetail = () => {
  const currentUserId = getUserIdFromLocalStorage();
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view");

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [fetchingPost, setFetchingPost] = useState(true);

  const [hasVotedPost, setHasVotedPost] = useState(false);
  const [postVoteType, setPostVoteType] = useState(0);

  const [authorDetails, setAuthorDetails] = useState(null);

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      if (post && post.author_id) {
        try {
          const userDetails = await getUserDetails(post.author_id);
          setAuthorDetails(userDetails);
        } catch (error) {
          console.error("Failed to fetch author details:", error);
        }
      }
    };
    fetchAuthorDetails();
  }, [post]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setFetchingPost(true);
        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setFetchingPost(false);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post && post._id) {
        try {
          const response = await getCommentsByPostId(post._id);
          setComments(response?.data);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      }
    };
    fetchComments();
  }, [post]);

  useEffect(() => {
    const fetchVoteStatus = async () => {
      if (post && post._id) {
        try {
          const response = await hasVotedOnPost(post._id);
          if (response.data) {
            ////console.log("Vote status fetched:", response.data);
            setHasVotedPost(response.data.voted);
            setPostVoteType(response.data.type);
          }
        } catch (error) {
          console.error("Failed to fetch vote status:", error);
        }
      }
    };
    fetchVoteStatus();
    ////console.log("has voted:", hasVotedPost, "type:", postVoteType);
  }, [post]);

  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if ((post && post.tags) || (post && post.plant_name)) {
        try {
          const response = await getRelatedPosts(post.tags, post.plant_name);

          const relataedPosts = response.data
            .filter((relatedPost) => relatedPost._id !== post._id)
            .filter(
              (relatedPost, index, self) =>
                index === self.findIndex((p) => p._id === relatedPost._id)
            );

          setRelatedPosts(relataedPosts);
        } catch (error) {
          console.error("Failed to fetch related posts:", error);
        }
      }
    };
    fetchRelatedPosts();
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [post?._id]);

  if (fetchingPost) {
    return <LoadingAnimation multiplePosts={false} />;
  }

  const handleCommentUpdate = (comment_id, updatedContent) => {
    if (!updatedContent.trim()) {
      return;
    }
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === comment_id
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  const handleCommentDelete = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment._id !== comment_id)
    );
  };

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

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleVote = async (type) => {
    if (!hasVotedPost) {
      try {
        const postVoteData = await addPostVote(post._id, type);
        if (postVoteData.errors) {
          console.error("Error voting on post:", postVoteData.errors);
        } else {
          setPost((prevPost) => ({
            ...prevPost,
            upvote_count:
              type === 1 ? prevPost.upvote_count + 1 : prevPost.upvote_count,
            downvote_count:
              type === 0
                ? prevPost.downvote_count + 1
                : prevPost.downvote_count,
          }));
        }
      } catch (error) {
        console.error("Error handling vote:", error);
      }
    } else {
      try {
        const removeVoteData = await removePostVote(post._id);
        if (removeVoteData.errors) {
          console.error(
            "Error removing vote from post:",
            removeVoteData.errors
          );
        } else {
          setPost((prevPost) => ({
            ...prevPost,
            upvote_count:
              type === 1 ? prevPost.upvote_count - 1 : prevPost.upvote_count,
            downvote_count:
              type === 0
                ? prevPost.downvote_count - 1
                : prevPost.downvote_count,
          }));
        }
      } catch (error) {
        console.error("Error handling vote removal:", error);
      }
    }
  };

  const handleToggleVote = async () => {
    try {
      const oldVoteType = postVoteType;
      const toggleVoteData = await togglePostVote(post._id);
      if (toggleVoteData.errors) {
        console.error("Error toggling post vote:", toggleVoteData.errors);
      } else {
        setHasVotedPost(true);
        setPostVoteType(oldVoteType === 1 ? 0 : 1);
        setPost((prevPost) => ({
          ...prevPost,
          upvote_count:
            oldVoteType === 1
              ? prevPost.upvote_count - 1
              : prevPost.upvote_count + 1,
          downvote_count:
            oldVoteType === 0
              ? prevPost.downvote_count - 1
              : prevPost.downvote_count + 1,
        }));
      }
    } catch (error) {
      console.error("Error toggling post vote:", error);
    }
  };

  const handleCommentVote = (comment_id, vote_type, hasVotedComment) => {
    if (!hasVotedComment) {
      //console.log("Adding comment vote:", comment_id, vote_type);
      addCommentVote(comment_id, vote_type)
        .then((response) => {
          if (response.errors) {
            console.error("Error voting on comment:", response.errors);
          } else {
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment._id === comment_id
                  ? {
                      ...comment,
                      upvote_count:
                        vote_type === 1
                          ? comment.upvote_count + 1
                          : comment.upvote_count,
                      downvote_count:
                        vote_type === 0
                          ? comment.downvote_count + 1
                          : comment.downvote_count,
                    }
                  : comment
              )
            );
          }
        })
        .catch((error) => {
          console.error("Error handling comment vote:", error);
        });
    } else {
      //console.log("Removing comment vote:", comment_id, vote_type);
      removeCommentVote(comment_id)
        .then((response) => {
          if (response.errors) {
            console.error("Error removing comment vote:", response.errors);
          } else {
            setComments((prevComments) =>
              prevComments.map((comment) =>
                comment._id === comment_id
                  ? {
                      ...comment,
                      upvote_count:
                        vote_type === 1
                          ? comment.upvote_count - 1
                          : comment.upvote_count,
                      downvote_count:
                        vote_type === 0
                          ? comment.downvote_count - 1
                          : comment.downvote_count,
                    }
                  : comment
              )
            );
          }
        })
        .catch((error) => {
          console.error("Error handling remove comment vote:", error);
        });
    }
  };
  const handleToggleCommentVote = async (comment_id, oldVoteType) => {
    try {
      const toggleVoteData = await toggleCommentVote(comment_id);
      if (toggleVoteData.errors) {
        console.error("Error toggling comment vote:", toggleVoteData.errors);
      } else {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === comment_id
              ? {
                  ...comment,
                  upvote_count:
                    oldVoteType === 1
                      ? comment.upvote_count - 1
                      : comment.upvote_count + 1,
                  downvote_count:
                    oldVoteType === 0
                      ? comment.downvote_count - 1
                      : comment.downvote_count + 1,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.error("Error toggling comment vote:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    const commentData = {
      post_id: post._id,
      content: newComment,
      author_id: currentUserId || "currentUserId", // replace with actual user ID
    };
    try {
      setIsSubmitting(true);
      const response = await addComment(commentData);
      if (response.errors) {
        console.error("Error creating comment:", response.errors);
      } else {
        setNewComment("");
        setComments((prevComments) => [...prevComments, response.data]);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Post link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link to="/forum">
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
                  {post.author_id ? (
                    <img
                      src={
                        authorDetails?.profile_picture ||
                        "https://images.unsplash.com/photo-1647400994173-25140723080e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={post.author_id}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-7 w-7 sm:h-8 sm:w-8 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  {authorDetails?.first_name + " " + authorDetails?.last_name ||
                    "Unknown Author"}{" "}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{formattedDate}</span>
                </div>
                <div className="inline-flex items-center bg-gray-100 text-sm font-medium px-3 py-1.5 rounded-full text-gray-700">
                  {post.plant_name}
                </div>
              </div>
            </div>

            {/* TODO: HIDE THE ICONS FOR OTHERS */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="self-start flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Share post"
              >
                <Share2 className="h-5 w-5" />
              </button>
              {post.author_id === currentUserId && (
                <>
                  <button
                    onClick={() => {
                      setMode("edit");
                      setModalOpen(true);
                    }}
                    className="self-start flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    title="Edit Post"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setMode("delete");
                      setModalOpen(true);
                    }}
                    className="self-start flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    title="Delete Post"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </header>

          {/* Post Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
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
          {post.image_urls?.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {post.image_urls.map((url, index) => (
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
                onClick={() => {
                  if (hasVotedPost && postVoteType === 0) {
                    handleToggleVote();
                  } else {
                    handleVote(1);
                  }
                }}
                className="flex items-center space-x-2 px-3 py-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 group"
              >
                <ChevronUp className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{post.upvote_count}</span>
              </button>
              <button
                onClick={() => {
                  if (hasVotedPost && postVoteType === 1) {
                    handleToggleVote();
                  } else {
                    handleVote(0);
                  }
                }}
                className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              >
                <ChevronDown className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{post.downvote_count}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 px-3 py-2 text-gray-500 bg-gray-50 rounded-lg">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">{comments?.length} comments</span>
            </div>
          </footer>
        </article>

        {/* Comments Section */}
        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8 mb-8">
          <header className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Comments
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {comments?.length}
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
            {comments?.length > 0 ? (
              <>
                {(showAllComments ? comments : comments.slice(0, 3)).map(
                  (comment, index) => (
                    <div key={comment._id}>
                      <CommentItem
                        comment={comment}
                        onVote={handleCommentVote}
                        onToggleVote={handleToggleCommentVote}
                        isLast={
                          index ===
                          (showAllComments
                            ? comments?.length - 1
                            : Math.min(2, comments?.length - 1))
                        }
                        handleCommentUpdate={handleCommentUpdate}
                        handleCommentDelete={handleCommentDelete}
                      />
                    </div>
                  )
                )}
                {comments?.length > 3 && (
                  <div className="text-center pt-6 border-t border-gray-100">
                    <button
                      onClick={() => setShowAllComments(!showAllComments)}
                      className="inline-flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>
                        {showAllComments
                          ? "Show Less Comments"
                          : `Show All ${comments?.length} Comments`}
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
        {relatedPosts?.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
            <header className="flex items-center space-x-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Posts
              </h2>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                {relatedPosts?.length}
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
        <EditPost
          post={post}
          onClose={() => setModalOpen(false)}
          onSave={() => {}}
        />
      )}
      {modalOpen && mode === "delete" && (
        <DeletePost post_id={post._id} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

const CommentItem = ({
  comment,
  onVote,
  onToggleVote,
  isLast,
  handleCommentUpdate,
  handleCommentDelete,
}) => {
  const currentUserId = getUserIdFromLocalStorage();
  const commentDate = new Date(comment.created_at).toLocaleDateString();
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("view-comment");

  const [hasVotedComment, setHasVotedComment] = useState(false);
  const [commentVoteType, setCommentVoteType] = useState(0);
  const [commentauthorDetails, setCommentAuthorDetails] = useState(null);

  useEffect(() => {
    const fetchCommentAuthorDetails = async () => {
      if (comment && comment.author_id) {
        try {
          const userDetails = await getUserDetails(comment.author_id);
          setCommentAuthorDetails(userDetails);
        } catch (error) {
          console.error("Failed to fetch comment author details:", error);
        }
      }
    };
    fetchCommentAuthorDetails();
  }, [comment]);

  const fetchVoteStatus = async () => {
    try {
      const res = await hasVotedOnComment(comment._id);
      if (res.errors) {
        console.error("Error fetching vote status:", res.errors);
        return;
      }
      setHasVotedComment(res.data.voted);
      setCommentVoteType(res.data.type);
    } catch (err) {
      console.error("Error fetching vote status:", err);
    }
  };

  useEffect(() => {
    fetchVoteStatus();
  }, [comment._id]);

  const handleClickOutside = (event) => {
    if (modalOpen && !event.target.closest(".menu-container")) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  return (
    <div
      className={`flex space-x-4 ${
        !isLast ? "pb-6 border-b border-gray-100" : ""
      }`}
    >
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-2 ring-gray-100">
          {commentauthorDetails ? (
            <img
              src={
                commentauthorDetails?.profile_picture ||
                "https://images.unsplash.com/photo-1647400994173-25140723080e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={comment.author_id}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 space-y-3 relative">
        {comment.author_id === currentUserId && (
          <div className="absolute top-0 right-0 menu-container">
            <button
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              title="More Options"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            {modalOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setMode("edit-comment");
                    setModalOpen(false);
                  }}
                >
                  Edit Comment
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setMode("delete-comment");
                    setModalOpen(false);
                  }}
                >
                  Delete Comment
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-bold text-gray-900 truncate">
            {commentauthorDetails
              ? commentauthorDetails.first_name +
                " " +
                commentauthorDetails.last_name
              : "unknown user"}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-gray-500 truncate">{commentDate}</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed">{comment.content}</p>
        </div>

        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => {
                if (hasVotedComment && commentVoteType === 0) {
                  //console.log("upvote button clicked");
                  //console.log("has voted:", hasVotedComment);
                  //console.log("comment vote type:", commentVoteType);
                  //console.log("toggling vote");
                  onToggleVote(comment._id, commentVoteType);
                  setHasVotedComment(true);
                  setCommentVoteType(1);
                } else {
                  //console.log("upvote button clicked");
                  //console.log("has voted:", hasVotedComment);
                  //console.log("comment vote type:", commentVoteType);
                  onVote(comment._id, 1, hasVotedComment);
                  setCommentVoteType(hasVotedComment ? 0 : 1);
                  setHasVotedComment(!hasVotedComment);
                }
              }}
              className="flex items-center space-x-2 px-3 py-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200 group"
            >
              <ChevronUp className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium text-sm">
                {comment.upvote_count}
              </span>
            </button>
            <button
              onClick={() => {
                if (hasVotedComment && commentVoteType === 1) {
                  //console.log("downvote button clicked");
                  //console.log("has voted:", hasVotedComment);
                  //console.log("comment vote type:", commentVoteType);
                  //console.log("toggling vote");
                  onToggleVote(comment._id, commentVoteType);
                  setCommentVoteType(0);
                  setHasVotedComment(true);
                } else {
                  //console.log("downvote button clicked");
                  //console.log("has voted:", hasVotedComment);
                  //console.log("comment vote type:", commentVoteType);
                  onVote(comment._id, 0, hasVotedComment);
                  setCommentVoteType(hasVotedComment ? 1 : 0);
                  setHasVotedComment(!hasVotedComment);
                }
              }}
              className="flex items-center space-x-2 px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 group"
            >
              <ChevronDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium text-sm">
                {comment.downvote_count}
              </span>
            </button>
          </div>
        </div>
        {mode === "edit-comment" && (
          <EditComment
            comment={comment}
            onClose={(content) => {
              setMode("view-comment");
              setModalOpen(false);
              handleCommentUpdate(comment._id, content);
            }}
          />
        )}
        {mode === "delete-comment" && (
          <DeleteComment
            comment={comment}
            onClose={() => {
              setMode("view-comment");
              setModalOpen(false);
              handleCommentDelete(comment._id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetail;
