import axios from 'axios';
import { Post } from '../types';

const api = axios.create({
  baseURL: 'https://6783a99b8b6c7a1316f52470.mockapi.io',
});

// @todo Implementar as funções getPosts, createPost, updatePost e deletePost.
function getPosts() {
  return api.get('/posts');
}

function createPost(data: Partial<Post>) {
  return api.post('/posts', data);
}

function updatePost(id: string, data: Partial<Post>) {
  return api.put(`/posts/${id}`, data);
}

function deletePost(id: string): Promise<Post> {
  return api.delete(`/posts/${id}`)
}

export { getPosts, createPost, updatePost, deletePost };