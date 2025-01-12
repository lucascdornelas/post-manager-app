import { useState, useEffect } from 'react';
import { Post } from '../types';

type PostFormProps = {
  onSubmit: (data: Partial<Post>) => void;
  editingPost: Post | null;
  setEditingPost: (post: Post | null) => void;
};

const PostForm = (props: PostFormProps) => {
  const { onSubmit, editingPost, setEditingPost } = props;
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle('');
      setBody('');
    }
  }, [editingPost]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
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
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Conteúdo</label>
        <textarea
          placeholder="Conteúdo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {editingPost ? 'Atualizar' : 'Criar'}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;