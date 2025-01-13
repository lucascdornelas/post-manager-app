import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { usePostStore } from "../store/postStore";
import { useMutation } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import NewPost from "./NewPost";

vi.mock("../store/postStore", () => ({
  usePostStore: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  QueryClient: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate(),
  };
});

describe("NewPost Component", () => {
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

  it("should create a new post and navigate to home", async () => {
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    } as any);

    render(
      <BrowserRouter>
        <NewPost />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText("Título do Post"), {
      target: { value: "Novo Post" },
    });
    fireEvent.change(screen.getByLabelText("Resumo do Post"), {
      target: { value: "Resumo do novo post." },
    });
    fireEvent.change(screen.getByPlaceholderText("Conteúdo"), {
      target: { value: "Conteúdo do novo post." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Criar/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });
});
