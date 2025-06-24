
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caption: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
