const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const Post = require('../models/Post');

// ✅ Create a post (requires login)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { caption, imageUrl } = req.body;

        if (!caption || !imageUrl) {
            return res.status(400).json({ error: 'Caption and image URL are required' });
        }

        const newPost = new Post({
            userId: req.user.userId,
            caption,
            imageUrl
        });

        await newPost.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// ✅ Get all posts (public)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

module.exports = router;
