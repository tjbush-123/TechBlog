const express = require('express');
const { Post } = require('../../models');
const { Model } = require('sequelize');
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create a new post
router.post('/new', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId, // Assumes the user is logged in
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a post
router.put('/editSave/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedPost[0]) {
            res.json({ message: 'Post updated' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a post
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Post.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;