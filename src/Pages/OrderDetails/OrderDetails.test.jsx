
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";

import OrderDetails from "./OrderDetails";

// Sample order data
const mockOrders = [
  {
    id: "PG101",
    date: "2026-11-17",
    status: "Delivered",
    payment: "UPI",
    address: "Hyderabad, Telangana",
    items: [
      {
        id: 1,
        name: "Organic Face Cream",
        price: 500,
        quantity: 2,
      },
      {
        id: 2,
        name: "Organic Hair Oil",
        price: 300,
        quantity: 1,
      },
    ],
    total: 1300,
  },
];

const renderOrderDetails = (id = "PG101") => {
  return render(
    <MemoryRouter initialEntries={[`/order/${id}`]}>
      <Routes>
        <Route path="/order/:id" element={<OrderDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("OrderDetails Component Testing", () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("orders", JSON.stringify(mockOrders));
  });

  test("1. Renders Order Details heading", () => {
    renderOrderDetails();

    expect(
      screen.getByRole("heading", { name: "Order Details" })
    ).toBeInTheDocument();
  });

  test("2. Displays correct order ID", () => {
    renderOrderDetails();

    expect(
      screen.getByRole("heading", { name: "Order #PG101" })
    ).toBeInTheDocument();
  });

  test("3. Displays order date", () => {
    renderOrderDetails();

    expect(screen.getByText("Date: 2026-11-17")).toBeInTheDocument();
  });

  test("4. Displays order status", () => {
    renderOrderDetails();

    expect(screen.getByText("Status: Delivered")).toBeInTheDocument();
  });

  test("5. Displays payment method", () => {
    renderOrderDetails();

    expect(screen.getByText("Payment: UPI")).toBeInTheDocument();
  });

  test("6. Displays delivery address", () => {
    renderOrderDetails();

    expect(
      screen.getByText("Address: Hyderabad, Telangana")
    ).toBeInTheDocument();
  });

  test("7. Displays Products heading", () => {
    renderOrderDetails();

    expect(
      screen.getByRole("heading", { name: "Products" })
    ).toBeInTheDocument();
  });

  test("8. Displays first product details", () => {
    renderOrderDetails();

    expect(
      screen.getByText("Organic Face Cream × 2 — ₹1000")
    ).toBeInTheDocument();
  });

  test("9. Displays second product details", () => {
    renderOrderDetails();

    expect(
      screen.getByText("Organic Hair Oil × 1 — ₹300")
    ).toBeInTheDocument();
  });

  test("10. Displays total amount", () => {
    renderOrderDetails();

    expect(screen.getByText("Total: ₹1300")).toBeInTheDocument();
  });

  test("11. Displays View Invoice link", () => {
    renderOrderDetails();

    expect(
      screen.getByRole("link", { name: "View Invoice" })
    ).toBeInTheDocument();
  });

  test("12. View Invoice link has correct URL", () => {
    renderOrderDetails();

    expect(
      screen.getByRole("link", { name: "View Invoice" })
    ).toHaveAttribute("href", "/invoice/PG101");
  });

  test("13. Displays order-card CSS class", () => {
    const { container } = renderOrderDetails();

    expect(container.querySelector(".order-card")).toBeInTheDocument();
  });

  test("14. Displays section CSS class", () => {
    const { container } = renderOrderDetails();

    expect(container.querySelector(".section")).toBeInTheDocument();
  });

  test("15. Displays Order not found for invalid ID", () => {
    renderOrderDetails("PG999");

    expect(screen.getByText("Order not found.")).toBeInTheDocument();
  });

  test("16. Displays Order not found when orders are empty", () => {
    localStorage.setItem("orders", JSON.stringify([]));

    renderOrderDetails();

    expect(screen.getByText("Order not found.")).toBeInTheDocument();
  });

  test("17. Displays Order not found when localStorage has no orders", () => {
    localStorage.removeItem("orders");

    renderOrderDetails();

    expect(screen.getByText("Order not found.")).toBeInTheDocument();
  });

  test("18. Fetches correct order using URL ID", () => {
    renderOrderDetails("PG101");

    expect(screen.getByText("Order #PG101")).toBeInTheDocument();
  });
});
