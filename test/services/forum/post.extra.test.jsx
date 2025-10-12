import axios from "axios";
import { toast } from "react-hot-toast";
import { createPost, getPostById } from "../../../src/services/forum/post";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  toast: { error: jest.fn(), success: jest.fn() },
  default: { error: jest.fn(), success: jest.fn() },
}));

describe("services/forum post extra", () => {
  test("createPost throws and toasts on error", async () => {
    axios.post.mockRejectedValueOnce(new Error("fail"));
    await expect(createPost({ title: "t" })).rejects.toThrow("fail");
    expect(toast.error).toHaveBeenCalled();
  });

  test("getPostById throws on error", async () => {
    axios.get.mockRejectedValueOnce(new Error("fail"));
    await expect(getPostById("p1")).rejects.toThrow("fail");
  });
});
