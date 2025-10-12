import {
  addHistoryRecord,
  getUserHistory,
} from "../../../src/services/history/historyService";

describe("historyService extra", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn();
    localStorage.setItem(
      "sb-pxscukkdtytvjvfookbm-auth-token",
      JSON.stringify({ access_token: "t", user: { id: "u1" } })
    );
  });

  test("addHistoryRecord returns null on network error", async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error("net"));
    const res = await addHistoryRecord({ foo: 1 });
    expect(res).toBeNull();
  });

  test("getUserHistory returns [] on error", async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error("net"));
    const res = await getUserHistory("u1");
    expect(res).toEqual([]);
  });
});
