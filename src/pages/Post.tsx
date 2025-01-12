import { Link, useParams, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import Button from "../components/ui/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{post?.title}</h1>
      <ReactMarkdown className="custom-html-style" remarkPlugins={[remarkGfm]}>
        {post?.body}
      </ReactMarkdown>
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
