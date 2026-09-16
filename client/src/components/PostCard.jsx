import { Link } from "react-router-dom";

const PostCard = ({ post, onDelete }) => {
    return (
        <div className="post-card">
            <h2>{post.title}</h2>

            <p>
                {post.content.length > 150
                    ? post.content.substring(0, 150) + "..."
                    : post.content}
            </p>

            <p>
                <strong>By:</strong> {post.author}
            </p>

            <div className="post-actions">
                <Link to={`/post/${post._id}`}>
                    Read More
                </Link>

                <Link to={`/edit/${post._id}`}>
                    Edit
                </Link>

                <button
                    onClick={() => onDelete(post._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PostCard;