const express = require('express');
const { Comment } = require('../../models');
const router = express.Router();

// Create a comment
router.post('/new', async (req, res) => {
    if (!req.session.loggedIn) {
        res.status(403).json({ message: "User not logged in" });
        return;
    }

    try {
        const newComment = await Comment.create({
            content: req.body.content,
            userId: req.session.userId, 
            postId: req.body.postId,
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: "Error creating comment", error: error });
    }
});


module.exports = router;