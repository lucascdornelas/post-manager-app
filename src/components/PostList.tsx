import { usePostStore } from '../store/postStore';
import PostItem from './PostItem';

const PostList = () => {
  const posts = usePostStore((state) => state.posts);

  if (!posts || !posts.length) {
    return <p>Nenhum post encontrado.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;