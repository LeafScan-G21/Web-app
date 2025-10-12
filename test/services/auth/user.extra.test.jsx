import axios from "axios";
import { getUserDetails } from "../../../src/services/auth/user";

describe("services/auth user extra", () => {
  test("getUserDetails returns parsed user details on success", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        user: {
          user_metadata: {
            avatar_url: "http://img",
            full_name: "John Doe",
          },
        },
      },
    });
    const res = await getUserDetails("u1");
    expect(res).toEqual({
      profilePic: "http://img",
      first_name: "John",
      last_name: "Doe",
    });
  });

  test("getUserDetails throws on error", async () => {
    axios.post.mockRejectedValueOnce(new Error("network"));
    await expect(getUserDetails("u1")).rejects.toThrow("network");
  });
});
