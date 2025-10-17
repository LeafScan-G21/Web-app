import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  User,
  Calendar,
} from "lucide-react";
import plantPlaceholder from "../../assets/forum/plant-placeholder.jpg";
import { getUserDetails } from "../../services/auth/user";
import { useEffect } from "react";

const PostCard = ({ post }) => {
  const coverImage =
    post.image_urls?.length > 0 ? post.image_urls[0] : plantPlaceholder;
  const formattedDate = new Date(post.created_at).toLocaleDateString();

  const [authorDetails, setAuthorDetails] = React.useState(null);
  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const details = await getUserDetails(post.author_id);
        setAuthorDetails(details);
      } catch (error) {
        console.error("Error fetching author details:", error);
      }
    };
    fetchAuthorDetails();
  }, [post.author_id]);
  return (
    <div className="w-full bg-white border border-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 p-6 group hover:border-green-200">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center ring-2 ring-green-50 group-hover:ring-green-100 transition-all duration-300">
          {authorDetails ? (
            <img
              src={
                authorDetails.profile_picture ||
                "https://images.unsplash.com/photo-1647400994173-25140723080e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={post.author_id}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-green-600" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {authorDetails
                ? authorDetails.first_name + " " + authorDetails.last_name
                : "unknown author"}
            </h3>
            <span className="text-sm text-gray-400">•</span>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <span className="text-xs bg-green-100 text-green-700 rounded-full px-3 py-1 inline-block font-medium">
            {post.plant_name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-4">
        <Link to={`/forum/post/${post._id}`}>
          <h2 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-2 group-hover:text-green-600">
            {post.title}
          </h2>
        </Link>

        {coverImage && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
            <img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs border border-green-200 rounded-full px-3 py-1 text-green-700 bg-green-50 hover:bg-green-100 transition-colors duration-200 font-medium"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-600 bg-gray-50 font-medium">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-green-100">
        <div className="flex items-center space-x-4">
          {/* Upvotes / Downvotes */}
          <div className="flex items-center space-x-1">
            <button className="flex items-center space-x-1 text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200">
              <ChevronUp className="h-4 w-4" />
              <span>{post.upvote_count}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200">
              <ChevronDown className="h-4 w-4" />
              <span>{post.downvote_count}</span>
            </button>
          </div>

          {/* Comments */}
          <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{post.comment_count}</span>
          </div>
        </div>

        {/* Read More */}
        <Link to={`/forum/post/${post._id}`}>
          <button className="border border-green-300 text-sm px-4 py-2 rounded-lg hover:bg-green-50 hover:border-green-400 transition-all duration-200 text-green-700 font-medium shadow-sm hover:shadow">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
