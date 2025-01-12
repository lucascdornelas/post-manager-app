import { Link, useParams, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import Button from "../components/ui/Button";
import React from "react";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = usePostStore((state) => state.posts);
  const deletePost = usePostStore((state) => state.deletePost);

  const post = posts.find((post) => post.id === id);

  const handleDelete = () => {
    if (!id) return;

    if (!window.confirm("Tem certeza que deseja excluir este post?")) return;

    deletePost(id);

    navigate("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{post?.title}</h1>
      <p className="text-gray-700">
        {post?.body.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      <div className="flex gap-4 mt-4 w-full justify-end">
        <Button variant="destructive" onClick={handleDelete}>
          Excluir
        </Button>
        <Link to={`/posts/${post?.id}/edit`}>
          <Button>Editar</Button>
        </Link>
      </div>
    </div>
  );
}
