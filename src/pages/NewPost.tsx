import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { Post } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../services/api";
import { toast } from "react-toastify";
import { usePostStore } from "../store/postStore";

export default function NewPost() {
  const navigate = useNavigate();
  const setPost = usePostStore((state) => state.setPost);

  const mutation = useMutation({
    mutationKey: ["posts"],
    scope: { id: "posts"},
    mutationFn: createPost,
    onSuccess: (data) => {
      setPost(data);
      toast.success("Post criado com sucesso!");
      navigate("/");
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Erro ao criar post.");
    },
  });

  const handleSubmission = (post: Partial<Post>) => {
    mutation.mutate(post);
  };

  return (
    <div>
      <PostForm onSubmit={handleSubmission} isPending={mutation.isPending} />
    </div>
  );
}
