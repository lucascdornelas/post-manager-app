import axios from "axios";
import { Post } from "../types";

const api = axios.create({
  baseURL: "https://6783a99b8b6c7a1316f52470.mockapi.io",
});

async function getPosts() {
  const response = await api.get("/posts");
  return response.data;
}

async function getPost(id?: string) {
  if (!id) {
    throw new Error("No ID provided");
  }

  const response = await api.get(`/posts/${id}`);
  return response.data;
}

async function createPost(data: Partial<Post>) {
  if (!data.title || !data.summary || !data.body) {
    throw new Error("Title, summary, and body are required");
  }

  const response = await api.post("/posts", data);

  return response.data;
}

async function updatePost(id: string, data: Partial<Post>) {
  if (!id) {
    throw new Error("No ID provided");
  }

  if (!data.title || !data.summary || !data.body) {
    throw new Error("Title, summary, and body are required");
  }

  const response = await api.put(`/posts/${id}`, data);

  return response.data;
}

async function deletePost(id: string): Promise<Post> {
  if (!id) {
    throw new Error("No ID provided");
  }

  const response = await api.delete(`/posts/${id}`);

  return response.data;
}

export { getPosts, getPost, createPost, updatePost, deletePost };
