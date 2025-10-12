import { getUserIdFromLocalStorage } from "../../src/utils/auth";

describe("utils/auth.getUserIdFromLocalStorage", () => {
  const KEY = "sb-pxscukkdtytvjvfookbm-auth-token";

  beforeEach(() => {
    localStorage.clear();
  });

  test("returns user id when token with user present", () => {
    const token = { access_token: "t", user: { id: "u-42" } };
    localStorage.setItem(KEY, JSON.stringify(token));
    expect(getUserIdFromLocalStorage()).toBe("u-42");
  });

  test("returns undefined when token missing user", () => {
    localStorage.setItem(KEY, JSON.stringify({ access_token: "t" }));
    expect(getUserIdFromLocalStorage()).toBeUndefined();
  });

  test("returns undefined when token not present", () => {
    expect(getUserIdFromLocalStorage()).toBeUndefined();
  });
});
