const express = require('express');
const blogController = require('../controllers/blog.controller');
const router = express.Router();

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', blogController.postBlog);
router.put('/:id', blogController.putBlogById);
router.delete('/:id', blogController.deleteBlogById);

module.exports = router;