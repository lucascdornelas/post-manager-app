import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostPage from "../pages/Post";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";


vi.mock("@tanstack/react-query", () => {
  return {
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    QueryClient: vi.fn(),
  };
});

describe("PostPage Component", () => {
  const mockSetPost = vi.fn();
  const mockDeletePostStore = vi.fn();
  const mockMutate = vi.fn();

  beforeEach(() => {
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
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should render post content when data is fetched successfully", async () => {
    const mockPost = {
      id: "1",
      title: "Post de Teste",
      summary: "Resumo do post",
      body: "# Conteúdo em Markdown",
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockPost,
      isSuccess: true,
      isLoading: false,
    } as any);

    render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Routes>
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Post de Teste")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo em Markdown")).toBeInTheDocument();
  });

  it("should handle post deletion", async () => {
    const mockPost = {
      id: "1",
      title: "Post de Teste",
      body: "Conteúdo em **Markdown**.",
    };

    vi.mocked(useQuery).mockReturnValue({
      data: mockPost,
      isSuccess: true,
      isLoading: false,
    } as any);

    window.confirm = vi.fn(() => true);

    render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Routes>
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Excluir/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });
});
