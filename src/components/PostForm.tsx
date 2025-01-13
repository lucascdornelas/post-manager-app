import { Controller, useForm } from "react-hook-form";
import { Post } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import MarkdownEditor from "./MarkdownEditor";

type PostFormProps = {
  onSubmit: (data: Partial<Post>) => void;
  editingPost?: Post;
  isPending?: boolean;
};

type PostForm = {
  title: string;
  summary: string;
  body: string;
};

const PostForm = (props: PostFormProps) => {
  const { onSubmit, editingPost, isPending } = props;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostForm>({
    defaultValues: editingPost
      ? {
          title: editingPost.title,
          summary: editingPost.summary,
          body: editingPost.body,
        }
      : {},
  });

  const handleSubmitForm = (data: PostForm) => {
    if (editingPost) {
      if (window.confirm("Deseja realmente atualizar este post?")) {
        onSubmit({ id: editingPost.id, ...data });
      }
    } else {
      onSubmit({ ...data });
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Título
        </label>
        <Input
          id="title"
          aria-label="Título do Post"
          type="text"
          placeholder="Título"
          {...register("title", {
            required: "O título é obrigatório",
            minLength: {
              value: 5,
              message: "O título deve ter pelo menos 5 caracteres",
            },
          })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="summary" className="block text-gray-700 font-bold mb-2">
          Resumo
        </label>
        <Textarea
          id="summary"
          aria-label="Resumo do Post"
          placeholder="Resumo"
          {...register("summary", {
            required: "O resumo é obrigatório",
            minLength: {
              value: 10,
              message: "O resumo deve ter pelo menos 10 caracteres",
            },
          })}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
          Conteúdo
        </label>
        <Controller
          name="body"
          control={control}
          rules={{ required: "O conteúdo é obrigatório" }}
          render={({ field }) => (
            <MarkdownEditor
              id="body"
              value={field.value}
              onChange={field.onChange}
              placeholder="Conteúdo"
            />
          )}
        />
        {errors.body && (
          <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-4 justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className={`flex items-center ${
            isPending ? "cursor-not-allowed opacity-50" : ""
          }`}
          loading={isPending}
          size="lg"
        >
          {editingPost ? "Atualizar" : "Criar"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
