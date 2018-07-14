import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import AddPostForm from "./components/addPostForm";

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get(`/posts`)
      .then(res => {
        const posts = res.data;
        console.log(posts);
        this.setState({ posts });
      })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to VuePress</h1>
          <div>
          </div>
        </header>
        <div className="main">
            <Router>
              <Switch>
                <Route exact path="/" render={(props) => <Dashboard {...props} posts={this.state.posts} />} />
                <Route path="/preview-posts" render={(props) => <Dashboard {...props} posts={this.state.posts} />} />
                <Route path="/add-post" component={AddPostForm} />
                <Route render={() => <h3>Not Found</h3>} />
              </Switch>
            </Router>
        </div>
        {/* <Dashboard posts={this.state.posts}/> */}
        {/* <AddPostForm /> */}
      </div>
    );
  }
}

export default App;
