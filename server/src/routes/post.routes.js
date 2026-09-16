const express = require("express");


const router = express.Router();

const {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost
} = require("../controllers/post.controller");


// Create post
router.post("/", createPost);

// Get all posts
router.get("/", getAllPosts);

// Get single post
router.get("/:id", getSinglePost);

// Update post
router.patch("/:id", updatePost);

// Delete post
router.delete("/:id", deletePost);


module.exports = router;