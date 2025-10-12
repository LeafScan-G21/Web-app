/* global jest */
require("@testing-library/jest-dom");

// Optional: mock lucide-react icons to simple components to avoid SVG issues
jest.mock("lucide-react", () => {
  const React = require("react");
  const handler = {
    get:
      (_target, prop) =>
      (props = {}) =>
        React.createElement("i", {
          ...props,
          "data-icon": String(prop),
        }),
  };
  return new Proxy({}, handler);
});

// Robust axios mock that supports default and named imports
jest.mock("axios", () => {
  const mock = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  return {
    __esModule: true,
    default: mock,
    ...mock,
  };
});

// Provide defaults used by services (consumed via babel-plugin-transform-vite-meta-env)
process.env.VITE_BACKEND_URL =
  process.env.VITE_BACKEND_URL || "http://localhost:8000";
process.env.VITE_SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "https://example.supabase.co";
process.env.VITE_SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || "anon-key";

// Default fetch mock so tests can override per-case
global.fetch = jest.fn();

// Mock react-hot-toast to avoid side effects in tests
jest.mock("react-hot-toast", () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Basic localStorage shim values used by forum services
const authKey = "sb-pxscukkdtytvjvfookbm-auth-token";
if (!global.localStorage) {
  const store = new Map();
  global.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
  };
}
// Ensure a token exists by default (tests can override per-case)
localStorage.setItem(
  authKey,
  JSON.stringify({ access_token: "test-token", user: { id: "u-1" } })
);

// Polyfill TextEncoder/TextDecoder for libraries (e.g., react-router) expecting them in jsdom
try {
  const { TextEncoder, TextDecoder } = require("util");
  if (typeof global.TextEncoder === "undefined") {
    global.TextEncoder = TextEncoder;
  }
  if (typeof global.TextDecoder === "undefined") {
    global.TextDecoder = TextDecoder;
  }
} catch (_) {
  // ignore if util isn't available
}
