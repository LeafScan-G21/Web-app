import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../../src/components/forum/Input.jsx";

describe("forum/Input", () => {
  test("renders input with type and placeholder", () => {
    render(<Input type="email" placeholder="Enter email" />);
    const input = screen.getByPlaceholderText(/enter email/i);
    expect(input).toHaveAttribute("type", "email");
  });

  test("allows typing value", () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText(/type here/i);
    fireEvent.change(input, { target: { value: "hello" } });
    expect(input).toHaveValue("hello");
  });
});
