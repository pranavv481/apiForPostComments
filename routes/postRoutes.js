const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/Post');
const Post = mongoose.model('Post');

router.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  res.send(posts);
});

router.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.send(post);
});

router.get('/posts/:postId', async (req, res) => {
  const post = await Post.findById({ _id: req.params.postId });
  res.send(post);
});

router.put('/posts/:postId', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    { _id: req.params.postId },
    req.body,
    { new: true, runValidators: true }
  );
  res.send(post);
});

router.delete('/posts/:postId', async (req, res) => {
  const post = await Post.findByIdAndDelete({ _id: req.params.postId });
  res.send(post);
});

module.exports = router;
