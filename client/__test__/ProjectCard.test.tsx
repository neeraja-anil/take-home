import { render, screen, fireEvent } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import ProjectCard from "@/components/home/project-card/card";
import "@testing-library/jest-dom/extend-expect";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(),
}));

const queryClient = new QueryClient();

describe("ProjectCard component", () => {
  it("renders project name and description", () => {
    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <ProjectCard
            project={{
              name: "Project Name",
              description: "Project Description",
              todos: [],
            }}
          />
        </QueryClientProvider>
      </div>
    );

    expect(screen.getByText("Project Name")).toBeInTheDocument();
    expect(screen.getByText("Project Description")).toBeInTheDocument();
  });

  it("calls onDeleteProject when Trash2 icon is clicked", () => {
    const onDeleteProject = jest.fn();

    (useMutation as jest.Mock).mockReturnValue({
      mutate: onDeleteProject,
    });

    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <ProjectCard
            project={{
              name: "Project Name",
              description: "Project Description",
              todos: [],
            }}
          />
        </QueryClientProvider>
      </div>
    );

    const trashIcon = screen.getByTestId("delete-project");
    fireEvent.click(trashIcon);
    expect(onDeleteProject).toHaveBeenCalledTimes(1);
  });
});
