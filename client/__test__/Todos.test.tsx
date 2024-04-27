import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Todos from "@/components/home/todo-list/todos";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { handleDeleteTodo } from "@/helperFunctionsForAPI/project";
import api from "@/app/utils/axios-config";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const queryClient = new QueryClient();

const mockTodo = {
  id: 1,
  name: "Test Todo",
  description: "Test Description",
  status: "PENDING",
};

describe("Todos component", () => {
  const mutate = jest.fn();
  (useMutation as jest.Mock).mockReturnValue({ mutate });
  it("should invoke delete a todo fn", async () => {
    const mockTodo = {
      id: 1,
      name: "Test Todo",
      description: "Test Description",
      status: "PENDING",
    };

    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <Todos todo={mockTodo} />
        </QueryClientProvider>
      </div>
    );
    const trashIcon = screen.getByTestId("delete-todo");
    fireEvent.click(trashIcon);

    await waitFor(() => expect(mutate).toHaveBeenCalled());
  });

  it("should delete a todo successfully", async () => {
    const mockResponse = { data: "Todo deleted successfully" };
    const todoId = "123";

    jest.spyOn(api, "delete").mockResolvedValue(mockResponse);

    const result = await (handleDeleteTodo as jest.Mock)(todoId);

    expect(result).toEqual(mockResponse.data);
  });

  it("should update a todo successfully", async () => {
    const mutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({ mutate });

    const mockResponse = { message: "Todo status updated" };

    const { getByTestId } = render(
      <div>
        <QueryClientProvider client={queryClient}>
          <Todos todo={mockTodo} />
        </QueryClientProvider>
      </div>
    );

    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith();
    });
  });
});
