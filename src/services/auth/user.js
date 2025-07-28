import axios from "axios";
//import { toast } from "react-hot-toast";

const AUTH_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${AUTH_URL}/users/user/${userId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    //toast.error("Failed to fetch user details");
    throw error;
  }
};
