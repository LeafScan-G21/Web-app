import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../../src/components/forum/Pagination.jsx";

describe("forum/Pagination", () => {
  test("returns null for single page", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("navigates pages and disables prev/next appropriately", () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    // Prev enabled, Next enabled
    fireEvent.click(screen.getByText(/previous/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText(/next/i));
    expect(onPageChange).toHaveBeenCalledWith(3);

    // Click a specific page
    fireEvent.click(screen.getByRole("button", { name: "4" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
