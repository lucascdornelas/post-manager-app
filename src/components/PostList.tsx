import { Post } from '../types';
import PostItem from './PostItem';

type PostListProps = {
  posts: Post[];
};

const PostList = (props: PostListProps) => {
  const { posts } = props;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;