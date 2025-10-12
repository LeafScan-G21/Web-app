import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/components/ui/Footer";

describe("Footer", () => {
  test("renders brand name and copyright", () => {
    render(<Footer />);
    expect(screen.getAllByText(/leafscan/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/empowering farmers and gardners/i)
    ).toBeInTheDocument();
  });

  test("renders logo image", () => {
    render(<Footer />);
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });
});
