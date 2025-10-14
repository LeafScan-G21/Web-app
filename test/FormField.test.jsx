import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormField from "../src/components/ui/FormField.jsx";
import { describe, test, expect, jest } from "@jest/globals";

// Provide a simple test icon component
const MockIcon = (props) => <i data-icon="MockIcon" {...props} />;

describe("FormField", () => {
  test("renders label, input and icon, fires onChange", () => {
    const onChange = jest.fn();
    render(
      <FormField
        htmlFor="email"
        label="Email"
        input_type="email"
        id="email"
        value=""
        placeholder="Enter email"
        Icon={MockIcon}
        onChange={onChange}
      />
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/enter email/i);
    expect(input).toHaveAttribute("type", "email");
    // icon mock present
    expect(document.querySelector('i[data-icon="MockIcon"]')).toBeTruthy();

    fireEvent.change(input, { target: { value: "foo@bar.com" } });
    expect(onChange).toHaveBeenCalled();
  });

  test("renders error", () => {
    render(
      <FormField
        htmlFor="email"
        label="Email"
        input_type="email"
        id="email"
        value=""
        placeholder="Enter email"
        Icon={MockIcon}
        error="Invalid"
      />
    );
    expect(screen.getByText("Invalid")).toBeInTheDocument();
  });
});
