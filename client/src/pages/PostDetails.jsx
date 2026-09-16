import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Comments from "../components/Comments";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getPost = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/posts/${id}`
            );

            setPost(response.data);

        } catch (error) {
            console.log(error);
            setError("Failed to load post");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPost();
    }, [id]);

    if (loading) {
        return (
            <div className="container">
                <p className="message">
                    Loading post...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <p className="error-message">
                    {error}
                </p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container">
                <p className="message">
                    Post not found
                </p>
            </div>
        );
    }

    return (
        <div className="container">

            <button
                onClick={() => navigate("/")}
            >
                ← Back to Home
            </button>

            <article className="post-details">

                <h1>{post.title}</h1>

                <p className="author">
                    By {post.author}
                </p>

                <hr />

                <p className="post-content">
                    {post.content}
                </p>

            </article>

            <div className="comments-section">
                <Comments postId={id} />
            </div>

        </div>
    );
};

export default PostDetails;