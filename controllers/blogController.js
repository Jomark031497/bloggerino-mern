const Blog = require('../models/blogModel');
const User = require('../models/UserModel');
const { createBlogValidation } = require('../validations/blogValidation');

const createBlog = async (req, res) => {
  try {
    const { postedBy, title, body } = req.body;

    // Validate data
    const { error } = createBlogValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    const newBlog = new Blog({
      postedBy,
      title,
      body,
    });

    const saveBlog = await newBlog.save();
    res.json(saveBlog);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const showBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort([['createdAt', -1]]);

    res.send(blogs);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const singleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.send(blog)
  } catch (err) {
    res.status(400).json({ msg: err });
  }
}

const addComment = async (req, res) => {

  try {
    const commentRes = await Blog.findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: req.body.comment } }, { new: true })


    res.send(commentRes)
  }
  catch (err) {
    res.status(400).json({ msg: err });
  }
}

module.exports = {
  createBlog,
  showBlogs,
  singleBlog,
  addComment
};
