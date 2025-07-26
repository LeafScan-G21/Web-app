import axios from "axios";
import { toast } from "react-hot-toast";
const FORUM_URL = import.meta.env.VITE_FORUM_SERVICE_URL;

export const getLatestPosts = async () => {
  try {
    const response = await axios.get(`${FORUM_URL}/post/latest`, {
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

export const createPost = async (postData) => {
  try {
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
