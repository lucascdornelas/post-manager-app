import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { usePostStore } from "../store/postStore";

export default function Home() {
  const posts = usePostStore((state) => state.posts);
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const loadingAction = usePostStore((state) => state.loadingAction);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <PostList posts={posts} loadingAction={loadingAction} />
    </div>
  );
}
