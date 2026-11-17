
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach, vi } from "vitest";

import Profile from "./Profile";

// Mock useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Profile Component Testing", () => {
  const mockSetLoggedIn = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderProfile = () => {
    return render(
      <MemoryRouter>
        <Profile setLoggedIn={mockSetLoggedIn} />
      </MemoryRouter>
    );
  };

  test("1. Renders Profile component", () => {
    renderProfile();

    expect(
      screen.getByRole("heading", { name: "My Profile" })
    ).toBeInTheDocument();
  });

  test("2. Displays My Profile heading", () => {
    renderProfile();

    expect(screen.getByText("My Profile")).toBeInTheDocument();
  });

  test("3. Displays profile icon", () => {
    renderProfile();

    expect(screen.getByText("👤")).toBeInTheDocument();
  });

  test("4. Displays Guest User when user is not logged in", () => {
    renderProfile();

    expect(screen.getByText("Guest User")).toBeInTheDocument();
  });

  test("5. Displays Please login when user email is unavailable", () => {
    renderProfile();

    expect(screen.getByText("Please login")).toBeInTheDocument();
  });

  test("6. Displays registered user name", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Vedavathi",
        email: "veda@gmail.com",
      })
    );

    renderProfile();

    expect(screen.getByText("Vedavathi")).toBeInTheDocument();
  });

  test("7. Displays registered user email", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Vedavathi",
        email: "veda@gmail.com",
      })
    );

    renderProfile();

    expect(screen.getByText("veda@gmail.com")).toBeInTheDocument();
  });

  test("8. Displays Logout button", () => {
    renderProfile();

    expect(
      screen.getByRole("button", { name: "Logout" })
    ).toBeInTheDocument();
  });

  test("9. Logout button has main-btn class", () => {
    renderProfile();

    expect(
      screen.getByRole("button", { name: "Logout" })
    ).toHaveClass("main-btn");
  });

  test("10. Removes loggedIn from localStorage on logout", () => {
    localStorage.setItem("loggedIn", "true");

    renderProfile();

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(localStorage.getItem("loggedIn")).toBeNull();
  });

  test("11. Calls setLoggedIn with false on logout", () => {
    renderProfile();

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(mockSetLoggedIn).toHaveBeenCalledWith(false);
  });

  test("12. Navigates to login page after logout", () => {
    renderProfile();

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("13. Keeps user details in localStorage after logout", () => {
    const user = {
      name: "Vedavathi",
      email: "veda@gmail.com",
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");

    renderProfile();

    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    expect(JSON.parse(localStorage.getItem("user"))).toEqual(user);
  });

  test("14. Displays section CSS class", () => {
    const { container } = renderProfile();

    expect(container.querySelector(".section")).toBeInTheDocument();
  });

  test("15. Displays profile-box CSS class", () => {
    const { container } = renderProfile();

    expect(container.querySelector(".profile-box")).toBeInTheDocument();
  });

  test("16. Displays profile-icon CSS class", () => {
    const { container } = renderProfile();

    expect(container.querySelector(".profile-icon")).toBeInTheDocument();
  });
});
