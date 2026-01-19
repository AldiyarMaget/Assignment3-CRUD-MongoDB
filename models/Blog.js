// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        author: { type: String, optional: true, default:"Anonymous"},
        title: { type: String, required: true, minlength: 1, trim: true },
        content: { type: String, required: true, minlength: 1 },
    },
    { timestamps: true }
);

blogSchema.statics.createFromPayload = async function (payload) {
    const {author, title, content } = payload;

    if (!title || !content) {
        const err = new Error('title and content are required');
        err.statusCode = 400;
        throw err;
    }

    return this.create({author, title, content });
};

blogSchema.statics.getAll = async function () {
    return await this.find({}).lean();
}

blogSchema.statics.getByIdSafe = async function (id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Id is invalid');
        err.statusCode = 400;
        throw err;
    }
    const doc = await this.findById(id);
    if (!doc) {
        const err = new Error('Blog not found')
        err.statusCode = 404;
        throw err;
    }
    return doc;
}

blogSchema.statics.deleteByIdSafe = async function (id) {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Id is invalid');
        err.statusCode = 400;
        throw err;
    }
    const deleted = await this.findByIdAndDelete(id).lean();
    if (!deleted) {
        const err = new Error('Blog not found')
        err.statusCode = 404;
        throw err;
    }
}

blogSchema.statics.updateByIdSafe = async function (id, payload) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const err = new Error('Invalid id');
        err.statusCode = 400;
        throw err;
    }

    const updated = await this.findByIdAndUpdate(
        id,
        { author: payload.author,title: payload.title, content: payload.content },
        { new: true, runValidators: true }
    );

    if (!updated) {
        const err = new Error('Blog not found');
        err.statusCode = 404;
        throw err;
    }

    return updated;
};

module.exports = mongoose.model('Blog', blogSchema);
