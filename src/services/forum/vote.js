import axios from "axios";
import { getUserIdFromLocalStorage } from "../../utils/auth";
const FORUM_URL = `${import.meta.env.VITE_BACKEND_URL}/forum`;
// const FORUM_URL = "http://localhost:8003";

const currentUserId = getUserIdFromLocalStorage();
const authData = JSON.parse(
  localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token") || "{}"
);
const token = authData?.access_token || "";

export const addPostVote = async (postId, vote_type) => {
  try {
    const response = await axios.post(
      `${FORUM_URL}/vote`,
      {
        user_id: currentUserId || "currentUserId", // replace with actual user ID
        target_type: "post",
        target_id: postId,
        vote_type: vote_type,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error voting on post:", error);
    throw error;
  }
};

export const removePostVote = async (target_id) => {
  try {
    const response = await axios.delete(`${FORUM_URL}/vote`, {
      params: {
        user_id: currentUserId || "currentUserId", // replace with actual user ID
        target_type: "post",
        target_id: target_id,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing post vote:", error);
    throw error;
  }
};

export const togglePostVote = async (postId) => {
  try {
    const response = await axios.put(
      `${FORUM_URL}/vote/toggle`,
      {},
      {
        params: {
          user_id: currentUserId || "currentUserId", // replace with actual user ID
          target_type: "post",
          target_id: postId,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling post vote:", error);
    throw error;
  }
};

export const hasVotedOnPost = async (postId) => {
  try {
    const response = await axios.get(`${FORUM_URL}/vote/check`, {
      params: {
        user_id: currentUserId || "currentUserId", // replace with actual user ID
        target_type: "post",
        target_id: postId,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking if user has voted on post:", error);
    throw error;
  }
};

export const addCommentVote = async (commentId, vote_type) => {
  try {
    const response = await axios.post(
      `${FORUM_URL}/vote`,
      {
        user_id: currentUserId || "currentUserId", // replace with actual user ID
        target_type: "comment",
        target_id: commentId,
        vote_type: vote_type,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error voting on comment:", error);
    throw error;
  }
};

export const removeCommentVote = async (target_id) => {
  try {
    const response = await axios.delete(`${FORUM_URL}/vote`, {
      params: {
        user_id: currentUserId || "currentUserId", // replace with actual user ID
        target_type: "comment",
        target_id: target_id,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing comment vote:", error);
    throw error;
  }
};

export const toggleCommentVote = async (commentId) => {
  try {
    const response = await axios.put(
      `${FORUM_URL}/vote/toggle`,
      {},
      {
        params: {
          user_id: currentUserId || "currentUserId", // replace with actual user ID
          target_type: "comment",
          target_id: commentId,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling comment vote:", error);
    throw error;
  }
};

export const hasVotedOnComment = async (commentId) => {
  try {
    const response = await axios.get(`${FORUM_URL}/vote/check`, {
      params: {
        user_id: currentUserId || "currentUserId", // replace with actual user ID
        target_type: "comment",
        target_id: commentId,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking if user has voted on comment:", error);
    throw error;
  }
};
