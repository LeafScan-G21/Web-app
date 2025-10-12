import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FullWidthButton from "../src/components/ui/FullWidthButton.jsx";
import { describe, test, expect, jest } from "@jest/globals";

describe("FullWidthButton", () => {
  test("renders body and handles click", () => {
    const onClick = jest.fn();
    render(<FullWidthButton body="Click Me" onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
