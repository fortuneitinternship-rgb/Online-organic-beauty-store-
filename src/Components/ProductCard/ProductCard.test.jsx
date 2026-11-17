
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("ProductCard Component Testing", () => {

  const mockProduct = {
    id: 1,
    name: "Organic Face Cream",
    category: "Skincare",
    image: "/images/face-cream.jpg",
    rating: 4.5,
    price: 599,
  };

  it("should render ProductCard component", () => {
    const { container } = render(
      <MemoryRouter>
        <ProductCard
          product={mockProduct}
          onWishlist={vi.fn()}
          isWishlisted={false}
        />
      </MemoryRouter>
    );

    expect(container.querySelector(".product-card")).toBeInTheDocument();
  });

  it("should display product name", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Organic Face Cream")).toBeInTheDocument();
  });

  it("should display product category", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Skincare")).toBeInTheDocument();
  });

  it("should display product rating", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("⭐ 4.5")).toBeInTheDocument();
  });

  it("should display product price", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("₹599")).toBeInTheDocument();
  });

  it("should display product image with correct alt text", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Organic Face Cream"))
      .toHaveAttribute("src", "/images/face-cream.jpg");
  });

  it("should display View Product link", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "View Product" })
    ).toHaveAttribute("href", "/product/1");
  });

  it("should call onWishlist when wishlist button is clicked", () => {
    const mockWishlist = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard
          product={mockProduct}
          onWishlist={mockWishlist}
          isWishlisted={false}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockWishlist).toHaveBeenCalledTimes(1);
    expect(mockWishlist).toHaveBeenCalledWith(mockProduct);
  });

  it("should display empty heart when product is not wishlisted", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole("button")).toHaveTextContent("♡");
  });

  it("should display filled heart when product is wishlisted", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={true} />
      </MemoryRouter>
    );

    expect(screen.getByRole("button")).toHaveTextContent("♥");
  });

  it("should have product-card CSS class", () => {
    const { container } = render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onWishlist={vi.fn()} isWishlisted={false} />
      </MemoryRouter>
    );

    expect(container.querySelector(".product-card")).toHaveClass("product-card");
  });

});
