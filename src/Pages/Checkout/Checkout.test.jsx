
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Checkout from "./Checkout";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Checkout Component Testing", () => {

  const mockCart = [
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
  ];

  const mockClearCart = vi.fn();
  const mockSetLastOrder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    window.alert = vi.fn();
  });

  it("should render Checkout component", () => {
    render(
      <Checkout
        cart={mockCart}
        clearCart={mockClearCart}
        setLastOrder={mockSetLastOrder}
      />
    );

    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("should display Delivery Address heading", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(screen.getByText("Delivery Address")).toBeInTheDocument();
  });

  it("should display address textarea", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(
      screen.getByPlaceholderText("Enter your full address")
    ).toBeInTheDocument();
  });

  it("should update delivery address", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    const addressInput = screen.getByPlaceholderText(
      "Enter your full address"
    );

    fireEvent.change(addressInput, {
      target: { value: "Hyderabad, Telangana" },
    });

    expect(addressInput).toHaveValue("Hyderabad, Telangana");
  });

  it("should display all payment methods", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(screen.getByLabelText("Cash on Delivery")).toBeInTheDocument();
    expect(screen.getByLabelText("UPI")).toBeInTheDocument();
    expect(screen.getByLabelText("Credit / Debit Card")).toBeInTheDocument();
  });

  it("should select UPI payment method", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    fireEvent.click(screen.getByLabelText("UPI"));

    expect(screen.getByLabelText("UPI")).toBeChecked();
  });

  it("should select Card payment method", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    fireEvent.click(screen.getByLabelText("Credit / Debit Card"));

    expect(screen.getByLabelText("Credit / Debit Card")).toBeChecked();
  });

  it("should select Cash on Delivery by default", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(screen.getByLabelText("Cash on Delivery")).toBeChecked();
  });

  it("should calculate and display total amount", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(screen.getByText("Total: ₹1300")).toBeInTheDocument();
  });

  it("should display Place Order button", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(
      screen.getByRole("button", { name: "Place Order" })
    ).toBeInTheDocument();
  });

  it("should have checkout-form CSS class", () => {
    const { container } = render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    expect(container.querySelector("form")).toHaveClass("checkout-form");
  });

  it("should show alert when cart is empty", () => {
    render(
      <Checkout cart={[]} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    const addressInput = screen.getByPlaceholderText(
      "Enter your full address"
    );

    fireEvent.change(addressInput, {
      target: { value: "Hyderabad" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));

    expect(window.alert).toHaveBeenCalledWith("Your cart is empty");
    expect(mockClearCart).not.toHaveBeenCalled();
  });

  it("should place order successfully", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full address"),
      {
        target: { value: "Hyderabad, Telangana" },
      }
    );

    fireEvent.click(screen.getByLabelText("UPI"));

    fireEvent.click(
      screen.getByRole("button", { name: "Place Order" })
    );

    expect(mockSetLastOrder).toHaveBeenCalledTimes(1);

    const order = mockSetLastOrder.mock.calls[0][0];

    expect(order).toMatchObject({
      total: 1300,
      status: "Order Placed",
      address: "Hyderabad, Telangana",
      payment: "UPI",
      items: mockCart,
    });

    expect(order.id).toMatch(/^PG\d{6}$/);
    expect(order.date).toBeTruthy();
  });

  it("should save order in localStorage", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full address"),
      {
        target: { value: "Hyderabad" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Place Order" })
    );

    const savedOrders = JSON.parse(localStorage.getItem("orders"));

    expect(savedOrders).toHaveLength(1);
    expect(savedOrders[0].total).toBe(1300);
    expect(savedOrders[0].status).toBe("Order Placed");
  });

  it("should clear cart after placing order", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full address"),
      {
        target: { value: "Hyderabad" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Place Order" })
    );

    expect(mockClearCart).toHaveBeenCalledTimes(1);
  });

  it("should navigate to order confirmation after placing order", () => {
    render(
      <Checkout cart={mockCart} clearCart={mockClearCart} setLastOrder={mockSetLastOrder} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full address"),
      {
        target: { value: "Hyderabad" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Place Order" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/order-confirmation");
  });

});
