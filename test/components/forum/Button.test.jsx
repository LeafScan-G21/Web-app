import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../src/components/forum/Button.jsx";

describe("forum/Button", () => {
  test("renders children and handles click", () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} variant="default" size="sm">
        Click
      </Button>
    );
    const btn = screen.getByRole("button", { name: /click/i });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  test("applies variant and size classes", () => {
    render(
      <Button variant="outline" size="lg">
        Outline
      </Button>
    );
    const btn = screen.getByRole("button", { name: /outline/i });
    expect(btn.className).toMatch(/border/);
    expect(btn.className).toMatch(/px-8/);
  });
});
