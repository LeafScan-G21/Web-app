/* eslint-env jest, node */
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  uploadpostImages,
  searchPosts,
  getSearchPostCount,
  deepSearchPosts,
  getDeepSearchPostCount,
  getRelatedPosts,
} from "../../../src/services/forum/post";
import { describe, test, expect, beforeEach } from "@jest/globals";

// axios and react-hot-toast are mocked in setupTests

describe("services/forum/post", () => {
  beforeEach(async () => {
    // default token in setupTests is present; ensure user id
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  test("getLatestPosts returns data", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const data = await getLatestPosts(0, 10);
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:8000/forum/post/latest",
      expect.objectContaining({ params: { start: 0, limit: 10 } })
    );
    expect(data).toEqual([{ id: 1 }]);
  });

  test("createPost posts and toasts on success", async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 5 } });
    const res = await createPost({ title: "t" });
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/forum/post",
      { title: "t" },
      expect.any(Object)
    );
    expect(res).toEqual({ id: 5 });
    expect(toast.success).toHaveBeenCalled();
  });

  test("updatePost and deletePost include user_id param", async () => {
    axios.put.mockResolvedValueOnce({ data: { ok: true } });
    const up = await updatePost("p1", { body: "x" });
    expect(axios.put.mock.calls[0][0]).toBe(
      "http://localhost:8000/forum/post/p1"
    );
    expect(axios.put.mock.calls[0][2].params.user_id).toBe("u-1");
    expect(up).toEqual({ ok: true });

    axios.delete.mockResolvedValueOnce({ data: { ok: true } });
    const del = await deletePost("p1");
    expect(axios.delete.mock.calls[0][0]).toBe(
      "http://localhost:8000/forum/post/p1"
    );
    expect(axios.delete.mock.calls[0][1].params.user_id).toBe("u-1");
    expect(del).toEqual({ ok: true });
  });

  test("uploadpostImages sends FormData", async () => {
    axios.post.mockResolvedValueOnce({ data: { urls: ["u"] } });
    const file = new File(["x"], "a.png");
    const res = await uploadpostImages([file]);
    expect(axios.post.mock.calls[0][0]).toBe(
      "http://localhost:8000/forum/upload"
    );
    // headers multipart
    expect(axios.post.mock.calls[0][2].headers["Content-Type"]).toMatch(
      /multipart\/form-data/
    );
    expect(res).toEqual({ urls: ["u"] });
  });

  test("search helpers call proper endpoints", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [1] }) // searchPosts
      .mockResolvedValueOnce({ data: 3 }) // getSearchPostCount
      .mockResolvedValueOnce({ data: [2] }) // deepSearchPosts
      .mockResolvedValueOnce({ data: 4 }); // getDeepSearchPostCount

    const a = await searchPosts("q", 0, 10);
    const b = await getSearchPostCount("q");
    const c = await deepSearchPosts("q", 0, 10);
    const d = await getDeepSearchPostCount("q");

    expect(a).toEqual([1]);
    expect(b).toEqual(3);
    expect(c).toEqual([2]);
    expect(d).toEqual(4);
  });

  test("getRelatedPosts uses tags and plant_name params", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: "rel" }] });
    const res = await getRelatedPosts(["a", "b"], "rose");
    expect(axios.get.mock.calls[0][0]).toBe(
      "http://localhost:8000/forum/post/related"
    );
    expect(axios.get.mock.calls[0][1].params).toEqual({
      tags: "a,b",
      plant_name: "rose",
    });
    expect(res).toEqual([{ id: "rel" }]);
  });
});
