import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get posts
    const getPosts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/posts?search=${search}`
            );

            setPosts(response.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load posts");
        } finally {
            setLoading(false);
        }
    };

    // Delete post
    const deletePost = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/posts/${id}`);

            setPosts(
                posts.filter((post) => post._id !== id)
            );
        } catch (error) {
            console.log(error);
            setError("Failed to delete post");
        }
    };

    // Load posts
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="container">

            <h1 className="page-title">
                Simple Blog
            </h1>

            {/* Search */}
            <div className="search-box">

                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button onClick={getPosts}>
                    Search
                </button>

            </div>

            {/* Loading */}
            {loading && (
                <p className="message">
                    Loading posts...
                </p>
            )}

            {/* Error */}
            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {/* Posts */}
            {!loading && !error && (
                posts.length === 0 ? (
                    <p className="message">
                        No posts found
                    </p>
                ) : (
                    <div className="posts-container">
                        {posts.map((post) => (
                            <PostCard
                                key={post._id}
                                post={post}
                                onDelete={deletePost}
                            />
                        ))}
                    </div>
                )
            )}

        </div>
    );
};

export default Home;