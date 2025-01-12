import { Link } from "react-router-dom";

type PostItemProps = {
  post: {
    id: string;
    title: string;
    body: string;
  };
};

const PostItem = (props: PostItemProps) => {
  const { post } = props;

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="text-gray-600">{post.body}</p>
    </div>
  );
};

export default PostItem;
