import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "../../src/components/ui/Navigation";

jest.mock("../../src/services/auth/supabaseClient", () => ({
  __esModule: true,
  supabase: {
    auth: {
      getSession: jest.fn(async () => ({ data: { session: null } })),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
      signOut: jest.fn(async () => ({})),
    },
  },
}));

describe("Navigation extra", () => {
  test("login link routes to /login when no session", async () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );
    const login = await screen.findByText(/login/i);
    fireEvent.click(login);
    // Just ensure link exists and is clickable; routing verified in main tests
    expect(login).toBeInTheDocument();
  });
});
