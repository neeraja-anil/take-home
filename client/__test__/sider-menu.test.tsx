import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import SideBar from "@/components/sider-menu";
import { ROUTES } from "@/components/utils/constants";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("SiderMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const toggleProjectForm = jest.fn();

  it("should render and redirect to the login page when the logout button is clicked", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const mockPath = {
      pathname: "home",
    };
    (usePathname as jest.Mock).mockReturnValue(mockPath);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    const { getByPlaceholderText, getByText } = render(
      <SideBar toggleProjectForm={toggleProjectForm} />
    );

    const homeMenuItem = screen.getByText("My Projects");
    fireEvent.click(homeMenuItem);

    expect(mockRouter.push).toHaveBeenCalledWith(ROUTES.HOME);

    const profileMenuItem = screen.queryByText("Profile");
    expect(profileMenuItem).toBeNull();
  });
});
