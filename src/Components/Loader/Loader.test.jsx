
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Loader from "./Loader";

describe("Loader Component Testing", () => {

  it("should render Loader component", () => {
    render(<Loader />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display Loading text", () => {
    render(<Loader />);

    expect(screen.getByText("Loading...")).toHaveTextContent("Loading...");
  });

  it("should have loader CSS class", () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toHaveClass("loader");
  });

  it("should render only one loader element", () => {
    const { container } = render(<Loader />);

    expect(container.querySelectorAll(".loader")).toHaveLength(1);
  });

  it("should render loader as a div element", () => {
    const { container } = render(<Loader />);

    expect(container.firstChild.tagName).toBe("DIV");
  });

});
