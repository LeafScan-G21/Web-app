import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../../src/components/ProtectedRoute.jsx";

jest.mock("../../src/context/AuthContext.jsx", () => ({
  __esModule: true,
  useAuth: () => ({ user: null, loading: false }),
}));

const Guest = () => <div>Guest</div>;
const Secret = () => <div>Secret</div>;

describe("ProtectedRoute extra", () => {
  test("redirects unauthenticated and hides children", () => {
    render(
      <MemoryRouter initialEntries={["/secret"]}>
        <Routes>
          <Route
            path="/secret"
            element={
              <ProtectedRoute>
                <Secret />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Guest />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/guest/i)).toBeInTheDocument();
    expect(screen.queryByText(/secret/i)).not.toBeInTheDocument();
  });
});
