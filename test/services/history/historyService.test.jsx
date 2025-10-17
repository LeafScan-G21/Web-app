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
    // Assert path suffix to align with configurable base URL
    const [calledUrl, options] = globalThis.fetch.mock.calls[0];
    expect(calledUrl).toMatch(/\/history\/?$/);
    expect(options).toEqual(expect.objectContaining({ method: "POST" }));
    expect(res).toEqual({ ok: true });
  });

  test("getUserHistory fetches and returns array", async () => {
    const payload = [{ id: "h1" }];
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: "OK",
      headers: { get: () => "application/json" },
      json: () => Promise.resolve(payload),
    });
    const res = await getUserHistory("u1");
    const [calledUrl2] = globalThis.fetch.mock.calls[0];
    expect(calledUrl2).toMatch(/\/history\/u1$/);
    expect(res).toEqual(payload);
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
