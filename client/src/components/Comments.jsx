import { useEffect, useState } from "react";
import api from "../services/api";

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Get comments
    const getComments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/posts/${postId}/comments`
            );

            setComments(response.data);

        } catch (error) {
            console.log(error);
            setError("Failed to load comments");
        } finally {
            setLoading(false);
        }
    };

    // Create comment
    const createComment = async (e) => {
        e.preventDefault();

        if (!username || !comment) {
            setError("Please fill all fields");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            await api.post(
                `/posts/${postId}/comments`,
                {
                    username,
                    comment
                }
            );

            setUsername("");
            setComment("");

            await getComments();

        } catch (error) {
            console.log(error);
            setError("Failed to create comment");
        } finally {
            setSubmitting(false);
        }
    };

    // Delete comment
    const deleteComment = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/comments/${id}`);

            getComments();

        } catch (error) {
            console.log(error);
            setError("Failed to delete comment");
        }
    };

    useEffect(() => {
        getComments();
    }, [postId]);

    return (
        <div>

            <h2>Comments</h2>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {loading ? (
                <p className="message">
                    Loading comments...
                </p>
            ) : comments.length === 0 ? (
                <p className="message">
                    No comments yet
                </p>
            ) : (
                comments.map((comment) => (
                    <div
                        className="comment-card"
                        key={comment._id}
                    >
                        <strong>
                            {comment.username}
                        </strong>

                        <p>
                            {comment.comment}
                        </p>

                        <button
                            onClick={() =>
                                deleteComment(
                                    comment._id
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}

            <div className="comment-form">

                <h3>Add a Comment</h3>

                <form onSubmit={createComment}>

                    <input
                        type="text"
                        placeholder="Your name"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <textarea
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting
                            ? "Posting..."
                            : "Comment"}
                    </button>

                </form>

            </div>

        </div>
    );
};

export default Comments;