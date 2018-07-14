import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class AddPostForm extends React.Component {
  state = {
    title: "",
    description: "",
    featuredImage: "",
    content: {},
    redirect:false
  };

  onTitleChange(title) {
    this.setState({ title });
  }
  onDescriptionChange(description) {
    this.setState({ description });
  }
  onFeaturedImageChange(featuredImage) {
    this.setState({ featuredImage });
  }
  onContentChange(data) {
    var parsedData = JSON.parse(data);
    this.setState({ content: parsedData.data });
  }
  onFormSubmit(event) {
    event.preventDefault();
    axios.post("/posts", this.state).then(
      res => {
        this.setState({redirect:true});
      },
      err => {
        console.log(err);
      }
    );
  }

  render() {
    if(this.state.redirect){
      return <Redirect push to="/" />
    }
    return (
      <div class="add-post-wrap">
        <h2>Add new Post</h2>  
        <form className="add-post-form uploadForm" onSubmit={this.onFormSubmit.bind(this)}>
        <div className="input-block"><input
          placeholder="Title"
          value={this.state.title}
          onChange={event => this.onTitleChange(event.target.value)}
          className="form-control"
          type="text"
        /></div>
        <div className="input-block"><input
          placeholder="description"
          value={this.state.description}
          onChange={event => this.onDescriptionChange(event.target.value)}
          className="form-control"
          type="text"
        /></div>
        <div className="input-block"><input
          placeholder="featuredImage"
          value={this.state.featuredImage}
          onChange={event => this.onFeaturedImageChange(event.target.value)}
          className="form-control"
          type="text"
        /></div>
        <img src={this.state.featuredImage} className="img-responsive" />
        <div className="input-block"><textarea
          placeholder="JSON INPUT"
          value={JSON.stringify(this.state.content)}
          onChange={event => this.onContentChange(event.target.value)}
          className="form-control"
          type="text"
        ></textarea></div>
        <div className="input-block">
        <input
          className="square-button"
          type="submit"
          value="Submit"
          name="submit"
        /></div>
      </form>
      </div>
    );
  }
}
