const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
    try {
        res.json(await Blog.getAll())
    } catch (err) {
        res.status(500).json({message: `Something went wrong: ${err}`});
    }
}

exports.getBlogById = async (req, res) => {
    try {
        res.json(await Blog.getByIdSafe(req.params.id))
        res.status(200).send();
    } catch (err) {
        res.status(500).json({message: `Something went wrong: ${err}`});
    }
}

exports.postBlog = async (req, res) => {
    try {
        await Blog.createFromPayload(req.body)
        res.status(201).send();
    } catch (err) {
        res.status(500).json({message: `Something went wrong: ${err}`});
    }
}

exports.putBlogById = async (req, res) => {
    try {
        await Blog.updateByIdSafe(req.params.id, req.body)
        res.status(200).send();
    } catch (err) {
        res.status(500).json({message: `Something went wrong: ${err}`});
    }
}

exports.deleteBlogById = async (req, res) => {
    try {
        await Blog.deleteByIdSafe(req.params.id)
        res.status(204).send();
    } catch (err) {
        res.status(500).json({message: `Something went wrong: ${err}`});
    }
}