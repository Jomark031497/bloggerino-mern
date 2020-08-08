const express = require('express');
const { createBlog, showBlogs } = require('../../controllers/blogController');

const router = express.Router();

// METHOD: GET
// DESC: GET ALL THE BLOGS
// AUTH: TRUE
router.post('/create', createBlog);

router.get('/', showBlogs);

module.exports = router;
