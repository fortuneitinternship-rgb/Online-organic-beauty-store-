
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";

import MyOrders from "./MyOrders";

vi.mock("../../Components/OrderCard/OrderCard", () => ({
  default: ({ order }) => (
    <div data-testid="order-card">
      <h2>{order.id}</h2>
      <p>{order.date}</p>
      <p>₹{order.total}</p>
      <p>{order.status}</p>
    </div>
  ),
}));

const mockOrders = [
  {
    id: "PG101",
    date: "2026-11-17",
    total: 1500,
    status: "Delivered",
  },
  {
    id: "PG102",
    date: "2026-11-16",
    total: 2500,
    status: "Order Placed",
  },
];

const renderMyOrders = () =>
  render(
    <MemoryRouter>
      <MyOrders />
    </MemoryRouter>
  );

describe("MyOrders Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders My Orders heading", () => {
    renderMyOrders();
    expect(screen.getByRole("heading", { name: "My Orders" })).toBeInTheDocument();
  });

  test("shows empty message when no orders exist", () => {
    renderMyOrders();
    expect(screen.getByText("No orders yet")).toBeInTheDocument();
  });

  test("shows Start Shopping link", () => {
    renderMyOrders();
    expect(screen.getByRole("link", { name: "Start Shopping" })).toHaveAttribute("href", "/search");
  });

  test("shows empty box class", () => {
    const { container } = renderMyOrders();
    expect(container.querySelector(".empty-box")).toBeInTheDocument();
  });

  test("renders order cards", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getAllByTestId("order-card")).toHaveLength(2);
  });

  test("displays first order ID", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getByText("PG101")).toBeInTheDocument();
  });

  test("displays second order ID", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getByText("PG102")).toBeInTheDocument();
  });

  test("displays order dates", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getByText("2026-11-17")).toBeInTheDocument();
    expect(screen.getByText("2026-11-16")).toBeInTheDocument();
  });

  test("displays order totals", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getByText("₹1500")).toBeInTheDocument();
    expect(screen.getByText("₹2500")).toBeInTheDocument();
  });

  test("displays order statuses", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getByText("Delivered")).toBeInTheDocument();
    expect(screen.getByText("Order Placed")).toBeInTheDocument();
  });

  test("shows View Details links", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    expect(screen.getAllByRole("link", { name: "View Details" })).toHaveLength(2);
  });

  test("first order details link has correct URL", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    const links = screen.getAllByRole("link", { name: "View Details" });
    expect(links[0]).toHaveAttribute("href", "/order/PG101");
  });

  test("second order details link has correct URL", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    renderMyOrders();
    const links = screen.getAllByRole("link", { name: "View Details" });
    expect(links[1]).toHaveAttribute("href", "/order/PG102");
  });

  test("renders section class", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));
    const { container } = renderMyOrders();
    expect(container.querySelector(".section")).toBeInTheDocument();
  });
});
