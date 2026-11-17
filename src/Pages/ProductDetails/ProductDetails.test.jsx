
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import ProductDetails from "./ProductDetails";
import products from "../../data/Products";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Get sample product from Products.js
const mockProduct = products[0];

const renderProductDetails = (
  id = mockProduct?.id,
  wishlist = [],
  addToCart = vi.fn(),
  onWishlist = vi.fn()
) => {
  return render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              onWishlist={onWishlist}
              wishlist={wishlist}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe("ProductDetails Component Testing", () => {
  test("1. Renders ProductDetails component", () => {
    const { container } = renderProductDetails();

    expect(container.querySelector(".product-details")).toBeInTheDocument();
  });

  test("2. Displays product name", () => {
    renderProductDetails();

    expect(
      screen.getByRole("heading", { name: mockProduct.name })
    ).toBeInTheDocument();
  });

  test("3. Displays product category", () => {
    renderProductDetails();

    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
  });

  test("4. Displays product price", () => {
    renderProductDetails();

    expect(
      screen.getByRole("heading", {
        name: `₹${mockProduct.price}`,
      })
    ).toBeInTheDocument();
  });

  test("5. Displays product rating", () => {
    renderProductDetails();

    expect(
      screen.getByText(`⭐ ${mockProduct.rating}`)
    ).toBeInTheDocument();
  });

  test("6. Displays product image", () => {
    renderProductDetails();

    const image = screen.getByRole("img", {
      name: mockProduct.name,
    });

    expect(image).toHaveAttribute("src", mockProduct.image);
  });

  test("7. Displays Description heading", () => {
    renderProductDetails();

    expect(
      screen.getByRole("heading", { name: "Description" })
    ).toBeInTheDocument();
  });

  test("8. Displays product description", () => {
    renderProductDetails();

    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  test("9. Displays Ingredients heading", () => {
    renderProductDetails();

    expect(
      screen.getByRole("heading", { name: "Ingredients" })
    ).toBeInTheDocument();
  });

  test("10. Displays product ingredients", () => {
    renderProductDetails();

    expect(screen.getByText(mockProduct.ingredients)).toBeInTheDocument();
  });

  test("11. Displays Add to Cart button", () => {
    renderProductDetails();

    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toBeInTheDocument();
  });

  test("12. Calls addToCart when Add to Cart is clicked", () => {
    const addToCart = vi.fn();

    renderProductDetails(
      mockProduct.id,
      [],
      addToCart
    );

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });

  test("13. Navigates to cart after clicking Add to Cart", () => {
    mockNavigate.mockClear();

    renderProductDetails();

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(mockNavigate).toHaveBeenCalledWith("/cart");
  });

  test("14. Displays Add to Wishlist button", () => {
    renderProductDetails();

    expect(
      screen.getByRole("button", { name: "♡ Add to Wishlist" })
    ).toBeInTheDocument();
  });

  test("15. Calls onWishlist when Wishlist is clicked", () => {
    const onWishlist = vi.fn();

    renderProductDetails(
      mockProduct.id,
      [],
      vi.fn(),
      onWishlist
    );

    fireEvent.click(
      screen.getByRole("button", { name: "♡ Add to Wishlist" })
    );

    expect(onWishlist).toHaveBeenCalledWith(mockProduct);
  });

  test("16. Displays Remove Wishlist when product is wishlisted", () => {
    renderProductDetails(mockProduct.id, [mockProduct]);

    expect(
      screen.getByRole("button", { name: "♥ Remove Wishlist" })
    ).toBeInTheDocument();
  });

  test("17. Displays Product not found for invalid ID", () => {
    renderProductDetails(999999);

    expect(
      screen.getByRole("heading", { name: "Product not found" })
    ).toBeInTheDocument();
  });

  test("18. Displays main-btn CSS class", () => {
    renderProductDetails();

    expect(
      screen.getByRole("button", { name: "Add to Cart" })
    ).toHaveClass("main-btn");
  });

  test("19. Displays secondary-btn CSS class", () => {
    renderProductDetails();

    expect(
      screen.getByRole("button", { name: "♡ Add to Wishlist" })
    ).toHaveClass("secondary-btn");
  });
});
