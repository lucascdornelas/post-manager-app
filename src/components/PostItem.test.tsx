import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostItem from "./PostItem";

describe("PostItem Component", () => {
  it("should render post title and summary", () => {
    const post = {
      id: "1",
      title: "Título do Post",
      summary: "Resumo do post para teste.",
      body: "Conteudo do post para teste.",
    };

    render(
      <MemoryRouter>
        <PostItem post={post} />
      </MemoryRouter>
    );

    expect(screen.getByText("Título do Post")).toBeInTheDocument();
    expect(screen.getByText("Resumo do post para teste.")).toBeInTheDocument();
  });

  it("should render a link to the post details page", () => {
    const post = {
      id: "2",
      title: "Outro Post",
      summary: "Outro resumo.",
      body: "Outro conteudo",
    };

    render(
      <MemoryRouter>
        <PostItem post={post} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link", { name: /Outro Post/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/posts/2");
  });
});
