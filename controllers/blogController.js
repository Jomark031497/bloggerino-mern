const Blog = require('../models/blogModel');
const User = require('../models/UserModel');
const { createBlogValidation } = require('../validations/blogValidation');

const createBlog = async (req, res) => {
  try {
    const { postedBy, title, body } = req.body;

    // Validate data
    const { error } = createBlogValidation(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });
    console.log(req.body)
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
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

module.exports = {
  createBlog,
  showBlogs,
};
