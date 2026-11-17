
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import SearchFilter from "./SearchFilter";
import products from "../../data/Products";

vi.mock("../../Components/ProductCard/ProductCard", () => ({
  default: ({ product, onWishlist, isWishlisted }) => (
    <div data-testid="product-card">
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <button onClick={() => onWishlist(product)}>
        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
      </button>
    </div>
  ),
}));

describe("SearchFilter Component", () => {
  const mockOnWishlist = vi.fn();

  const mockWishlist = [];

  const renderSearchFilter = (wishlist = mockWishlist) => {
    return render(
      <MemoryRouter>
        <SearchFilter
          onWishlist={mockOnWishlist}
          wishlist={wishlist}
        />
      </MemoryRouter>
    );
  };

  test("renders Search & Filter heading", () => {
    renderSearchFilter();

    expect(
      screen.getByRole("heading", { name: "Search & Filter" })
    ).toBeInTheDocument();
  });

  test("renders search input", () => {
    renderSearchFilter();

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  test("renders category filter", () => {
    renderSearchFilter();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("displays all products initially", () => {
    renderSearchFilter();

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      products.length
    );
  });

  test("displays product names", () => {
    renderSearchFilter();

    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });

  test("filters products by search text", () => {
    renderSearchFilter();

    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, {
      target: { value: products[0].name },
    });

    expect(screen.getByText(products[0].name)).toBeInTheDocument();

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      products.filter((product) =>
        product.name.toLowerCase().includes(products[0].name.toLowerCase())
      ).length
    );
  });

  test("search is case insensitive", () => {
    renderSearchFilter();

    const searchInput = screen.getByPlaceholderText(/search/i);

    fireEvent.change(searchInput, {
      target: { value: products[0].name.toUpperCase() },
    });

    expect(screen.getByText(products[0].name)).toBeInTheDocument();
  });

  test("displays No products found for invalid search", () => {
    renderSearchFilter();

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "xyz123notfound" },
    });

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  test("filters products by Skincare category", () => {
    renderSearchFilter();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Skincare" },
    });

    const expectedProducts = products.filter(
      (product) => product.category === "Skincare"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("filters products by Haircare category", () => {
    renderSearchFilter();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Haircare" },
    });

    const expectedProducts = products.filter(
      (product) => product.category === "Haircare"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("filters products by Makeup category", () => {
    renderSearchFilter();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Makeup" },
    });

    const expectedProducts = products.filter(
      (product) => product.category === "Makeup"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("filters products by Body Care category", () => {
    renderSearchFilter();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Body Care" },
    });

    const expectedProducts = products.filter(
      (product) => product.category === "Body Care"
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("shows all products when category is All", () => {
    renderSearchFilter();

    const categoryFilter = screen.getByRole("combobox");

    fireEvent.change(categoryFilter, {
      target: { value: "Skincare" },
    });

    fireEvent.change(categoryFilter, {
      target: { value: "All" },
    });

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      products.length
    );
  });

  test("combines search and category filters", () => {
    renderSearchFilter();

    const searchInput = screen.getByPlaceholderText(/search/i);
    const categoryFilter = screen.getByRole("combobox");

    fireEvent.change(categoryFilter, {
      target: { value: products[0].category },
    });

    fireEvent.change(searchInput, {
      target: { value: products[0].name },
    });

    const expectedProducts = products.filter(
      (product) =>
        product.category === products[0].category &&
        product.name.toLowerCase().includes(products[0].name.toLowerCase())
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      expectedProducts.length
    );
  });

  test("shows No products found when category has no matching search", () => {
    renderSearchFilter();

    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "xyz123notfound" },
    });

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  test("passes wishlist status to ProductCard", () => {
    const wishlist = [products[0]];

    renderSearchFilter(wishlist);

    const firstProductCard = screen.getAllByTestId("product-card")[0];

    expect(
      firstProductCard.querySelector("button")
    ).toHaveTextContent("Wishlisted");
  });

  test("calls onWishlist when wishlist button is clicked", () => {
    renderSearchFilter();

    const wishlistButtons = screen.getAllByRole("button", {
      name: "Add to Wishlist",
    });

    fireEvent.click(wishlistButtons[0]);

    expect(mockOnWishlist).toHaveBeenCalledWith(products[0]);
  });

  test("has section class", () => {
    const { container } = renderSearchFilter();

    expect(container.querySelector(".section")).toBeInTheDocument();
  });

  test("has search-area class", () => {
    const { container } = renderSearchFilter();

    expect(container.querySelector(".search-area")).toBeInTheDocument();
  });

  test("has product-grid class", () => {
    const { container } = renderSearchFilter();

    expect(container.querySelector(".product-grid")).toBeInTheDocument();
  });
});
