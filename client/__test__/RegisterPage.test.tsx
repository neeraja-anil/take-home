import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import React from "react";
import RegisterPage from "@/app/take-home/register/page";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const queryClient = new QueryClient();

describe("RegisterPage", () => {
  it("renders correctly", () => {
    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <RegisterPage />
        </QueryClientProvider>
      </div>
    );
    expect(screen.getByText("Create a new account"));
  });

  it("submits form with valid form data", async () => {
    const mutateSpy = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: mutateSpy,
    });

    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <RegisterPage />
        </QueryClientProvider>
      </div>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submit = screen.getByTestId("signup-btn");

    fireEvent.input(nameInput, { target: { value: "testuser" } });
    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(submit);

    expect(submit).toBeTruthy();
    expect(mutateSpy).toHaveBeenCalledWith({
      name: "testuser",
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
          <RegisterPage />
        </QueryClientProvider>
      </div>
    );

    const NameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password");
    const submit = screen.getByTestId("signup-btn");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.submit(submit);

    expect(mutateSpy).not.toHaveBeenCalledWith({
      email: "test",
      password: "pass123",
    });
  });
});
