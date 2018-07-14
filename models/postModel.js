import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Schema
const PostSchema = new Schema({
    slug: {
        type:String
    },
    title: {
        type:String,
        required: 'Enter a post Title'
    },
    description: {
        type: String,
        required: 'Enter a post description'
    },
    featuredImage: {
        type: String
    },
    content: {
        type: {}
    },
    author: {
        type: String
    },
    url: {
        type: String
    },
    created: {
       type: Date,
       default: Date.now 
    },
    tags: {
        type: []
    },
    category: {
        type: [],
        default: ['defaultCategory']
    }
})
//model
const Post = mongoose.model("Post", PostSchema);

export default Post;