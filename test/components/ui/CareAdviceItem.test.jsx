import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CareAdviceItem from "../../../src/components/ui/CareAdviceItem";

describe("CareAdviceItem", () => {
  test("renders advice with markdown bold parsed", () => {
    const item = { advice: "Keep **soil** moist" };
    render(<CareAdviceItem item={item} index={0} />);
    expect(screen.getByText(/keep/i)).toBeInTheDocument();
    // Bold content should be rendered as strong
    const strong = screen.getByText(/soil/i).closest("strong");
    expect(strong).toBeInTheDocument();
  });

  test("parses LaTeX-like temperature notation", () => {
    const item = { advice: "Maintain $25^{\\circ} \\text{C}$ indoors" };
    render(<CareAdviceItem item={item} index={1} />);
    expect(screen.getByText(/25°c/i)).toBeInTheDocument();
  });

  test("shows chevron and toggles relevance reason when provided", () => {
    const item = { advice: "Water daily", relevance_reason: "Prevents wilt" };
    const { container } = render(<CareAdviceItem item={item} index={2} />);
    // Chevron exists as mocked lucide-react <i data-icon="ChevronDown" />
    expect(container.querySelector("i[data-icon='ChevronDown']")).toBeTruthy();
    // Initially relevance container is collapsed via class
    const collapseEl = container.querySelector(
      ".transition-all.duration-300.ease-in-out"
    );
    expect(collapseEl).toHaveClass("max-h-0");
    // Click to expand (click on the container area)
    fireEvent.click(screen.getByText(/water daily/i));
    expect(collapseEl).not.toHaveClass("max-h-0");
    // Collapse again
    fireEvent.click(screen.getByText(/water daily/i));
    expect(collapseEl).toHaveClass("max-h-0");
  });

  test("no toggle when relevance_reason missing", () => {
    const item = { advice: "Trim leaves" };
    render(<CareAdviceItem item={item} index={3} />);
    // No reason section appears even on click
    fireEvent.click(screen.getByText(/trim leaves/i));
    expect(screen.queryByText(/why it's important/i)).not.toBeInTheDocument();
  });
});
