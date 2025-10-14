/* eslint-env jest, node */
import axios from "axios";
import * as authUtil from "../../../src/utils/auth";
import {
  addPostVote,
  removePostVote,
  togglePostVote,
  hasVotedOnPost,
  addCommentVote,
  removeCommentVote,
  toggleCommentVote,
  hasVotedOnComment,
} from "../../../src/services/forum/vote";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";

jest.mock("axios");

describe("services/forum/vote", () => {
  beforeEach(() => {
    jest.spyOn(authUtil, "getUserIdFromLocalStorage").mockReturnValue("u-1");
    axios.get.mockReset();
    axios.post.mockReset();
    axios.put.mockReset();
    axios.delete.mockReset();
  });

  test("post vote flows", async () => {
    axios.post.mockResolvedValueOnce({ data: { ok: true } });
    const a = await addPostVote("p1", "upvote");
    expect(a).toEqual({ ok: true });

    axios.delete.mockResolvedValueOnce({ data: { ok: true } });
    const b = await removePostVote("p1");
    expect(b).toEqual({ ok: true });

    axios.put.mockResolvedValueOnce({ data: { toggled: true } });
    const c = await togglePostVote("p1");
    expect(c).toEqual({ toggled: true });

    axios.get.mockResolvedValueOnce({ data: { voted: true } });
    const d = await hasVotedOnPost("p1");
    expect(d).toEqual({ voted: true });
  });

  test("comment vote flows", async () => {
    axios.post.mockResolvedValueOnce({ data: { ok: true } });
    const a = await addCommentVote("c1", "upvote");
    expect(a).toEqual({ ok: true });

    axios.delete.mockResolvedValueOnce({ data: { ok: true } });
    const b = await removeCommentVote("c1");
    expect(b).toEqual({ ok: true });

    axios.put.mockResolvedValueOnce({ data: { toggled: true } });
    const c = await toggleCommentVote("c1");
    expect(c).toEqual({ toggled: true });

    axios.get.mockResolvedValueOnce({ data: { voted: false } });
    const d = await hasVotedOnComment("c1");
    expect(d).toEqual({ voted: false });
  });
});
