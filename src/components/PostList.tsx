import { Post } from '../types';
import PostItem from './PostItem';

type PostListProps = {
  posts: Post[];
  loadingAction: "fetch" | "create" | "update" | "delete" | null;
};

const PostList = (props: PostListProps) => {
  const { posts, loadingAction } = props;

  if (loadingAction === "fetch") {
    return <p>Carregando...</p>;
  }

  if (loadingAction === "delete") {
    return <p>Deletando...</p>;
  }

  if (loadingAction === "update") {
    return <p>Atualizando...</p>;
  }

  if (loadingAction === "create") {
    return <p>Criando...</p>;
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