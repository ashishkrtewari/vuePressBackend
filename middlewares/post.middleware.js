import mongoose from "mongoose";
import Post from "../models/postModel";
import { ObjectID } from "mongodb";

export const addNewPost = (req, res) => {
  let newPost = new Post(req.body);
  newPost.slug = newPost.title.split(' ').join('-').toLowerCase();
  newPost.save((err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
};

export const getPosts = (req, res) => {
  Post.find({}, (err, post) => {
    if (err) {
      res.send(err);
    }
    res.json(post);
  });
};

export const getPostById = (req, res) => {

  if (!ObjectID.isValid(req.params.postId)) {
    Post.findOne({ 'slug': req.params.postId }, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  }
  else {
    Post.findOne({ _id: req.params.postId }, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  }
};

export const updatePost = (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.params.postId },
    req.body,
    { new: true },
    (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    }
  );
};

export const deletePost = (req, res) => {
    Post.findByIdAndRemove({_id:req.params.postId}, (err) => {
      if (err) {
        res.send(err);
      }
res.json({message:'Post Removed'});
    });
  };
