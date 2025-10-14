import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostCard from "../../../src/components/forum/PostCard.jsx";

jest.mock("../../../src/services/auth/user", () => ({
  __esModule: true,
  getUserDetails: jest.fn(async () => ({
    first_name: "Jane",
    last_name: "Doe",
    profile_picture: "http://img/p.png",
  })),
}));

describe("forum/PostCard", () => {
  const basePost = {
    _id: "1",
    title: "My Plant",
    excerpt: "This plant is amazing",
    created_at: new Date().toISOString(),
    author_id: "u-1",
    image_urls: ["/cover.jpg"],
    plant_name: "Monstera",
    tags: ["care", "soil", "light", "water"],
    upvote_count: 3,
    downvote_count: 1,
    comment_count: 2,
  };

  test("renders title, excerpt, image and tags", async () => {
    render(
      <MemoryRouter>
        <PostCard post={basePost} />
      </MemoryRouter>
    );
    expect(screen.getByText(/my plant/i)).toBeInTheDocument();
    expect(screen.getByText(/amazing/i)).toBeInTheDocument();
    expect(screen.getByText(/monstera/i)).toBeInTheDocument();
    const cover = screen.getByRole("img", { name: /my plant/i });
    expect(cover).toBeInTheDocument();
    // tag truncation indicator
    expect(await screen.findByText(/\+1 more/i)).toBeInTheDocument();
  });

  test("renders author name after fetching details", async () => {
    render(
      <MemoryRouter>
        <PostCard post={basePost} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/jane doe/i)).toBeInTheDocument()
    );
  });

  test("fallback author text when details fail", async () => {
    const { getUserDetails } = await import("../../../src/services/auth/user");
    getUserDetails.mockRejectedValueOnce(new Error("net"));
    render(
      <MemoryRouter>
        <PostCard post={basePost} />
      </MemoryRouter>
    );
    // shows unknown author until fetch resolves
    expect(screen.getByText(/unknown author/i)).toBeInTheDocument();
  });
});
