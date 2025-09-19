import axios from "axios";
import { toast } from "react-hot-toast";
import { getUserIdFromLocalStorage } from "../../utils/auth";
//import qs from "qs";
const FORUM_URL = `${import.meta.env.VITE_BACKEND_URL}/forum`;
//const FORUM_URL = "http://localhost:8003";

const currentUserId = getUserIdFromLocalStorage();

export const getLatestPosts = async (start, limit) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/latest`, {
      params: { start, limit },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    toast.error("Failed to fetch latest posts");
    throw error;
  }
};

export const getLatestPostCount = async () => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/latest/count`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching latest post count:", error);
    toast.error("Failed to fetch latest post count");
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    console.log(postData);
    const response = await axios.post(`${FORUM_URL}/post`, postData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Post created successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("Failed to create post");
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/${postId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    toast.error("Failed to fetch post");
    throw error;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const response = await axios.put(`${FORUM_URL}/post/${postId}`, postData, {
      params: { user_id: currentUserId || "currentUserId" }, // replace with actual user ID
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Post updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    toast.error("Failed to update post");
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${FORUM_URL}/post/${postId}`, {
      params: { user_id: currentUserId || "currentUserId" }, // Replace with actual user ID
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Post deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Failed to delete post");
    throw error;
  }
};

export const uploadpostImages = async (images) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image);
  });

  try {
    const response = await axios.post(`${FORUM_URL}/upload`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading post images:", error);
    toast.error("Failed to upload images");
    throw error;
  }
};

export const deletePostImages = async (image_urls) => {
  try {
    const response = await axios.delete(`${FORUM_URL}/upload`, {
      data: { image_urls },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    //#toast.success("Images deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting post images:", error);
    toast.error("Failed to delete images");
    throw error;
  }
};

export const searchPosts = async (query, start, limit) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/filter`, {
      params: { query, start, limit },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching posts:", error);
    toast.error("Failed to search posts");
    throw error;
  }
};

export const getSearchPostCount = async (query) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/filter/count`, {
      params: { query },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search post count:", error);
    toast.error("Failed to fetch search post count");
    throw error;
  }
};

export const deepSearchPosts = async (query, start, limit) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/search`, {
      params: { query, start, limit },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deep searching posts:", error);
    toast.error("Failed to deep search posts");
    throw error;
  }
};

export const getDeepSearchPostCount = async (query) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/search/count`, {
      params: { query },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching deep search post count:", error);
    toast.error("Failed to fetch deep search post count");
    throw error;
  }
};

export const getRelatedPosts = async (tags, plant_name) => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/related`, {
      params: { tags: tags.toString(), plant_name },

      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    toast.error("Failed to fetch related posts");
    throw error;
  }
};
