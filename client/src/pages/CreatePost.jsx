import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreatePost = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !author) {
            setError("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            await api.post("/posts", {
                title,
                content,
                author
            });

            setTitle("");
            setContent("");
            setAuthor("");

            setSuccess("Post created successfully");

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {
            console.log(error);
            setError("Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">

            <div className="form-card">

                <h1>Create Post</h1>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="success-message">
                        ✓ {success}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <label>
                        Content
                    </label>

                    <textarea
                        placeholder="Write your post..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                    />

                    <label>
                        Author
                    </label>

                    <input
                        type="text"
                        placeholder="Enter author name"
                        value={author}
                        onChange={(e) =>
                            setAuthor(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreatePost;