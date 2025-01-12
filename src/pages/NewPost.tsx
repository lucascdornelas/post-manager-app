import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { usePostStore } from "../store/postStore";
import { Post } from "../types";

export default function NewPost() {
  const navigate = useNavigate();
  const createPost = usePostStore((state) => state.createPost);

  const handleSubmission = (post: Partial<Post>) => {
    createPost(post);
    navigate("/");
  };

  return (
    <div>
      <PostForm onSubmit={handleSubmission} />
    </div>
  );
}
