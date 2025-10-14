import axios from "axios";
import { addPostVote } from "../../../src/services/forum/vote";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  toast: { error: jest.fn(), success: jest.fn() },
  default: { error: jest.fn(), success: jest.fn() },
}));

describe("services/forum vote extra", () => {
  test("addPostVote throws on error", async () => {
    axios.post.mockRejectedValueOnce(new Error("fail"));
    await expect(addPostVote("p1", "upvote")).rejects.toThrow("fail");
  });
});
