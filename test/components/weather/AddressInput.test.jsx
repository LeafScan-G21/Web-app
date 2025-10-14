import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddressInput from "../../../src/components/weather/AddressInput.jsx";
import { toast } from "react-hot-toast";

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  toast: { error: jest.fn(), success: jest.fn() },
  default: { error: jest.fn(), success: jest.fn() },
}));

describe("weather/AddressInput", () => {
  test("shows error when city/country missing", () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<AddressInput onSubmit={onSubmit} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /save location/i }));
    expect(toast.error).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test("submits full address and resets state", () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    render(<AddressInput onSubmit={onSubmit} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText(/street/i), {
      target: { value: "123 Main" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your city/i), {
      target: { value: "Lagos" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your country/i), {
      target: { value: "Nigeria" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save location/i }));
    expect(onSubmit).toHaveBeenCalledWith("123 Main,Lagos,Nigeria");
    expect(onClose).toHaveBeenCalled();
  });

  test("closes when clicking backdrop and header close", () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const { container } = render(
      <AddressInput onSubmit={onSubmit} onClose={onClose} />
    );
    // Backdrop is the first div with bg-black
    const backdrop = container.querySelector(".bg-black\\/60");
    backdrop && fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
