import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm";
import { usePostStore } from "../store/postStore";
import { Post } from "../types";

export default function EditPost() {
  const { id } = useParams();
  const posts = usePostStore((state) => state.posts);
  const updatePost = usePostStore((state) => state.updatePost);

  const editingPost = posts.find((post) => post.id === id);

  const handleSubmission = (post: Partial<Post>) => {
    if (!editingPost) return;

    updatePost(editingPost?.id, { ...editingPost, ...post });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <PostForm onSubmit={handleSubmission} editingPost={editingPost} />
    </div>
  );
}
