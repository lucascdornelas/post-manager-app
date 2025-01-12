import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import { usePostStore } from "../store/postStore";

export default function Home() {
  const posts = usePostStore((state) => state.posts);
  const loadingAction = usePostStore((state) => state.loadingAction);

  return (
    <div>
      <PostList posts={posts} loadingAction={loadingAction} />
    </div>
  );
}
