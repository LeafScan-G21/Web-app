import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "@jest/globals";
import DiagnosisLoader from "../src/components/loaders/DiagnosisLoader.jsx";

describe("DiagnosisLoader", () => {
  test("renders title and default message", () => {
    render(<DiagnosisLoader />);
    expect(
      screen.getByRole("heading", { name: /Diagnosing Plant/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Diagnosing plant health...")).toBeInTheDocument();
  });

  test("renders custom message", () => {
    render(<DiagnosisLoader message="Checking..." />);
    expect(screen.getByText("Checking...")).toBeInTheDocument();
  });
  test("shows steps and icons", () => {
    render(<DiagnosisLoader />);
    expect(screen.getByText(/Examining symptoms/i)).toBeInTheDocument();
    expect(screen.getByText(/Running health analysis/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Generating treatment recommendations/i)
    ).toBeInTheDocument();
    expect(document.querySelector('i[data-icon="Stethoscope"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Microscope"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Activity"]')).toBeTruthy();
    expect(document.querySelector('i[data-icon="Pill"]')).toBeTruthy();
  });
});
