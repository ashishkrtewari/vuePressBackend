import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import AddPostForm from "./components/addPostForm";
import EditPostForm from "./components/editPostForm";
import Header from "./components/header";

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
      auth:null
    }
  }
  
  async fetchUser(){
    let auth = await axios.get('/api/current_user');
    auth = auth.data;
    this.setState({ auth });
  };
  async fetchPosts(){
    let posts = await axios.get(`/api/posts`)
    posts = posts.data;
    this.setState({ posts });
  };
  async handlePostDelete(id){
    let res = await axios.delete(`/api/posts/${id}`);
    this.fetchPosts();
  };

  async componentDidMount() {
    if(this.state.auth === null){
      await this.fetchUser();
    }
    if(this.state.auth){
      await this.fetchPosts();
    }
  }
  render() {
    return (
      <div className="App container">        
        <div className="main">
            <Header auth={this.state.auth} />  
            <Router>
              <Switch>
                <Route exact path="/" render={(props) => <Dashboard {...props} auth={this.state.auth} posts={this.state.posts} handlePostDelete={this.handlePostDelete.bind(this)} />} />
                <Route path="/posts" render={(props) => <Dashboard {...props} auth={this.state.auth} posts={this.state.posts} handlePostDelete={this.handlePostDelete.bind(this)} />} />
                <Route path="/add-post" component={AddPostForm} />
                <Route path="/edit-post/:id" render={(props) => <EditPostForm {...props}  />} />
                <Route render={() => <h3>Not Found</h3>} />
              </Switch>
            </Router>
        </div>
      </div>
    );
  }
}

export default App;
