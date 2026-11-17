
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CoverPage from "./CoverPage";

describe("CoverPage Component Testing", () => {

  it("should render CoverPage component", () => {
    const { container } = render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(container.querySelector(".cover-page")).toBeInTheDocument();
  });

  it("should display welcome title", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(screen.getByText("WELCOME TO")).toBeInTheDocument();
  });

  it("should display brand name", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "PURE GLOW" })
    ).toBeInTheDocument();
  });

  it("should display Organic Beauty Store heading", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Organic Beauty Store" })
    ).toBeInTheDocument();
  });

  it("should display product description", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Natural beauty products carefully selected/)
    ).toBeInTheDocument();
  });

  it("should display Explore Store link", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Explore Store" })
    ).toBeInTheDocument();
  });

  it("should navigate to home page", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Explore Store" })
    ).toHaveAttribute("href", "/home");
  });

  it("should have main-btn CSS class", () => {
    render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Explore Store" })
    ).toHaveClass("main-btn");
  });

  it("should have cover-content CSS class", () => {
    const { container } = render(
      <MemoryRouter>
        <CoverPage />
      </MemoryRouter>
    );

    expect(container.querySelector(".cover-content"))
      .toHaveClass("cover-content");
  });

});
