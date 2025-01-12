import { useState } from "react";
import { useForm } from "react-hook-form";
import { Post } from "../types";
import { usePostStore } from "../store/postStore";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/TextArea";

type PostFormProps = {
  onSubmit: (data: Partial<Post>) => void;
  editingPost?: Post;
};

type PostForm = {
  title: string;
  body: string;
};

const PostForm = (props: PostFormProps) => {
  const { onSubmit, editingPost } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>(editingPost ? { defaultValues: editingPost } : {});

  const loadingAction = usePostStore((state) => state.loadingAction);

  const handleSubmitForm = (data: PostForm) => {
    if (editingPost) {
      onSubmit({ id: editingPost.id, title: data.title, body: data.body });
    } else {
      onSubmit({ title: data.title, body: data.body });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Título</label>
        <Input
          type="text"
          placeholder="Título"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Conteúdo</label>
        <Textarea
          placeholder="Conteúdo"
          {...register("body", { required: true })}
        />
        {errors.body && (
          <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
        )}
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
