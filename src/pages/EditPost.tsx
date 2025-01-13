import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { usePostStore } from "../store/postStore";
import { Post } from "../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPost, updatePost } from "../services/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EditPost() {
  const { id } = useParams();
  const posts = usePostStore((state) => state.posts);
  const setPost = usePostStore((state) => state.setPost);
  const updatePosts = usePostStore((state) => state.updatePosts);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  if (!id) return null;

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPost(data);
    }
  }, [isSuccess, data, setPost]);

  const mutation = useMutation({
    mutationKey: ["posts"],
    mutationFn: (data: Partial<Post>) => updatePost(id, data),
    onSuccess: (data) => {
      updatePosts(id, data);
      toast.success("Post atualizado com sucesso!");
      navigate(`/posts/${id}`);
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Erro ao atualizar post.");
    },
  });

  const editingPost = posts.find((post) => post.id.toString() === id);

  if (isLoading || !editingPost) {
    return <p>Carregando post...</p>;
  }

  const handleSubmission = (post: Partial<Post>) => {
    if (!editingPost) return;
    mutation.mutate(post);
  };

  return (
    <div>
      <PostForm onSubmit={handleSubmission} editingPost={editingPost} isPending={mutation.isPending} />
    </div>
  );
}
