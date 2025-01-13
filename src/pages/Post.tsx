import { Link, useParams, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import Button from "../components/ui/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPost, deletePost } from "../services/api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { queryClient } from "../main";
import { Post } from "../types";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const setPost = usePostStore((state) => state.setPost);
  const deletePostStore = usePostStore((state) => state.deletePost);
  const posts = usePostStore((state) => state.posts);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
    initialData: () => {
      const allPosts = queryClient.getQueryData(["posts"]) as Post[];
      return allPosts?.find(post => post.id === id);
    }
  });

  useEffect(() => {
    if (isSuccess && data && !posts.find((post) => post.id === id)) {
      setPost(data);
    }
  }, [isSuccess, data, setPost]);

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  if (!id) return null;

  const mutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      deletePostStore(id);
      toast.success("Post excluído com sucesso!");
      navigate(`/`);
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Erro ao excluir post.");
    },
  });
  const post = posts.find((post) => post.id === id);

  const handleDelete = () => {
    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    mutation.mutate();
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post?.title}</h1>
      <ReactMarkdown className="custom-html-style" remarkPlugins={[remarkGfm]}>
        {post?.body}
      </ReactMarkdown>
      <div className="flex gap-4 mt-4 w-full justify-end">
        <Button variant="destructive" onClick={handleDelete} loading={mutation.isPending}>
          Excluir
        </Button>
        <Link to={`/posts/${post?.id}/edit`}>
          <Button>Editar</Button>
        </Link>
      </div>
    </div>
  );
}
