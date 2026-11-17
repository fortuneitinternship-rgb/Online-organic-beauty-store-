
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";

import Invoice from "./Invoice";

// Mock InvoiceComponent
vi.mock("../../Components/Invoice/Invoice", () => ({
  default: ({ order }) => (
    <div data-testid="invoice-component">
      {order ? (
        <>
          <h2>Invoice Details</h2>
          <p>Order ID: {order.id}</p>
          <p>Date: {order.date}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>
        </>
      ) : (
        <p>No Order Found</p>
      )}
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

const renderInvoice = (id = "PG101") => {
  return render(
    <MemoryRouter initialEntries={[`/invoice/${id}`]}>
      <Routes>
        <Route path="/invoice/:id" element={<Invoice />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Invoice Component", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("orders", JSON.stringify(mockOrders));
  });

  test("renders Invoice component", () => {
    renderInvoice();

    expect(screen.getByTestId("invoice-component")).toBeInTheDocument();
  });

  test("displays Invoice Details heading", () => {
    renderInvoice();

    expect(screen.getByText("Invoice Details")).toBeInTheDocument();
  });

  test("fetches correct order using URL ID", () => {
    renderInvoice("PG101");

    expect(screen.getByText("Order ID: PG101")).toBeInTheDocument();
  });

  test("displays correct order date", () => {
    renderInvoice("PG101");

    expect(screen.getByText("Date: 2026-11-17")).toBeInTheDocument();
  });

  test("displays correct order total", () => {
    renderInvoice("PG101");

    expect(screen.getByText("Total: ₹1500")).toBeInTheDocument();
  });

  test("displays order status", () => {
    renderInvoice("PG101");

    expect(screen.getByText("Status: Delivered")).toBeInTheDocument();
  });

  test("fetches another order using different URL ID", () => {
    renderInvoice("PG102");

    expect(screen.getByText("Order ID: PG102")).toBeInTheDocument();
    expect(screen.getByText("Total: ₹2500")).toBeInTheDocument();
  });

  test("displays No Order Found for invalid ID", () => {
    renderInvoice("PG999");

    expect(screen.getByText("No Order Found")).toBeInTheDocument();
  });

  test("handles empty orders array", () => {
    localStorage.setItem("orders", JSON.stringify([]));

    renderInvoice();

    expect(screen.getByText("No Order Found")).toBeInTheDocument();
  });

  test("handles missing orders in localStorage", () => {
    localStorage.removeItem("orders");

    renderInvoice();

    expect(screen.getByText("No Order Found")).toBeInTheDocument();
  });

  test("renders section with section class", () => {
    const { container } = renderInvoice();

    expect(container.querySelector(".section")).toBeInTheDocument();
  });
});
