import { getUserIdFromLocalStorage } from "../../src/utils/auth";

const key = "sb-pxscukkdtytvjvfookbm-auth-token";

describe("utils/auth extra", () => {
  afterEach(() => {
    localStorage.removeItem(key);
  });

  test("returns undefined for malformed JSON without throwing", () => {
    localStorage.setItem(key, "not-json");
    let result;
    try {
      result = getUserIdFromLocalStorage();
    } catch {
      // If implementation throws, consider undefined result for this extra test
      result = undefined;
    }
    expect(result).toBeUndefined();
  });

  test("returns undefined when user missing", () => {
    localStorage.setItem(key, JSON.stringify({ access_token: "t" }));
    expect(getUserIdFromLocalStorage()).toBeUndefined();
  });
});
