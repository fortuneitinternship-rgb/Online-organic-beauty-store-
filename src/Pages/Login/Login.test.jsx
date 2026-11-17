
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";

import Login from "./Login";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Component Testing", () => {
  const mockSetLoggedIn = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login setLoggedIn={mockSetLoggedIn} />
      </MemoryRouter>
    );
  };

  test("1. Renders Login component", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: "Login" })
    ).toBeInTheDocument();
  });

  test("2. Displays Email input", () => {
    renderLogin();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  test("3. Displays Password input", () => {
    renderLogin();

    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("4. Displays Login button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });

  test("5. Displays Create Account link", () => {
    renderLogin();

    expect(
      screen.getByRole("link", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  test("6. Create Account link navigates to register page", () => {
    renderLogin();

    expect(
      screen.getByRole("link", { name: "Create Account" })
    ).toHaveAttribute("href", "/register");
  });

  test("7. Updates email input value", () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText("Email");

    fireEvent.change(emailInput, {
      target: { value: "test@gmail.com" },
    });

    expect(emailInput).toHaveValue("test@gmail.com");
  });

  test("8. Updates password input value", () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(passwordInput).toHaveValue("123456");
  });

  test("9. Successfully logs in with correct credentials", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "test@gmail.com",
        password: "123456",
      })
    );

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(localStorage.getItem("loggedIn")).toBe("true");
    expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
    expect(window.alert).toHaveBeenCalledWith("Login successful!");
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  test("10. Shows error for incorrect email", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "test@gmail.com",
        password: "123456",
      })
    );

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid email or password"
    );
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("11. Shows error for incorrect password", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "test@gmail.com",
        password: "123456",
      })
    );

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrong123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid email or password"
    );
  });

  test("12. Shows error when user is not registered", () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "new@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid email or password"
    );
  });

  test("13. Does not set loggedIn for invalid credentials", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "test@gmail.com",
        password: "123456",
      })
    );

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrong123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(localStorage.getItem("loggedIn")).toBeNull();
    expect(mockSetLoggedIn).not.toHaveBeenCalled();
  });

  test("14. Renders auth-page CSS class", () => {
    const { container } = renderLogin();

    expect(container.querySelector(".auth-page")).toBeInTheDocument();
  });

  test("15. Renders auth-box CSS class", () => {
    const { container } = renderLogin();

    expect(container.querySelector(".auth-box")).toBeInTheDocument();
  });

  test("16. Login button has main-btn class", () => {
    renderLogin();

    expect(
      screen.getByRole("button", { name: "Login" })
    ).toHaveClass("main-btn");
  });
});
