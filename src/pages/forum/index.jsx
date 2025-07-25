import React from "react";
import hero from "../../assets/forum/hero-plants.jpg";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/forum/Input.jsx";
import { getPostsByPage, getTotalPages } from "../../data/mockdata.js";
import PostCard from "../../components/forum/PostCard.jsx";
import Pagination from "../../components/forum/Pagination.jsx";

const Forum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 5;

  const posts = getPostsByPage(currentPage, postsPerPage);
  const totalPages = getTotalPages(postsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-8">
        <img
          src={hero}
          alt="Plant care community"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              LeafScan Community Forum
            </h1>
            <p className="text-lg md:text-2xl opacity-90">
              Helping plants thrive together
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 px-4 md:px-8 lg:px-16">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          placeholder="Search posts, plants, or diseases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-3 w-full border border-green-500 rounded-lg shadow-lg focus:ring-4 focus:ring-green-700 focus:outline-none transition-transform transform"
        />
      </div>

      {/* Recent Posts Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>
        <p className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Forum;
