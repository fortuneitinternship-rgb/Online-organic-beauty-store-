
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Wishlist from "./Wishlist";

describe("Wishlist Component", () => {
  const mockOnWishlist = vi.fn();

  const mockProducts = [
    {
      id: 1,
      name: "Organic Face Cream",
      category: "Skincare",
      price: 599,
      image: "/images/face-cream.jpg",
    },
    {
      id: 2,
      name: "Organic Hair Oil",
      category: "Haircare",
      price: 399,
      image: "/images/hair-oil.jpg",
    },
  ];

  const renderWishlist = (wishlist = mockProducts) => {
    return render(
      <MemoryRouter>
        <Wishlist
          wishlist={wishlist}
          onWishlist={mockOnWishlist}
        />
      </MemoryRouter>
    );
  };

  test("renders Wishlist heading", () => {
    renderWishlist();

    expect(
      screen.getByRole("heading", { name: /My Wishlist/i })
    ).toBeInTheDocument();
  });

  test("displays empty wishlist message", () => {
    renderWishlist([]);

    expect(
      screen.getByText("Your wishlist is empty")
    ).toBeInTheDocument();
  });

  test("displays empty wishlist description", () => {
    renderWishlist([]);

    expect(
      screen.getByText("Add products you love to your wishlist.")
    ).toBeInTheDocument();
  });

  test("displays Browse Products link when wishlist is empty", () => {
    renderWishlist([]);

    expect(
      screen.getByRole("link", { name: "Browse Products" })
    ).toBeInTheDocument();
  });

  test("Browse Products link navigates to search page", () => {
    renderWishlist([]);

    expect(
      screen.getByRole("link", { name: "Browse Products" })
    ).toHaveAttribute("href", "/search");
  });

  test("displays wishlist products", () => {
    renderWishlist();

    expect(screen.getByText("Organic Face Cream")).toBeInTheDocument();
    expect(screen.getByText("Organic Hair Oil")).toBeInTheDocument();
  });

  test("displays product categories", () => {
    renderWishlist();

    expect(screen.getByText("Skincare")).toBeInTheDocument();
    expect(screen.getByText("Haircare")).toBeInTheDocument();
  });

  test("displays product prices", () => {
    renderWishlist();

    expect(screen.getByText("₹599")).toBeInTheDocument();
    expect(screen.getByText("₹399")).toBeInTheDocument();
  });

  test("displays product images", () => {
    renderWishlist();

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute(
      "src",
      "/images/face-cream.jpg"
    );
    expect(images[1]).toHaveAttribute(
      "src",
      "/images/hair-oil.jpg"
    );
  });

  test("product images have correct alt text", () => {
    renderWishlist();

    expect(
      screen.getByAltText("Organic Face Cream")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Organic Hair Oil")
    ).toBeInTheDocument();
  });

  test("displays View Product links", () => {
    renderWishlist();

    expect(
      screen.getAllByRole("link", { name: "View Product" })
    ).toHaveLength(2);
  });

  test("View Product links have correct URLs", () => {
    renderWishlist();

    const links = screen.getAllByRole("link", {
      name: "View Product",
    });

    expect(links[0]).toHaveAttribute("href", "/product/1");
    expect(links[1]).toHaveAttribute("href", "/product/2");
  });

  test("displays Remove buttons", () => {
    renderWishlist();

    expect(
      screen.getAllByRole("button", { name: "Remove" })
    ).toHaveLength(2);
  });

  test("calls onWishlist when Remove button is clicked", () => {
    renderWishlist();

    const removeButtons = screen.getAllByRole("button", {
      name: "Remove",
    });

    fireEvent.click(removeButtons[0]);

    expect(mockOnWishlist).toHaveBeenCalledWith(mockProducts[0]);
  });

  test("calls onWishlist with correct product when second Remove button is clicked", () => {
    renderWishlist();

    const removeButtons = screen.getAllByRole("button", {
      name: "Remove",
    });

    fireEvent.click(removeButtons[1]);

    expect(mockOnWishlist).toHaveBeenCalledWith(mockProducts[1]);
  });

  test("has section class", () => {
    const { container } = renderWishlist();

    expect(container.querySelector(".section")).toBeInTheDocument();
  });

  test("has wishlist-grid class", () => {
    const { container } = renderWishlist();

    expect(container.querySelector(".wishlist-grid")).toBeInTheDocument();
  });

  test("has wishlist-card class", () => {
    const { container } = renderWishlist();

    expect(
      container.querySelectorAll(".wishlist-card")
    ).toHaveLength(2);
  });

  test("has empty-box class when wishlist is empty", () => {
    const { container } = renderWishlist([]);

    expect(container.querySelector(".empty-box")).toBeInTheDocument();
  });

  test("does not display product cards when wishlist is empty", () => {
    const { container } = renderWishlist([]);

    expect(
      container.querySelector(".wishlist-grid")
    ).not.toBeInTheDocument();
  });
});
