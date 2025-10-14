/* eslint-env jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import HistoryLoader from "../src/components/loaders/HistoryLoader";

describe("HistoryLoader", () => {
  test("renders title and default message", () => {
    render(<HistoryLoader />);
    expect(
      screen.getByRole("heading", { name: /Loading History/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Loading your history\.\.\./i)).toBeInTheDocument();
  });

  test("renders custom message", () => {
    render(<HistoryLoader message="Custom loading message" />);
    expect(screen.getByText(/Custom loading message/i)).toBeInTheDocument();
  });

  test("renders history-specific loading steps", () => {
    render(<HistoryLoader />);
    expect(
      screen.getByText(/Fetching historical records\.\.\./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Loading past diagnoses\.\.\./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Organizing timeline\.\.\./i)).toBeInTheDocument();
  });

  test("renders with proper styling classes", () => {
    const { container } = render(<HistoryLoader />);
    expect(container.querySelector(".bg-gradient-to-br")).toBeInTheDocument();
  });
});
