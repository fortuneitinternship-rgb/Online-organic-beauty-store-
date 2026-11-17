
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button Component Testing", () => {

  it("should render button correctly", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole("button", { name: "Click Me" }))
      .toBeInTheDocument();
  });

  it("should display children text", () => {
    render(<Button>Submit</Button>);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should have default type button", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole("button"))
      .toHaveAttribute("type", "button");
  });

  it("should accept submit type", () => {
    render(<Button type="submit">Submit</Button>);

    expect(screen.getByRole("button"))
      .toHaveAttribute("type", "submit");
  });

  it("should have main-btn class", () => {
    render(<Button>Click Me</Button>);

    expect(screen.getByRole("button"))
      .toHaveClass("main-btn");
  });

});
