const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../model/Comment');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

// add a comment of specific post
router.post('/posts/:postId/comment', async (req, res) => {
  // find post
  const post = await Post.findOne({ _id: req.params.postId });
  // create post
  const comment = new Comment(req.body);
  comment.post = post._id;
  await comment.save();
  // associate post with comments
  post.comments.push(comment._id);
  await post.save();

  res.send(comment);
});

// read a comment
router.get('/posts/:postId/comment', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    'comments'
  );
  res.send(post);
});

// edit a comment
router.put('/posts/comment/:commentId', async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.commentId },
    req.body,
    { new: true, runValidators: true }
  );
  res.send(comment);
});

// delete comment from comments and posts both
router.delete('/posts/comment/:postId/:commentId', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.postId,
    {
      $pull: { comments: req.params.commentId },
    },
    { new: true }
  );
  if (!post) {
    return res.status(400).send('Post not found');
  }
  await Comment.findOneAndDelete({ _id: req.params.commentId });

  res.send({ message: 'Comment successfully Deleted' });
});

module.exports = router;
