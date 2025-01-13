import { create } from "zustand";
import { Post } from "../types";

interface PostState {
  posts: Post[];
  editingPost: Post | null;

  setPosts: (posts: Post[]) => void;
  setPost: (post: Post) => void;
  deletePost: (id: string) => void;
  updatePosts: (id: string, data: Partial<Post>) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  editingPost: null,

  setPosts: (posts) => set({ posts }),

  setPost: (post) => set({ posts: [...get().posts, post] }),

  updatePosts: (id, data) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...data } : post
      ),
    }));
  },

  deletePost: (id) => {
    const posts = get().posts.filter((post) => post.id !== id);
    set({ posts });
  }
}));
