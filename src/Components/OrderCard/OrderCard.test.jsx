
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import OrderCard from "./OrderCard";

describe("OrderCard Component Testing", () => {

  const mockOrder = {
    id: "PG101",
    date: "2026-11-17",
    total: 1500,
    status: "Delivered",
  };

  it("should render OrderCard component", () => {
    const { container } = render(<OrderCard order={mockOrder} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("should display order ID", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText("Order #PG101")).toBeInTheDocument();
  });

  it("should display order date", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText("Date: 2026-11-17")).toBeInTheDocument();
  });

  it("should display total amount", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText("Total: ₹1500")).toBeInTheDocument();
  });

  it("should display order status", () => {
    render(<OrderCard order={mockOrder} />);

    expect(screen.getByText("Status: Delivered")).toBeInTheDocument();
  });

  it("should have order-card CSS class", () => {
    const { container } = render(<OrderCard order={mockOrder} />);

    expect(container.firstChild).toHaveClass("order-card");
  });

  it("should display Pending status correctly", () => {
    const order = { ...mockOrder, status: "Pending" };

    render(<OrderCard order={order} />);

    expect(screen.getByText("Status: Pending")).toBeInTheDocument();
  });

  it("should display different order totals correctly", () => {
    const order = { ...mockOrder, total: 2500 };

    render(<OrderCard order={order} />);

    expect(screen.getByText("Total: ₹2500")).toBeInTheDocument();
  });

});
