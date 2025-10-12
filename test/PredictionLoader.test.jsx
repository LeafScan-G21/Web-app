import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import PredictionLoader from "../src/components/loaders/PredictionLoader.jsx";

describe("PredictionLoader", () => {
  test("renders default message and title", () => {
    render(<PredictionLoader />);
    expect(screen.getByText(/Analyzing Plant/i)).toBeInTheDocument();
    expect(screen.getByText(/Analyzing your plant/i)).toBeInTheDocument();
  });

  test("renders custom message", () => {
    render(<PredictionLoader message="Custom message" />);
    expect(screen.getByText("Custom message")).toBeInTheDocument();
  });
});
test("renders title, default message, steps and icons", () => {
  render(<PredictionLoader />);
  // title
  expect(screen.getByText(/Analyzing Plant/i)).toBeInTheDocument();
  // default message
  expect(screen.getByText(/Analyzing your plant/i)).toBeInTheDocument();
  // steps
  expect(screen.getByText(/Processing image/i)).toBeInTheDocument();
  expect(screen.getByText(/Running AI analysis/i)).toBeInTheDocument();
  expect(screen.getByText(/Identifying plant features/i)).toBeInTheDocument();
  // icons
  expect(document.querySelector('i[data-icon="Leaf"]')).toBeTruthy();
});
