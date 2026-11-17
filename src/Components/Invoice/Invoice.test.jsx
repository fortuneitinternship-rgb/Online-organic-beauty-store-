
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Invoice from "./Invoice";

describe("Invoice Component Testing", () => {

  beforeEach(() => {
    window.print = vi.fn();
  });

  it("should render invoice component", () => {
    render(<Invoice order={{}} />);

    expect(screen.getByText("Invoice")).toBeInTheDocument();
  });

  it("should display brand name", () => {
    render(<Invoice order={{}} />);

    expect(screen.getByText("PURE GLOW")).toBeInTheDocument();
  });

  it("should display default order ID", () => {
    render(<Invoice order={{}} />);

    expect(screen.getByText("Order ID: #PG001")).toBeInTheDocument();
  });

  it("should display custom order ID", () => {
    render(<Invoice order={{ id: "PG101" }} />);

    expect(screen.getByText("Order ID: #PG101")).toBeInTheDocument();
  });

  it("should display default date", () => {
    render(<Invoice order={{}} />);

    expect(screen.getByText("Date: 2026-10-08")).toBeInTheDocument();
  });

  it("should display custom date", () => {
    render(<Invoice order={{ date: "2026-11-17" }} />);

    expect(screen.getByText("Date: 2026-11-17")).toBeInTheDocument();
  });

  it("should display total amount", () => {
    render(<Invoice order={{ total: 1500 }} />);

    expect(screen.getByText("Total Amount: ₹1500")).toBeInTheDocument();
  });

  it("should display zero as default total", () => {
    render(<Invoice order={{}} />);

    expect(screen.getByText("Total Amount: ₹0")).toBeInTheDocument();
  });

  it("should render Print Invoice button", () => {
    render(<Invoice order={{}} />);

    expect(
      screen.getByRole("button", { name: "Print Invoice" })
    ).toBeInTheDocument();
  });

  it("should call window.print when button is clicked", () => {
    render(<Invoice order={{}} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Print Invoice" })
    );

    expect(window.print).toHaveBeenCalledTimes(1);
  });

  it("should have invoice CSS class", () => {
    const { container } = render(<Invoice order={{}} />);

    expect(container.firstChild).toHaveClass("invoice");
  });

});
