import { render, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "@/components/home/create-project-form";
import { ROUTES } from "@/components/utils/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("ProjectForm", () => {
  const mockId = "123";
  const mockProjectName = "Test Project";
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

  it("should render the form and handle form submission", async () => {
    const toggleProjectForm = jest.fn();

    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const mockMutate = jest.fn().mockResolvedValue({
      data: {
        name: mockProjectName,
        project_id: mockId,
      },
    });
    const mockMutation = {
      mutate: mockMutate,
    };
    (useMutation as jest.Mock).mockReturnValue(mockMutation);

    const mockQueryClient = {
      invalidateQueries: jest.fn(),
    };
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);

    const { getByPlaceholderText, getByText } = render(
      <ProjectForm toggleProjectForm={toggleProjectForm} />
    );

    const input = getByPlaceholderText("Enter project name");
    fireEvent.change(input, { target: { value: mockProjectName } });

    const submitButton = getByText("Create Project");
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockMutation.mutate).toHaveBeenCalledWith({
        name: mockProjectName,
      });
      expect(toggleProjectForm).toHaveBeenCalled();
    });
  });
});
