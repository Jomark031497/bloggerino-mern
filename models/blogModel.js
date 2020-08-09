const { Schema, model } = require('mongoose');

const blogSchema = new Schema({

  postedBy: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: [{ user: String, comment: String }]
}, {
  timestamps: true
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;
