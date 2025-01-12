import { useState, useEffect } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { Post } from './types';

export function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    // @todo: Implementar a função para buscar os posts da API
  }, []);

  const handleCreatePost = async (data: Partial<Post>) => {
    // @todo: Implementar a função para criar um novo post
  };

  const handleUpdatePost = async (id: string, data: Partial<Post>) => {
    // @todo: Implementar a função para atualizar um post existente
  };

  const handleDeletePost = async (id: string) => {
    // @todo: Implementar a função para deletar um post
  };

  const handleSubmit = (data: Partial<Post>) => {
    if (editingPost && data.id) {
      handleUpdatePost(data.id, data);
    } else {
      handleCreatePost(data);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Gerenciador de Posts</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <PostForm
          onSubmit={handleSubmit}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />
        <PostList posts={posts} onEdit={setEditingPost} onDelete={handleDeletePost} />
      </div>
    </div>
  );
}
