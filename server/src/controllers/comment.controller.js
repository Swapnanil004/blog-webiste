const Comment = require("../models/Comment");

// Create comment
const createComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.create({
            postId: id,
            username: req.body.username,
            comment: req.body.comment
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get comments for a post
const getComments = async (req, res) => {
    try {
        const { id } = req.params;

        const comments = await Comment.find({
            postId: id
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createComment,
    getComments,
    deleteComment
};