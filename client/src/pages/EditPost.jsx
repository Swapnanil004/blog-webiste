import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");

    // Get post
    const getPost = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/posts/${id}`
            );

            setTitle(response.data.title);
            setContent(response.data.content);
            setAuthor(response.data.author);

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

    // Update post
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !author) {
            setError("Please fill all fields");
            return;
        }

        try {
            setUpdating(true);
            setError("");

            await api.patch(`/posts/${id}`, {
                title,
                content,
                author
            });

            navigate(`/post/${id}`);

        } catch (error) {
            console.log(error);
            setError("Failed to update post");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <p className="message">
                    Loading post...
                </p>
            </div>
        );
    }

    if (error && !title) {
        return (
            <div className="container">
                <p className="error-message">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="form-card">

                <h1>Edit Post</h1>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <label>
                        Title
                    </label>

                    <input
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <label>
                        Content
                    </label>

                    <textarea
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                    />

                    <label>
                        Author
                    </label>

                    <input
                        value={author}
                        onChange={(e) =>
                            setAuthor(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={updating}
                    >
                        {updating
                            ? "Updating..."
                            : "Update"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>
    );
};

export default EditPost;