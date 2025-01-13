import { Link } from "react-router-dom";
import { Post } from "../types";

type PostItemProps = {
  post: Post;
};

const PostItem = (props: PostItemProps) => {
  const { post } = props;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-50">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-200">{post.summary}</p>
    </div>
  );
};

export default PostItem;
