import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { usePostStore } from "../store/postStore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import EditPost from "./EditPost";

vi.mock("../store/postStore", () => ({
  usePostStore: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  QueryClient: vi.fn(),
}));

describe("PostPage Component", () => {
  const mockSetPost = vi.fn();
  const mockDeletePostStore = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        setPost: mockSetPost,
        deletePost: mockDeletePostStore,
        posts: [],
        editingPost: null,
        setPosts: vi.fn(),
        updatePosts: vi.fn(),
      })
    );
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);

    mockSetPost.mockClear();
    mockDeletePostStore.mockClear();
    mockMutate.mockClear();
  });

  it("should display loading state when post is loading", () => {
    vi.mocked(useQuery).mockReturnValue({ isLoading: true } as any);

    render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Routes>
          <Route path="/posts/:id" element={<EditPost />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Carregando post...")).toBeInTheDocument();
  });

  it("should update post content when data is not in store", async () => {
    const mockPost = {
      id: "1",
      title: "Post de Teste",
      summary: "Resumo post de teste",
      body: "Conteúdo em **Markdown**.",
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockPost,
      isSuccess: true,
      isLoading: false,
    } as any);

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        posts: [],
        editingPost: null,
        setPosts: vi.fn(),
        setPost: mockSetPost,
        deletePost: vi.fn(),
        updatePosts: vi.fn(),
      })
    );

    render(
        <MemoryRouter initialEntries={["/posts/1"]}>
          <Routes>
            <Route path="/posts/:id" element={<EditPost />} />
          </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockSetPost).toHaveBeenCalledWith(mockPost);
    }); 
  });
  
  it("should render post content when data is fetched successfully", async () => {
    const mockPost = {
      id: "1",
      title: "Post de Teste",
      summary: "Resumo post de teste",
      body: "Conteúdo em **Markdown**.",
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockPost,
      isSuccess: true,
      isLoading: false,
    } as any);

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        posts: [mockPost],
        editingPost: null,
        setPosts: vi.fn(),
        setPost: mockSetPost,
        deletePost: vi.fn(),
        updatePosts: vi.fn(),
      })
    );

    render(
        <MemoryRouter initialEntries={["/posts/1"]}>
          <Routes>
            <Route path="/posts/:id" element={<EditPost />} />
          </Routes>
        </MemoryRouter>
    );

    expect(screen.getByDisplayValue("Post de Teste")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Resumo post de teste")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Conteúdo em **Markdown**.")).toBeInTheDocument();
  });
});
