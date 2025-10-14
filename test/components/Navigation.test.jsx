import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "../../src/components/ui/Navigation";

// Mock supabase client methods used in the component
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

describe("components/Navigation", () => {
  test("renders guest nav with Login and Get Started when no session", async () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Wait for initial effect to complete
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get started/i })
    ).toBeInTheDocument();
  });

  test("shows user nav when session exists and toggles dropdown", async () => {
    const { supabase } = await import("../../src/services/auth/supabaseClient");
    supabase.auth.getSession.mockResolvedValueOnce({
      data: { session: { user: { id: "u" } } },
    });

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Links for authenticated user
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/diagnosis/i)).toBeInTheDocument();
    expect(screen.getByText(/community/i)).toBeInTheDocument();

    // Toggle the dropdown (button has an avatar and chevron)
    const toggle = screen
      .getAllByRole("button")
      .find((b) => b.querySelector("i[data-icon='ChevronDown']"));
    fireEvent.click(toggle);
    await waitFor(() =>
      expect(screen.getByText(/my account/i)).toBeInTheDocument()
    );

    // Logout click closes dropdown
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
  });

  test("dropdown closes on outside click", async () => {
    const { supabase } = await import("../../src/services/auth/supabaseClient");
    supabase.auth.getSession.mockResolvedValueOnce({
      data: { session: { user: { id: "u" } } },
    });
    const { container } = render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    // Ensure authenticated links are rendered before looking for the dropdown toggle
    await screen.findByText(/dashboard/i);

    // Find the profile dropdown toggle button (has ChevronDown icon)
    const toggleBtn = screen
      .getAllByRole("button")
      .find((b) => b.querySelector("i[data-icon='ChevronDown']"));
    fireEvent.click(toggleBtn);
    await screen.findByText(/my account/i);

    // click outside the dropdown container
    fireEvent.mouseDown(container);
    await waitFor(() =>
      expect(screen.queryByText(/my account/i)).not.toBeInTheDocument()
    );
  });
});
