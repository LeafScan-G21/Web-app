/* global jest */
import "@testing-library/jest-dom";
import React from "react";

// Optional: mock lucide-react icons to simple components to avoid SVG issues
jest.mock("lucide-react", () => {
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
