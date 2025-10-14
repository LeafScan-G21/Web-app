import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordField from "../src/components/ui/PasswordField.jsx";
import { describe, test, expect } from "@jest/globals";

const noop = () => {};

describe("PasswordField", () => {
  test("toggles password visibility", () => {
    render(
      <PasswordField
        htmlFor="pwd"
        label="Password"
        id="pwd"
        value="secret"
        onChange={noop}
        placeholder="Enter password"
      />
    );

    const input = screen.getByPlaceholderText(/enter password/i);
    expect(input).toHaveAttribute("type", "password");

    // click toggle button
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggle);
    expect(input).toHaveAttribute("type", "password");
  });

  test("shows error when provided", () => {
    render(
      <PasswordField
        htmlFor="pwd"
        label="Password"
        id="pwd"
        value=""
        onChange={noop}
        placeholder="Enter password"
        error="Required"
      />
    );

    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
