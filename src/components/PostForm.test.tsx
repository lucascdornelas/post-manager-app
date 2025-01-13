import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostForm from "./PostForm";

const mockOnSubmit = vi.fn();

describe("PostForm Component", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("should render form fields and submit new post", async () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText("Título do Post"), {
      target: { value: "Novo Título" },
    });

    fireEvent.change(screen.getByLabelText("Resumo do Post"), {
      target: { value: "Este é um resumo válido." },
    });

    fireEvent.change(screen.getByPlaceholderText("Conteúdo"), {
      target: { value: "Este é o conteúdo do post." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Criar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Novo Título",
        summary: "Este é um resumo válido.",
        body: "Este é o conteúdo do post.",
      });
    });
  });

  it("should show validation errors when fields are empty", async () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /Criar/i }));

    expect(
      await screen.findByText("O título é obrigatório")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("O resumo é obrigatório")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("O conteúdo é obrigatório")
    ).toBeInTheDocument();

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should show 'Atualizar' button when editing a post", () => {
    const editingPost = {
      id: "1",
      title: "Post Existente",
      summary: "Resumo existente",
      body: "Conteúdo existente",
    };

    render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} />);

    expect(screen.getByDisplayValue("Post Existente")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Resumo existente")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Conteúdo existente")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Atualizar/i })
    ).toBeInTheDocument();
  });

  it("should edit an existing post and submit edited post",  async () => {
    const editingPost = {
      id: "1",
      title: "Post Existente",
      summary: "Resumo existente",
      body: "Conteúdo existente",
    };

    render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} />);

    fireEvent.change(screen.getByLabelText("Título do Post"), {
      target: { value: "Post Existente - Edit" },
    });

    fireEvent.change(screen.getByLabelText("Resumo do Post"), {
      target: { value: "Resumo existente - Edit" },
    });

    fireEvent.change(screen.getByPlaceholderText("Conteúdo"), {
      target: { value: "Conteúdo existente - Edit" },
    });

    window.confirm = vi.fn(() => true);

    fireEvent.click(screen.getByRole("button", { name: /Atualizar/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        id: "1",
        title: "Post Existente - Edit",
        summary: "Resumo existente - Edit",
        body: "Conteúdo existente - Edit",
      });
    });
  })
});
