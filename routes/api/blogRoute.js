const express = require('express');
const { createBlog, showBlogs, singleBlog } = require('../../controllers/blogController');

const router = express.Router();

// METHOD: GET
// DESC: GET ALL THE BLOGS
// AUTH: TRUE
router.post('/create', createBlog);

router.get('/', showBlogs);

router.get('/:id', singleBlog);

module.exports = router;
