const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is Required',
    },
    content: {
      type: String,
      required: 'Content is Required',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: 'Comment Is Required',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
