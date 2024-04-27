import React from "react";
import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
} from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AddTodo from "@/components/home/add-todo-form";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

jest.mock("axios");
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AddTodo", () => {
  const mockToggleTodoForm = jest.fn();
  const mockProjectId = "123";
  const mockTodoId = "456";
  const mockTodoName = "Test Todo";
  const mockTodoDescription = "Test Description";
  const mockMutate = jest.fn().mockResolvedValue({
    data: {
      name: mockTodoName,
      description: mockTodoDescription,
    },
  });
  const mockOnSubmit = jest.fn().mockReturnValue({
    mutate: mockMutate,
  });

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default values", () => {
    const { getByPlaceholderText, getByText } = render(
      <AddTodo
        toggleTodoForm={mockToggleTodoForm}
        projectId={mockProjectId}
        onSubmit={mockOnSubmit}
      />
    );

    expect(getByPlaceholderText("Todo Name")).toBeInTheDocument();
    expect(getByPlaceholderText("Todo Description")).toBeInTheDocument();
    expect(getByText("Add Todo")).toBeInTheDocument();
  });

  it("renders correctly with initial values", () => {
    const { getByDisplayValue, getByText } = render(
      <AddTodo
        toggleTodoForm={mockToggleTodoForm}
        projectId={mockProjectId}
        todoId={mockTodoId}
        todoName={mockTodoName}
        todoDescription={mockTodoDescription}
        onSubmit={mockOnSubmit}
      />
    );

    expect(getByDisplayValue(mockTodoName)).toBeInTheDocument();
    expect(getByDisplayValue(mockTodoDescription)).toBeInTheDocument();
    expect(getByText("Update Todo")).toBeInTheDocument();
  });

  it("calls onSubmit with correct data when form is submitted", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const { getByPlaceholderText, getByTestId } = render(
      <AddTodo
        toggleTodoForm={mockToggleTodoForm}
        projectId={mockProjectId}
        onSubmit={mockOnSubmit}
      />
    );

    const nameInput = getByPlaceholderText("Todo Name");
    const descriptionInput = getByPlaceholderText("Todo Description");
    const submitButton = getByTestId("add-todo-submit");

    fireEvent.change(nameInput, { target: { value: mockTodoName } });
    fireEvent.change(descriptionInput, {
      target: { value: mockTodoDescription },
    });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: mockTodoName,
        description: mockTodoDescription,
      });

      expect(mockToggleTodoForm).toHaveBeenCalled();
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });
});
