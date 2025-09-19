import axios from "axios";
//import { toast } from "react-hot-toast";

const AUTH_URL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.post(
      `${AUTH_URL}/get-user/`,
      {
        user_id: userId,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);

    if (response.data.user?.user_metadata) {
      const profilePic = response.data.user.user_metadata.avatar_url;
      const full_name = response.data.user.user_metadata.full_name;
      const first_name = full_name ? full_name.split(" ")[0] : "User";
      const last_name = full_name
        ? full_name.split(" ").slice(1).join(" ")
        : "";
      return { profilePic, first_name, last_name };
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    //toast.error("Failed to fetch user details");
    throw error;
  }
};
