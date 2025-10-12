/* eslint-env jest, node */
import {
  addHistoryRecord,
  getUserHistory,
} from "../../../src/services/history/historyService";
import { describe, test, expect, beforeEach } from "@jest/globals";

describe("services/history/historyService", () => {
  beforeEach(() => {
    globalThis.fetch.mockReset();
  });

  test("addHistoryRecord posts JSON and returns parsed data", async () => {
    const payload = { a: 1 };
    globalThis.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ ok: true }),
    });
    const res = await addHistoryRecord(payload);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/history/",
      expect.objectContaining({ method: "POST" })
    );
    expect(res).toEqual({ ok: true });
  });

  test("getUserHistory fetches and returns array", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([{ id: "h1" }]),
    });
    const res = await getUserHistory("u1");
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/history/u1"
    );
    expect(res).toEqual([{ id: "h1" }]);
  });

  test("addHistoryRecord returns null on network error", async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error("net"));
    const res = await addHistoryRecord({ a: 1 });
    expect(res).toBeNull();
  });

  test("getUserHistory returns [] on network error", async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error("net"));
    const res = await getUserHistory("u1");
    expect(res).toEqual([]);
  });
});
