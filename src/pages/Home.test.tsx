import { render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";
import { usePostStore } from "../store/postStore";
import { useQuery } from "@tanstack/react-query";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

vi.mock("../store/postStore", () => ({
  usePostStore: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

describe("Home Component", () => {
  const mockSetPosts = vi.fn();
  const mockSetPost = vi.fn();
  const mockDeletePost = vi.fn();
  const mockUpdatePosts = vi.fn();

  beforeEach(() => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        posts: [],
        editingPost: null,
        setPosts: mockSetPosts,
        setPost: mockSetPost,
        deletePost: mockDeletePost,
        updatePosts: mockUpdatePosts,
      })
    );
    mockSetPosts.mockClear();
  });

  it("should display loading state when posts are loading", () => {
    vi.mocked(useQuery).mockReturnValue({
      isLoading: true,
    } as any);

    render(<Home />);

    expect(screen.getByText("Carregando posts...")).toBeInTheDocument();
  });

  it("should render posts when data is fetched successfully", async () => {
    const mockPosts = [
      { id: "1", title: "Post 1", summary: "Resumo 1", body: "Conteúdo 1" },
      { id: "2", title: "Post 2", summary: "Resumo 2", body: "Conteúdo 2" },
    ];

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        posts: mockPosts,
        editingPost: null,
        setPosts: mockSetPosts,
        setPost: mockSetPost,
        deletePost: mockDeletePost,
        updatePosts: mockUpdatePosts,
      })
    );

    vi.mocked(useQuery).mockReturnValue({
      data: mockPosts,
      isSuccess: true,
      isLoading: false,
    } as any);

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockSetPosts).toHaveBeenCalledWith(mockPosts);
    });

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });
});
