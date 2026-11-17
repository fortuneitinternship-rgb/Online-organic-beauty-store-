
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Filter from "./Filter";

describe("Filter Component Testing", () => {

  it("should render the select element", () => {
    render(<Filter category="All" setCategory={vi.fn()} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("should display all categories", () => {
    render(<Filter category="All" setCategory={vi.fn()} />);

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    expect(screen.getByText("Skincare")).toBeInTheDocument();
    expect(screen.getByText("Haircare")).toBeInTheDocument();
    expect(screen.getByText("Makeup")).toBeInTheDocument();
    expect(screen.getByText("Body Care")).toBeInTheDocument();
  });

  it("should have filter class", () => {
    render(<Filter category="All" setCategory={vi.fn()} />);

    expect(screen.getByRole("combobox")).toHaveClass("filter");
  });

  it("should display selected category", () => {
    render(<Filter category="Skincare" setCategory={vi.fn()} />);

    expect(screen.getByRole("combobox")).toHaveValue("Skincare");
  });

  it("should call setCategory when category changes", () => {
    const mockSetCategory = vi.fn();

    render(
      <Filter category="All" setCategory={mockSetCategory} />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Haircare" }
    });

    expect(mockSetCategory).toHaveBeenCalledWith("Haircare");
  });

  it("should select Makeup category", () => {
    const mockSetCategory = vi.fn();

    render(
      <Filter category="All" setCategory={mockSetCategory} />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Makeup" }
    });

    expect(mockSetCategory).toHaveBeenCalledWith("Makeup");
  });

});
