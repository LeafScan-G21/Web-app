/* eslint-env jest, node */
/* eslint-env jest, node */
import axios from "axios";
import { getUserDetails } from "../../../src/services/auth/user";
import { describe, test, expect, beforeEach } from "@jest/globals";

// axios is mocked in setupTests

describe("services/auth/user.getUserDetails", () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test("returns parsed user details when metadata exists", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        user: {
          user_metadata: {
            avatar_url: "http://img/avatar.png",
            full_name: "Jane Doe",
          },
        },
      },
    });

    const res = await getUserDetails("uid-1");
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/auth/get-user/",
      { user_id: "uid-1" },
      expect.objectContaining({ withCredentials: true })
    );
    expect(res).toEqual({
      profilePic: "http://img/avatar.png",
      first_name: "Jane",
      last_name: "Doe",
    });
  });

  test("returns undefined if no user_metadata", async () => {
    axios.post.mockResolvedValueOnce({ data: { user: {} } });
    const res = await getUserDetails("uid-2");
    expect(res).toBeUndefined();
  });

  test("throws when axios fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("network"));
    await expect(getUserDetails("uid-3")).rejects.toThrow("network");
  });
});
