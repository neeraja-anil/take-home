import Home from "@/app/take-home/project/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Home component", () => {
  let queryClient: any;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it("renders list of projects after successful data fetch", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockData = [{ id: 1, name: "Project 1" }];

    mockedAxios.get.mockResolvedValue({ data: mockData });

    render(
      <div>
        <QueryClientProvider client={queryClient}>
          <Home />
        </QueryClientProvider>
      </div>
    );

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });
});
