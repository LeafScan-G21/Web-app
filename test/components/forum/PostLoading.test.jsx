import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingAnimation from "../../../src/components/forum/PostLoading.jsx";

describe("forum/PostLoading", () => {
  test("renders loading single post", () => {
    render(<LoadingAnimation multiplePosts={false} />);
    expect(screen.getByText(/loading post/i)).toBeInTheDocument();
    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  });

  test("renders loading multiple posts", () => {
    render(<LoadingAnimation multiplePosts />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
  });
});
