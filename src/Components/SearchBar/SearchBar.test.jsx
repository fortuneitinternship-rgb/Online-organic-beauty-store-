
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import SearchBar from "./SearchBar";

describe("SearchBar Component Testing", () => {

  it("should render SearchBar component", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should display correct placeholder text", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(
      screen.getByPlaceholderText("Search organic beauty products...")
    ).toBeInTheDocument();
  });

  it("should have search-input CSS class", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toHaveClass("search-input");
  });

  it("should display the given input value", () => {
    render(<SearchBar value="Face Cream" onChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toHaveValue("Face Cream");
  });

  it("should call onChange when user types", () => {
    const mockOnChange = vi.fn();

    render(<SearchBar value="" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Organic Soap" }
    });

    expect(mockOnChange).toHaveBeenCalledWith("Organic Soap");
  });

  it("should call onChange with updated search text", () => {
    const mockOnChange = vi.fn();

    render(<SearchBar value="Cream" onChange={mockOnChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Face Cream" }
    });

    expect(mockOnChange).toHaveBeenCalledWith("Face Cream");
  });

  it("should accept empty search value", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("should use text input type", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

});
