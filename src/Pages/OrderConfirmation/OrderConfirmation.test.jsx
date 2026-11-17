
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";

import OrderConfirmation from "./OrderConfirmation";

const mockOrder = {
  id: "PG101",
  total: 1500,
  payment: "UPI",
};

const renderOrderConfirmation = (lastOrder = mockOrder) => {
  return render(
    <MemoryRouter>
      <OrderConfirmation lastOrder={lastOrder} />
    </MemoryRouter>
  );
};

describe("OrderConfirmation Component Testing", () => {

  test("1. Renders OrderConfirmation component", () => {
    const { container } = renderOrderConfirmation();

    expect(container.querySelector(".success-page")).toBeInTheDocument();
  });

  test("2. Displays Order Confirmed heading", () => {
    renderOrderConfirmation();

    expect(
      screen.getByRole("heading", { name: "Order Confirmed!" })
    ).toBeInTheDocument();
  });

  test("3. Displays success icon", () => {
    renderOrderConfirmation();

    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  test("4. Displays thank you message", () => {
    renderOrderConfirmation();

    expect(
      screen.getByText("Thank you for shopping with Pure Glow.")
    ).toBeInTheDocument();
  });

  test("5. Displays order ID", () => {
    renderOrderConfirmation();

    expect(screen.getByText("Order ID: #PG101")).toBeInTheDocument();
  });

  test("6. Displays order total", () => {
    renderOrderConfirmation();

    expect(screen.getByText("Total: ₹1500")).toBeInTheDocument();
  });

  test("7. Displays payment method", () => {
    renderOrderConfirmation();

    expect(screen.getByText("Payment: UPI")).toBeInTheDocument();
  });

  test("8. Displays View My Orders link", () => {
    renderOrderConfirmation();

    expect(
      screen.getByRole("link", { name: "View My Orders" })
    ).toBeInTheDocument();
  });

  test("9. View My Orders link navigates to orders page", () => {
    renderOrderConfirmation();

    expect(
      screen.getByRole("link", { name: "View My Orders" })
    ).toHaveAttribute("href", "/orders");
  });

  test("10. Displays success-page CSS class", () => {
    const { container } = renderOrderConfirmation();

    expect(container.querySelector(".success-page")).toBeInTheDocument();
  });

  test("11. Displays success-box CSS class", () => {
    const { container } = renderOrderConfirmation();

    expect(container.querySelector(".success-box")).toBeInTheDocument();
  });

  test("12. Displays main-btn CSS class", () => {
    renderOrderConfirmation();

    expect(
      screen.getByRole("link", { name: "View My Orders" })
    ).toHaveClass("main-btn");
  });

  test("13. Displays different order details", () => {
    const anotherOrder = {
      id: "PG202",
      total: 2500,
      payment: "Card",
    };

    renderOrderConfirmation(anotherOrder);

    expect(screen.getByText("Order ID: #PG202")).toBeInTheDocument();
    expect(screen.getByText("Total: ₹2500")).toBeInTheDocument();
    expect(screen.getByText("Payment: Card")).toBeInTheDocument();
  });

  test("14. Handles missing order details", () => {
    renderOrderConfirmation(null);

    expect(screen.getByText("Order ID: #")).toBeInTheDocument();
    expect(screen.getByText("Total: ₹")).toBeInTheDocument();
    expect(screen.getByText("Payment:")).toBeInTheDocument();
  });

});
