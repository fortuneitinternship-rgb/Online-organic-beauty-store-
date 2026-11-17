
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Home from "./Home";
import products from "../../data/Products";

// Mock ProductCard component
vi.mock("../../Components/ProductCard/ProductCard", () => ({
  default: ({ product }) => (
    <div data-testid="product-card">
      <h3>{product.name}</h3>
      <p>{product.category}</p>
    </div>
  ),
}));

const renderHome = (wishlist = [], onWishlist = vi.fn()) => {
  return render(
    <MemoryRouter>
      <Home onWishlist={onWishlist} wishlist={wishlist} />
    </MemoryRouter>
  );
};

describe("Home Component", () => {
  test("renders Home component", () => {
    renderHome();
    expect(screen.getByText("ONLINE ORGANIC BEAUTY STORE")).toBeInTheDocument();
  });

  test("displays 100% NATURAL BEAUTY text", () => {
    renderHome();
    expect(screen.getByText("100% NATURAL BEAUTY")).toBeInTheDocument();
  });

  test("displays Pure Glow tagline", () => {
    renderHome();
    expect(screen.getByText("Pure Glow, Naturally")).toBeInTheDocument();
  });

  test("displays hero description", () => {
    renderHome();
    expect(
      screen.getByText(/Discover beautiful skincare/i)
    ).toBeInTheDocument();
  });

  test("displays Shop Now button", () => {
    renderHome();
    expect(
      screen.getByRole("link", { name: "Shop Now" })
    ).toBeInTheDocument();
  });

  test("Shop Now link navigates to search page", () => {
    renderHome();
    expect(
      screen.getByRole("link", { name: "Shop Now" })
    ).toHaveAttribute("href", "/search");
  });

  test("displays Shop By Category heading", () => {
    renderHome();
    expect(screen.getByText("Shop By Category")).toBeInTheDocument();
  });

  test("displays all category buttons", () => {
    renderHome();

    ["All", "Skincare", "Haircare", "Makeup", "Body Care"].forEach(
      (category) => {
        expect(
          screen.getByRole("button", { name: category })
        ).toBeInTheDocument();
      }
    );
  });

  test("displays Featured Products heading", () => {
    renderHome();
    expect(screen.getByText("Featured Products")).toBeInTheDocument();
  });

  test("displays all products by default", () => {
    renderHome();
    expect(screen.getAllByTestId("product-card")).toHaveLength(
      products.length
    );
  });

  test("filters Skincare products", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Skincare" }));

    const expectedProducts = products.filter(
      (product) => product.category === "Skincare"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("filters Haircare products", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Haircare" }));

    const expectedProducts = products.filter(
      (product) => product.category === "Haircare"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("filters Makeup products", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Makeup" }));

    const expectedProducts = products.filter(
      (product) => product.category === "Makeup"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("filters Body Care products", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Body Care" }));

    const expectedProducts = products.filter(
      (product) => product.category === "Body Care"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("shows all products again when All is clicked", () => {
    renderHome();

    fireEvent.click(screen.getByRole("button", { name: "Skincare" }));
    fireEvent.click(screen.getByRole("button", { name: "All" }));

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      products.length
    );
  });

  test("renders product names", () => {
    renderHome();

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  test("accepts wishlist props", () => {
    const wishlist = products.length > 0 ? [products[0]] : [];

    renderHome(wishlist);

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      products.length
    );
  });
});
