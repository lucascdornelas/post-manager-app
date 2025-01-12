import { useState, useEffect } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { Post } from "./types";
import { getPosts, createPost, deletePost, updatePost } from "./services/api";
import { toast, ToastContainer } from "react-toastify";

export function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loadingAction, setLoadingAction] = useState<"fetch" | "create" | "update" | "delete" | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoadingAction("fetch");
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
      toast.error("Erro ao carregar posts.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCreatePost = async (data: Partial<Post>) => {
    if (!data.title || !data.body) {
      toast.error("Título e conteúdo são obrigatórios.");
      return;
    }

    try {
      setLoadingAction("create");
      const response = await createPost({ title: data.title, body: data.body });
      if (response.status === 201) {
        setPosts((prevPosts) => [...prevPosts, response.data]);
        toast.success("Post criado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast.error("Erro ao criar post.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleUpdatePost = async (id: string, data: Partial<Post>) => {
    if (!data.title || !data.body) {
      toast.error("Título e conteúdo são obrigatórios.");
      return;
    }

    try {
      setLoadingAction("update");
      const response = await updatePost(id, data);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === id ? { ...post, ...response.data } : post))
      );
      toast.success("Post atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      toast.error("Erro ao atualizar post.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm("Deseja realmente excluir este post?")) return;

    try {
      setLoadingAction("delete");
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      toast.success("Post excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      toast.error("Erro ao excluir post.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSubmit = (data: Partial<Post>) => {
    editingPost ? handleUpdatePost(editingPost.id, data) : handleCreatePost(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Gerenciador de Posts
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <PostForm
          onSubmit={handleSubmit}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />
        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDeletePost}
          loadingAction={loadingAction}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
