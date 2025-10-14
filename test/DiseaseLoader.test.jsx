import React from "react";
import { render, screen } from "@testing-library/react";
import DiseaseLoader from "../src/components/loaders/DiseaseLoader.jsx";
import { describe, test, expect } from "@jest/globals";

describe("DiseaseLoader", () => {
  test("renders title and default message", () => {
    render(<DiseaseLoader />);
    expect(
      screen.getByRole("heading", { name: /Loading Disease/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Loading disease details...")).toBeInTheDocument();
  });

  test("renders custom message", () => {
    render(<DiseaseLoader message="Loading details..." />);
    expect(screen.getByText("Loading details...")).toBeInTheDocument();
  });
  test("shows steps and icons", () => {
    render(<DiseaseLoader />);
    expect(
      screen.getByText(/Fetching disease information/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Loading symptoms & causes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Preparing care recommendations/i)
    ).toBeInTheDocument();
    expect(document.querySelector('i[data-icon="FileSearch"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Search"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="ClipboardList"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Lightbulb"]')).toBeTruthy();
  });
});
