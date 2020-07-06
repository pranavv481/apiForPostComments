const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: 'Comment Is Required',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: 'Post is required field',
  },
});

module.exports = mongoose.model('Comment', commentSchema);
