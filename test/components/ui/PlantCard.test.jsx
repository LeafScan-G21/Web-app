import React from "react";
import { render, screen } from "@testing-library/react";
import PlantCard from "../../../src/components/ui/PlantCard";

describe("PlantCard", () => {
  const plant = {
    name: "Rose",
    description: "A beautiful flower",
    image: "/img/rose.jpg",
  };

  test("renders plant name, description and image", () => {
    render(<PlantCard plant={plant} index={0} />);
    expect(screen.getByText(/rose/i)).toBeInTheDocument();
    expect(screen.getByText(/beautiful flower/i)).toBeInTheDocument();
    const img = screen.getByRole("img", { name: /rose/i });
    expect(img).toHaveAttribute("src", plant.image);
  });

  test("uses index in key stability (smoke)", () => {
    // Smoke test ensures component accepts index prop without crashing
    render(<PlantCard plant={plant} index={3} />);
    expect(screen.getByText(/rose/i)).toBeInTheDocument();
  });
});
