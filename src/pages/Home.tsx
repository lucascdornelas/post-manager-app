import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { usePostStore } from "../store/postStore";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/api";

export default function Home() {
  const setPosts = usePostStore((state) => state.setPosts);
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setPosts(data);
    }
  }, [isSuccess, data, setPosts]);

  const posts = usePostStore((state) => state.posts);

  if (isLoading) {
    return <p>Carregando posts...</p>;
  }

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
