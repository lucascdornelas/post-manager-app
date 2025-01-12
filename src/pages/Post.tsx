import { Link, useParams, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";

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
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to={`/posts/${post?.id}/edit`}>Editar</Link>
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
