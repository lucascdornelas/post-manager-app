import { useState } from "react";
import { Post } from "../types";
import { usePostStore } from "../store/postStore";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";

type PostFormProps = {
  onSubmit: (data: Partial<Post>) => void;
  editingPost?: Post;
};

const PostForm = (props: PostFormProps) => {
  const { onSubmit, editingPost } = props;

  const [title, setTitle] = useState(editingPost?.title || "");
  const [body, setBody] = useState(editingPost?.body || "");

  const loadingAction = usePostStore((state) => state.loadingAction);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (editingPost) {
      onSubmit({ id: editingPost.id, title, body });
    } else {
      onSubmit({ title, body });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Título</label>
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Conteúdo</label>
        <Textarea
          placeholder="Conteúdo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4 justify-end">
        <Button
          type="submit"
          className={`
            ${
              loadingAction === "create" || loadingAction === "update"
                ? "cursor-not-allowed opacity-50"
                : ""
            }
            `}
          disabled={loadingAction === "create" || loadingAction === "update"}
        >
          {editingPost ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
