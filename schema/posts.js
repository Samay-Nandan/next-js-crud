const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    createdAt: Date,
    published: Boolean
});

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
