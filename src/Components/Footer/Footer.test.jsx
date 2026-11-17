
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer Component Testing", () => {

  it("should render footer component", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("should display brand name", () => {
    render(<Footer />);

    expect(screen.getByText("PURE GLOW")).toBeInTheDocument();
  });

  it("should display brand tagline", () => {
    render(<Footer />);

    expect(screen.getByText("Pure Glow, Naturally")).toBeInTheDocument();
  });

  it("should display Quick Links heading", () => {
    render(<Footer />);

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
  });

  it("should display all quick links", () => {
    render(<Footer />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Wishlist")).toBeInTheDocument();
    expect(screen.getByText("My Orders")).toBeInTheDocument();
  });

  it("should display contact information", () => {
    render(<Footer />);

    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Email: support@pureglow.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: +91 98765 43210")).toBeInTheDocument();
  });

  it("should display copyright information", () => {
    render(<Footer />);

    expect(screen.getByText("© 2026 Pure Glow")).toBeInTheDocument();
  });

  it("should display footer description", () => {
    render(<Footer />);

    expect(
      screen.getByText("Organic beauty for everyday life.")
    ).toBeInTheDocument();
  });

  it("should have footer CSS class", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toHaveClass("footer");
  });

});
