import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostList from "./PostList";
import { usePostStore } from "../store/postStore";
import { BrowserRouter } from "react-router-dom";

vi.mock("../store/postStore", () => ({
  usePostStore: vi.fn(),
}));

describe("PostList Component", () => {
  it("should render posts when they are available", () => {
    vi.mocked(usePostStore).mockImplementation((selector) => {
      return selector({
        posts: [
          {
            id: "1",
            title: "Post 1",
            summary: "Resumo do Post 1",
            body: "Conteúdo do Post 1",
          },
          {
            id: "2",
            title: "Post 2",
            summary: "Resumo do Post 2",
            body: "Conteúdo do Post 2",
          },
        ],
        editingPost: null,
        setPosts: vi.fn(),
        setPost: vi.fn(),
        deletePost: vi.fn(),
        updatePosts: vi.fn(),
      });
    });

    render(
      <BrowserRouter>
        <PostList />
      </BrowserRouter>
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();

    expect(screen.getByText("Resumo do Post 1")).toBeInTheDocument();
    expect(screen.getByText("Resumo do Post 2")).toBeInTheDocument();
  });

  it("should show 'Nenhum post encontrado.' when there are no posts", () => {
    vi.mocked(usePostStore).mockImplementation((selector) => {
      return selector({
        posts: [],
        editingPost: null,
        setPosts: vi.fn(),
        setPost: vi.fn(),
        deletePost: vi.fn(),
        updatePosts: vi.fn(),
      });
    });

    render(
      <BrowserRouter>
        <PostList />
      </BrowserRouter>
    );

    expect(screen.getByText("Nenhum post encontrado.")).toBeInTheDocument();
  });
});
