import axios from "axios";
import { toast } from "react-hot-toast";
import { getUserIdFromLocalStorage } from "../../utils/auth";
const FORUM_URL = `${import.meta.env.VITE_BACKEND_URL}/forum`;
// const FORUM_URL = "http://localhost:8003";

const currUserId = getUserIdFromLocalStorage();
const authData = JSON.parse(
  localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
);
const token = authData?.access_token || "";

export const addComment = async (commentData) => {
  try {
    const response = await axios.post(`${FORUM_URL}/comment`, commentData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Comment added successfully!");
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    toast.error("Failed to add comment");
    throw error;
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${FORUM_URL}/comment/${postId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments by post ID:", error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${FORUM_URL}/comment/${commentId}`, {
      params: { user_id: currUserId || "currentUserId" }, // replace with actual user ID
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Comment deleted successfully!");
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    toast.error("Failed to delete comment");
    throw error;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const response = await axios.put(
      `${FORUM_URL}/comment/${commentId}`,
      { content },
      {
        params: { user_id: currUserId || "currentUserId" }, // replace with actual user ID
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Comment updated successfully!");
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    toast.error("Failed to update comment");
    throw error;
  }
};
