import { getPosts, addNewPost, updatePost, getPostById, deletePost } from "../middlewares/post.middleware";

const postRoutes = app => {
    app
      .route("/api/posts")
      .get(getPosts)
      .post(addNewPost);
    app
      .route("/api/posts/:postId")
      //Put Request
      .put(updatePost)
  
      //Get request for specific Post
      .get(getPostById)
  
      //Delete Post
      .delete(deletePost);
  };
  
  export default postRoutes;