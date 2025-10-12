import React from "react";
import { render, screen } from "@testing-library/react";
import DiseaseDataLoader from "../src/components/loaders/DiseaseDataLoader.jsx";
import { describe, test, expect } from "@jest/globals";

describe("DiseaseDataLoader", () => {
  test("renders title, default message, steps and icons", () => {
    render(<DiseaseDataLoader />);
    // Title
    expect(
      screen.getByRole("heading", { name: /Loading Disease Data/i })
    ).toBeInTheDocument();
    // Default message
    expect(screen.getByText("Loading disease database...")).toBeInTheDocument();
    // Steps
    expect(screen.getByText(/Fetching disease records/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading database entries/i)).toBeInTheDocument();
    expect(screen.getByText(/Preparing search filters/i)).toBeInTheDocument();
    // Icon markers (mocked icons as <i data-icon="...")
    expect(document.querySelector('i[data-icon="Database"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="BarChart3"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Archive"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Search"]')).toBeTruthy();
  });

  test("renders custom message", () => {
    render(<DiseaseDataLoader message="Syncing..." />);
    expect(screen.getByText("Syncing...")).toBeInTheDocument();
  });
});
