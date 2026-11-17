
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";
import Registration from "./Registration";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Registration Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  const renderRegistration = () => {
    return render(
      <MemoryRouter>
        <Registration />
      </MemoryRouter>
    );
  };

  test("renders registration form", () => {
    renderRegistration();

    expect(
      screen.getByRole("heading", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  test("displays Full Name input", () => {
    renderRegistration();

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
  });

  test("displays Email input", () => {
    renderRegistration();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  test("displays Password input", () => {
    renderRegistration();

    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("displays Register button", () => {
    renderRegistration();

    expect(
      screen.getByRole("button", { name: "Register" })
    ).toBeInTheDocument();
  });

  test("displays Login link", () => {
    renderRegistration();

    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
  });

  test("Login link navigates to login page", () => {
    renderRegistration();

    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/login"
    );
  });

  test("updates Full Name input", () => {
    renderRegistration();

    const nameInput = screen.getByPlaceholderText("Full Name");

    fireEvent.change(nameInput, {
      target: { value: "Veda" },
    });

    expect(nameInput).toHaveValue("Veda");
  });

  test("updates Email input", () => {
    renderRegistration();

    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.change(emailInput, {
      target: { value: "veda@gmail.com" },
    });

    expect(emailInput).toHaveValue("veda@gmail.com");
  });

  test("updates Password input", () => {
    renderRegistration();

    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(passwordInput, {
      target: { value: "veda123" },
    });

    expect(passwordInput).toHaveValue("veda123");
  });

  test("password input has password type", () => {
    renderRegistration();

    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("email input has email type", () => {
    renderRegistration();

    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "type",
      "email"
    );
  });

  test("all inputs are required", () => {
    renderRegistration();

    expect(screen.getByPlaceholderText("Full Name")).toBeRequired();
    expect(screen.getByPlaceholderText("Email")).toBeRequired();
    expect(screen.getByPlaceholderText("Password")).toBeRequired();
  });

  test("saves user details in localStorage after registration", () => {
    renderRegistration();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Veda" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "veda@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "veda123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    const savedUser = JSON.parse(localStorage.getItem("user"));

    expect(savedUser).toEqual({
      name: "Veda",
      email: "veda@gmail.com",
      password: "veda123",
    });
  });

  test("shows registration successful alert", () => {
    renderRegistration();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Veda" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "veda@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "veda123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(window.alert).toHaveBeenCalledWith("Registration successful!");
  });

  test("navigates to login page after registration", () => {
    renderRegistration();

    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "Veda" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "veda@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "veda123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("has auth-page class", () => {
    const { container } = renderRegistration();

    expect(container.querySelector(".auth-page")).toBeInTheDocument();
  });

  test("has auth-box class", () => {
    const { container } = renderRegistration();

    expect(container.querySelector(".auth-box")).toBeInTheDocument();
  });

  test("Register button has main-btn class", () => {
    renderRegistration();

    expect(screen.getByRole("button", { name: "Register" })).toHaveClass(
      "main-btn"
    );
  });
});
