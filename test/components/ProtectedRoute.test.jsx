import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../src/components/ProtectedRoute";
import { useAuth } from "../../src/context/AuthContext";

jest.mock("../../src/context/AuthContext", () => ({
  __esModule: true,
  useAuth: jest.fn(),
}));

describe("components/ProtectedRoute", () => {
  const ProtectedPage = () => <div>Secret</div>;
  const LoginPage = () => <div>Login</div>;

  const renderWithRoutes = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

  test("renders loading state when loading is true", () => {
    useAuth.mockReturnValue({ user: null, loading: true });
    renderWithRoutes();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("redirects to /login when user is not present", () => {
    useAuth.mockReturnValue({ user: null, loading: false });
    renderWithRoutes();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("renders children when user is present", () => {
    useAuth.mockReturnValue({ user: { id: "u" }, loading: false });
    renderWithRoutes();
    expect(screen.getByText(/secret/i)).toBeInTheDocument();
  });
});
