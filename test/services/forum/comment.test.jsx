/* eslint-env jest, node */
import axios from "axios";
import { toast } from "react-hot-toast";
import * as authUtil from "../../../src/utils/auth";
import {
  addComment,
  getCommentsByPostId,
  deleteComment,
  updateComment,
} from "../../../src/services/forum/comment";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

describe("services/forum/comment", () => {
  beforeEach(() => {
    jest.spyOn(authUtil, "getUserIdFromLocalStorage").mockReturnValue("u-1");
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  test("addComment posts and toasts", async () => {
    axios.post.mockResolvedValueOnce({ data: { id: "c1" } });
    const res = await addComment({ content: "hi" });
    expect(axios.post.mock.calls[0][0]).toBe(
      "http://localhost:8000/forum/comment"
    );
    expect(res).toEqual({ id: "c1" });
    expect(toast.success).toHaveBeenCalled();
  });

  test("getCommentsByPostId calls correct url", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: "c1" }] });
    const res = await getCommentsByPostId("p1");
    expect(axios.get.mock.calls[0][0]).toBe(
      "http://localhost:8000/forum/comment/p1"
    );
    expect(res).toEqual([{ id: "c1" }]);
  });

  test("deleteComment and updateComment include user_id param", async () => {
    axios.delete.mockResolvedValueOnce({ data: { ok: true } });
    const del = await deleteComment("c1");
    expect(axios.delete.mock.calls[0][1].params.user_id).toBe("u-1");
    expect(del).toEqual({ ok: true });

    axios.put.mockResolvedValueOnce({ data: { ok: true } });
    const up = await updateComment("c1", "new");
    expect(axios.put.mock.calls[0][1]).toEqual({ content: "new" });
    expect(axios.put.mock.calls[0][2].params.user_id).toBe("u-1");
    expect(up).toEqual({ ok: true });
  });

  test("addComment errors toast and throws", async () => {
    const err = new Error("fail");
    axios.post.mockRejectedValueOnce(err);
    await expect(addComment({ content: "x" })).rejects.toBe(err);
    expect(toast.error).toHaveBeenCalled();
  });

  test("deleteComment errors toast and throws", async () => {
    const err = new Error("fail");
    axios.delete.mockRejectedValueOnce(err);
    await expect(deleteComment("c1")).rejects.toBe(err);
    expect(toast.error).toHaveBeenCalled();
  });

  test("updateComment errors toast and throws", async () => {
    const err = new Error("fail");
    axios.put.mockRejectedValueOnce(err);
    await expect(updateComment("c1", "x")).rejects.toBe(err);
    expect(toast.error).toHaveBeenCalled();
  });
});
