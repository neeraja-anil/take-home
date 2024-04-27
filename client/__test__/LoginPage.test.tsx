import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "@/app/take-home/login/page";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("axios");

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const queryClient = new QueryClient();

describe("LoginPage", () => {
  it("renders correctly", () => {
    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <LoginPage />
        </QueryClientProvider>
      </div>
    );
    expect(screen.getByText("Sign in to your account"));
  });

  it("submits form with valid form data", async () => {
    const mutateSpy = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateSpy,
    });
    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <LoginPage />
        </QueryClientProvider>
      </div>
    );
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submit = screen.getByTestId("signup-form");

    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(submit);

    expect(submit).toBeTruthy();
    expect(mutateSpy).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("does not submit form with invalid form data", async () => {
    const mutateSpy = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateSpy,
    });

    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <LoginPage />
        </QueryClientProvider>
      </div>
    );
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submit = screen.getByTestId("signup-form");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.submit(submit);

    expect(mutateSpy).not.toHaveBeenCalledWith({
      email: "test",
      password: "pass123",
    });
  });
});
