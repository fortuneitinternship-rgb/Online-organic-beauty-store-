
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar Component Testing", () => {

  it("should render Navbar component", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should display brand name", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("PURE GLOW")).toBeInTheDocument();
  });

  it("should display brand tagline", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Pure Glow, Naturally")).toBeInTheDocument();
  });

  it("should display all navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Wishlist" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
  });

  it("should have correct navigation paths", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/search");
    expect(screen.getByRole("link", { name: "Wishlist" })).toHaveAttribute("href", "/wishlist");
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("href", "/profile");
  });

  it("should display wishlist count", () => {
    render(
      <MemoryRouter>
        <Navbar wishlistCount={3} />
      </MemoryRouter>
    );

    expect(screen.getByText("Wishlist (3)")).toBeInTheDocument();
  });

  it("should display cart count", () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={5} />
      </MemoryRouter>
    );

    expect(screen.getByText("Cart (5)")).toBeInTheDocument();
  });

  it("should hide wishlist count when zero", () => {
    render(
      <MemoryRouter>
        <Navbar wishlistCount={0} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Wishlist" })).toBeInTheDocument();
    expect(screen.queryByText("Wishlist (0)")).not.toBeInTheDocument();
  });

  it("should hide cart count when zero", () => {
    render(
      <MemoryRouter>
        <Navbar cartCount={0} />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
    expect(screen.queryByText("Cart (0)")).not.toBeInTheDocument();
  });

  it("should have navbar CSS class", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(container.querySelector("nav")).toHaveClass("navbar");
  });

});
