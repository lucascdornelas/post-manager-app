import { create } from "zustand";
import { getPosts, createPost, deletePost, updatePost } from "../services/api";
import { Post } from "../types";
import { toast } from "react-toastify";

type LoadingAction = "fetch" | "create" | "update" | "delete" | null;

interface PostState {
  posts: Post[];
  editingPost: Post | null;
  loadingAction: LoadingAction;

  fetchPosts: () => Promise<void>;
  createPost: (data: Partial<Post>) => Promise<void>;
  updatePost: (id: string, data: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  editingPost: null,
  loadingAction: null,

  fetchPosts: async () => {
    try {
      set({ loadingAction: "fetch" });
      const response = await getPosts();
      set({ posts: response.data });
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      toast.error("Erro ao carregar posts.");
    } finally {
      set({ loadingAction: null });
    }
  },

  createPost: async (data) => {
    if (!data.title || !data.summary || !data.body){
      toast.error("Título, resumo e conteúdo são obrigatórios.");
      return;
    }

    try {
      set({ loadingAction: "create" });
      const response = await createPost({ title: data.title, summary: data.summary, body: data.body });
      if (response.status === 201) {
        set((state) => ({ posts: [...state.posts, response.data] }));
        toast.success("Post criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast.error("Erro ao criar post.");
    } finally {
      set({ loadingAction: null });
    }
  },

  updatePost: async (id, data) => {
    if (!data.title || !data.body) {
      toast.error("Título e conteúdo são obrigatórios.");
      return;
    }

    try {
      set({ loadingAction: "update" });
      const response = await updatePost(id, data);
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...response.data } : post
        ),
      }));
      toast.success("Post atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      toast.error("Erro ao atualizar post.");
    } finally {
      set({ loadingAction: null });
    }
  },

  deletePost: async (id) => {
    try {
      set({ loadingAction: "delete" });
      await deletePost(id);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }));
      toast.success("Post excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      toast.error("Erro ao excluir post.");
    } finally {
      set({ loadingAction: null });
    }
  },
}));
