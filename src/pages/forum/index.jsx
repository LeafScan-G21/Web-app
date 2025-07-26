import React, { useEffect } from "react";
import hero from "../../assets/forum/hero-plants.jpg";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/forum/Input.jsx";
import { getTotalPages } from "../../data/mockdata.js";
import PostCard from "../../components/forum/PostCard.jsx";
import Pagination from "../../components/forum/Pagination.jsx";
import { getLatestPosts } from "../../services/forum/post.js";
import LoadingAnimation from "../../components/forum/PostLoading.jsx";

const Forum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const postsPerPage = 5;

  //const posts = getPostsByPage(currentPage, postsPerPage);
  const totalPages = getTotalPages(postsPerPage);

  const [fetchingPosts, setFetchingPosts] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setFetchingPosts(true);
        const response = await getLatestPosts();
        setFetchedPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setFetchingPosts(false);
      }
    };

    fetchPosts();
  }, []);
  if (fetchingPosts) {
    return <LoadingAnimation multiplePosts={true} />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="relative mb-12 sm:mb-16">
          <div className="relative h-72 sm:h-80 md:h-96 lg:h-[28rem] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={hero}
              alt="Plant care community"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20">
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight">
                  <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                    LeafScan Community
                  </span>
                  <br />
                  <span className="inline-block transform hover:scale-105 transition-transform duration-300 delay-100">
                    Forum
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl opacity-95 font-light leading-relaxed">
                  Helping plants thrive together
                </p>
                <div className="mt-6 sm:mt-8 lg:mt-10">
                  <div className="w-16 sm:w-20 lg:w-24 h-1 bg-green-400 mx-auto rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-12 sm:mb-16">
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-2 group-hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300" />
                  <Input
                    placeholder="Search posts, plants, or diseases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 sm:pl-16 pr-6 py-4 sm:py-5 w-full text-base sm:text-lg bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none placeholder-gray-400 text-gray-800 font-medium"
                  />
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm sm:text-base mt-4 font-medium">
              Discover solutions, share experiences, and grow your knowledge
            </p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Recent Posts
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Latest discussions from our community
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-100 to-green-50 px-4 py-2 rounded-full border border-green-200">
                <p className="text-green-800 font-semibold text-sm sm:text-base">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6 sm:space-y-8 mb-12 sm:mb-16">
            {fetchedPosts.map((post, index) => (
              <div
                key={post._id}
                className="transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Explore More Posts
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Navigate through our community discussions
                </p>
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div className="fixed bottom-20 right-10 w-40 h-40 bg-green-200 rounded-full opacity-15 blur-3xl pointer-events-none" />
        <div className="fixed top-1/2 right-20 w-24 h-24 bg-green-300 rounded-full opacity-10 blur-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default Forum;
