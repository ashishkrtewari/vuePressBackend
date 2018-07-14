import { getPosts, addNewPost, updatePost, getPostById, deletePost } from "../middlewares/post.middleware";

const routes = app => {
    app
      .route("/posts")
      .get(getPosts)
      .post(addNewPost);
    app
      .route("/posts/:postId")
      //Put Request
      .put(updatePost)
  
      //Get request for specific Post
      .get(getPostById)
  
      //Delete Post
      .delete(deletePost);
  };
  
  export default routes;