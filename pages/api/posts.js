const Post = require("../../schema/posts")
const { connectToDatabase } = require('../../database/mongodb')

export default async function handler (req, res) {

    //Connect to mongo DB
    await connectToDatabase();

    switch (req.method) {
        case 'GET':
            return getPosts(req, res);

        case 'POST':
            return addPost(req, res);

        case 'PUT': 
            return updatePost(req, res);

        case 'DELETE': 
            return deletePost(req, res);
    }
}

// Getting all posts.
export async function getPosts(req, res) {
    try {
        const posts = await Post.find({}).sort({ published: -1 });
        return res.json({
            message: posts,
            success: true
        })
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new post
export async function addPost(req, res) {
    try {
        const post = new Post(req.body);
        await post.save()
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Updating a post
export async function updatePost(req, res) {
    try {
        await Post.findByIdAndUpdate(req.body, { published: true })
        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting a post
export async function deletePost(req, res) {

    try {

        await Post.findByIdAndDelete(req.body)
        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}