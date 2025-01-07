import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

// @todo Implementar as funções getPosts, createPost, updatePost e deletePost.

export default api;