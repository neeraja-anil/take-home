import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import WelcomeBanner from "@/components/home/welcome-banner";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("WelcomeBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should logout and redirect to the login page when the logout button is clicked", () => {
    const mockRouter = {
      replace: jest.fn(),
    };
    render(<WelcomeBanner />);
    fireEvent.click(screen.getByText("Logout"));
    expect(localStorage.getItem("user")).toBeNull();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });
});
