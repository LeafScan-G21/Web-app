import React, { useEffect } from "react";
import hero from "../../assets/forum/hero-plants.jpg";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/forum/Input.jsx";
import PostCard from "../../components/forum/PostCard.jsx";
import Pagination from "../../components/forum/Pagination.jsx";
import LoadingAnimation from "../../components/forum/PostLoading.jsx";
import { toast } from "react-hot-toast";
import { MessageSquare, Sprout } from "lucide-react";
import {
  searchPosts,
  deepSearchPosts,
  getLatestPosts,
  getLatestPostCount,
  getDeepSearchPostCount,
  getSearchPostCount,
} from "../../services/forum/post.js";

const Forum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deepSearch, setDeepSearch] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 5;

  //const posts = getPostsByPage(currentPage, postsPerPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const calculateTotalPages = () => {
      let pages = Math.floor(totalPosts / postsPerPage);
      if (totalPosts % postsPerPage !== 0 || totalPosts === 0) {
        pages += 1;
      }
      setTotalPages(pages);
    };

    calculateTotalPages();
  }, [totalPosts, postsPerPage]);

  const [fetchingPosts, setFetchingPosts] = useState(false);
  const fetchPosts = async (start = 0, limit = postsPerPage) => {
    try {
      setFetchingPosts(true);
      const response = await getLatestPosts(start, limit);
      setFetchedPosts(response.data);

      const countResponse = await getLatestPostCount();
      setTotalPosts(countResponse.data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setFetchingPosts(false);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
    if (searchActive) {
      handleSearch((page - 1) * postsPerPage, postsPerPage);
    } else {
      fetchPosts((page - 1) * postsPerPage, postsPerPage);
    }
  };

  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = async (start, limit) => {
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    try {
      setFetchingPosts(true);
      if (deepSearch) {
        const searchResponse = await deepSearchPosts(searchTerm, start, limit);
        setFetchedPosts(searchResponse.data);

        const countResponse = await getDeepSearchPostCount(searchTerm);
        setTotalPosts(countResponse.data);
      } else {
        const searchResponse = await searchPosts(searchTerm, start, limit);
        setFetchedPosts(searchResponse.data);

        const countResponse = await getSearchPostCount(searchTerm);
        setTotalPosts(countResponse.data);
      }
      setSearchActive(true);
      setLastSearchTerm(searchTerm);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to search posts");
    } finally {
      setFetchingPosts(false);
    }
  };
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
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 z-10" />
                    <Input
                      placeholder="Search posts, plants, or diseases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 sm:pl-16 pr-6 py-4 sm:py-5 w-full text-base sm:text-lg bg-transparent border-0 rounded-xl focus:ring-0 focus:outline-none placeholder-gray-400 text-gray-800 font-medium"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSearch(0, postsPerPage);
                        }
                      }}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex items-center justify-center sm:justify-end px-4 sm:px-0 sm:ml-4 sm:mr-2">
                    <div className="flex items-center">
                      {/* Custom styled checkbox */}
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="deepSearch"
                          checked={deepSearch}
                          onChange={(e) => setDeepSearch(e.target.checked)}
                          className="sr-only"
                        />
                        <label
                          htmlFor="deepSearch"
                          className="flex items-center cursor-pointer select-none"
                        >
                          <div
                            className={`
                        relative w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 transition-all duration-200 ease-in-out
                        ${
                          deepSearch
                            ? "bg-green-500 border-green-500 shadow-md"
                            : "bg-white border-gray-300 hover:border-green-400"
                        }
                      `}
                          >
                            {deepSearch && (
                              <svg
                                className="absolute inset-0 w-full h-full text-white p-0.5 sm:p-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">
                            Deep Search
                          </span>
                        </label>
                      </div>

                      {/* Tooltip */}
                      <div className="relative group/tooltip ml-2">
                        <span className="text-gray-400 cursor-pointer text-sm sm:text-base hover:text-gray-600 transition-colors duration-200">
                          ⓘ
                        </span>
                        <div className="absolute right-0 sm:left-0 mt-2 w-48 sm:w-56 p-3 bg-gray-800 text-white text-xs sm:text-sm rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                          <div className="relative">
                            Perform a deep search across all posts, plants, and
                            diseases. May take longer.
                            {/* Tooltip arrow */}
                            <div className="absolute -top-1 right-4 sm:left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 text-sm sm:text-base mt-4 font-medium px-4">
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
                {searchActive
                  ? `Results for "${lastSearchTerm}"`
                  : "Latest Posts"}
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

          {fetchingPosts ? (
            <>
              <LoadingAnimation multiplePosts={true} />
            </>
          ) : (
            <>
              {fetchedPosts?.length > 0 ? (
                <>
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
                  {totalPages > 1 && (
                    <>
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
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="text-center py-16 px-6">
                    {/* Icon Container */}
                    <div className="relative mb-8 flex justify-center">
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-lg">
                          <Search className="h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
                        </div>
                        {/* Decorative elements - positioned relative to the main icon */}
                        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-200 rounded-full flex items-center justify-center shadow-md">
                          <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-green-700" />
                        </div>
                        <div className="absolute -bottom-0.5 -left-0.5 sm:-bottom-1 sm:-left-1 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-200 rounded-full flex items-center justify-center shadow-md">
                          <Sprout className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-700" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="max-w-md mx-auto">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                        No posts found
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                        Try adjusting your search or check back later for new
                        discussions.
                      </p>

                      <div className="flex flex-wrap justify-center gap-3 mt-8 cursor-pointer">
                        <div className="bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                          <button
                            onClick={() => {
                              window.location.reload();
                            }}
                            className="flex items-center px-4 py-2"
                          >
                            <Search className="h-4 w-4 mr-2" />
                            Browse all posts
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-50 rounded-full opacity-30 blur-xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-emerald-50 rounded-full opacity-40 blur-lg"></div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
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
