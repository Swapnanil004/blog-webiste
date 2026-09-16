const Post = require("../models/Post");

// Create a new post
const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body);

        res.status(201).json({
            status: "success",
            message: "Post created successfully",
            respose: post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const { search } = req.query;

        let posts;

        if (search) {
            posts = await Post.find({
                $or: [
                    {
                        title: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        content: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            });
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get a single post
const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Update a post
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete a post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost
};