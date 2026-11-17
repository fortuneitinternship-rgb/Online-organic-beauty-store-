
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";

describe("Cart Component Testing", () => {

  const mockCart = [
    {
      id: 1,
      name: "Organic Face Cream",
      price: 500,
      quantity: 2,
      image: "/images/face-cream.jpg",
    },
    {
      id: 2,
      name: "Organic Hair Oil",
      price: 300,
      quantity: 1,
      image: "/images/hair-oil.jpg",
    },
  ];

  it("should render Cart component", () => {
    render(
      <MemoryRouter>
        <Cart cart={[]} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  });

  it("should display empty cart message", () => {
    render(
      <MemoryRouter>
        <Cart cart={[]} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("should display Continue Shopping link when cart is empty", () => {
    render(
      <MemoryRouter>
        <Cart cart={[]} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Continue Shopping" })
    ).toHaveAttribute("href", "/search");
  });

  it("should display cart product names", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Organic Face Cream")).toBeInTheDocument();
    expect(screen.getByText("Organic Hair Oil")).toBeInTheDocument();
  });

  it("should display product prices", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("₹500")).toBeInTheDocument();
    expect(screen.getByText("₹300")).toBeInTheDocument();
  });

  it("should display product images", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Organic Face Cream"))
      .toHaveAttribute("src", "/images/face-cream.jpg");
  });

  it("should display product quantities", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should calculate and display total amount", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Total: ₹1300")).toBeInTheDocument();
  });

  it("should call updateQuantity with -1 when minus button is clicked", () => {
    const mockUpdateQuantity = vi.fn();

    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={mockUpdateQuantity} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "-" })[0]);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, -1);
  });

  it("should call updateQuantity with 1 when plus button is clicked", () => {
    const mockUpdateQuantity = vi.fn();

    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={mockUpdateQuantity} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "+" })[0]);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("should call removeFromCart when Remove button is clicked", () => {
    const mockRemoveFromCart = vi.fn();

    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={mockRemoveFromCart} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
  });

  it("should display Proceed to Checkout link", () => {
    render(
      <MemoryRouter>
        <Cart cart={mockCart} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Proceed to Checkout" })
    ).toHaveAttribute("href", "/checkout");
  });

  it("should have section CSS class", () => {
    const { container } = render(
      <MemoryRouter>
        <Cart cart={[]} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(container.firstChild).toHaveClass("section");
  });

});
