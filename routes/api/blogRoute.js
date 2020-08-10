const express = require('express');
const { createBlog, showBlogs, singleBlog, addComment } = require('../../controllers/blogController');
const auth = require("../../middlewares/verifyToken");
const router = express.Router();

// METHOD: POST
// DESC: CREATE A NEW BLOG
// ACCESS: PRIVATE
router.post('/create',auth, createBlog);

// METHOD: GET
// DESC: GET ALL THE BLOGS
// ACCESS: PRIVATE
router.get('/', auth, showBlogs);

// METHOD: GET
// DESC: GET A BLOG
// ACCESS: PRIVATE
router.get('/:id', auth, singleBlog);

// METHOD: POST
// DESC: ADD A COMMENT
// ACCESS: PRIVATE
router.put("/:id",auth, addComment);

module.exports = router;
