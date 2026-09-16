const express = require("express");

const router = express.Router();

const {
    createComment,
    getComments,
    deleteComment
} = require("../controllers/comment.controller");


// Create comment
router.post("/posts/:id/comments", createComment);

// Get comments of a post
router.get("/posts/:id/comments", getComments);

// Delete comment
router.delete("/comments/:id", deleteComment);


module.exports = router;