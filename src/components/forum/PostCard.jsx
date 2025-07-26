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

const PostCard = ({ post }) => {
  const coverImage =
    post.imageUrls.length > 0 ? post.imageUrls[0] : plantPlaceholder;
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  return (
    <div className="w-full bg-white border rounded-lg hover:shadow-lg transition-shadow duration-200 p-4">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Avatar */}
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-gray-500" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {post.author.name}
            </h3>
            <span className="text-sm text-gray-400">•</span>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1 inline-block">
            {post.plantName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 mb-4">
        <Link to={`/forum/post/${post.id}`}>
          <h2 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {coverImage && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}

        <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs border rounded px-2 py-0.5 text-gray-700"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-xs border rounded px-2 py-0.5 text-gray-500">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center space-x-4">
          {/* Upvotes / Downvotes */}
          <div className="flex items-center space-x-1">
            <button className="flex items-center space-x-1 text-green-600 hover:bg-gray-100 px-2 py-1 rounded text-sm">
              <ChevronUp className="h-4 w-4" />
              <span>{post.upvotes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:bg-gray-100 px-2 py-1 rounded text-sm">
              <ChevronDown className="h-4 w-4" />
              <span>{post.downvotes}</span>
            </button>
          </div>

          {/* Comments */}
          <div className="flex items-center space-x-1 text-gray-500">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">{post.commentCount}</span>
          </div>
        </div>

        {/* Read More */}
        <Link to={`/forum/post/${post.id}`}>
          <button className="border border-gray-300 text-sm px-3 py-1.5 rounded hover:bg-gray-100 transition">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
