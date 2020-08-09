const express = require('express');
const { createBlog, showBlogs, singleBlog, updateBlog } = require('../../controllers/blogController');
const auth = require("../../middlewares/verifyToken");
const router = express.Router();

// METHOD: GET
// DESC: GET ALL THE BLOGS
// AUTH: TRUE
router.post('/create', createBlog);

router.get('/', showBlogs);

router.get('/:id', singleBlog);

router.put("/:id", updateBlog);

module.exports = router;
