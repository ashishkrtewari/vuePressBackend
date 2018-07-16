import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

export default class EditPostForm extends React.Component {
  state = {
    title: "",
    description: "",
    featuredImage: "",
    content: {},
    sheet: "",
    files: [],
    fileAdded: false,
    id: ""
  };
  async getPost() {
    let id = await this.props.match.params.id;
    this.setState({ id });
    let post = await axios.get(`/api/posts/${id}`);
    post = post.data;
    this.setState({
      title: post.title,
      description: post.description,
      featuredImage: post.featuredImage,
      content: post.content
    });
  }

  componentDidMount() {
    this.getPost();
  }

  onTitleChange(title) {
    this.setState({ title });
  }
  onDescriptionChange(description) {
    this.setState({ description });
  }
  onFeaturedImageChange(featuredImage) {
    this.setState({ featuredImage });
  }
  onFormSubmit(event) {
    event.preventDefault();
    axios.put(`/api/posts/${this.state.id}`, this.state).then(
      res => {
        window.location = "/posts";
      },
      err => {
        console.log(err);
      }
    );
  }
  async onSheetChange(sheet) {
    this.setState({ sheet });
    const data = {
      url: sheet
    };
    let response = await axios.post("/api/upload/googlesheetupload", data);
    let content = response.data;
    this.setState({
      content
    });
  }
  async onDrop(files) {
    let data = new FormData();

    data.append("file", files[0]);

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };
    var response = await axios.post("/api/upload", data, config);
    var content = response.data.data;
    this.setState({
      files,
      content,
      fileAdded: true
    });
  }
  TextInsideDropZone = () => {
    if (this.state.fileAdded) {
      return (
        <aside>
          <p>Dropped files</p>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes &nbsp;&nbsp;
                <a className="btn-floating btn-small cyan">
                  <i className="small material-icons">check</i>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      );
    }
    return (
      <p>Try dropping some files here, or click to select files to upload.</p>
    );
  };
  ExcelSheet = () => {
    return (
      <div className="dropzone">
        <Dropzone
          className="drop-zone hoverable valign-wrapper"
          onDrop={this.onDrop.bind(this)}
        >
          <this.TextInsideDropZone />
        </Dropzone>
      </div>
    );
  };
  GoogleSheet = () => {
    return (
      <div className="input-block">
        <input
          placeholder="Google Sheets Api URL"
          value={this.state.sheet}
          onChange={event => this.onSheetChange(event.target.value)}
          className="form-control"
          type="text"
        />
      </div>
    );
  };
  SelectedContentSheet = props => {
    if (this.state.uploadSheet === "excel") {
      return <this.ExcelSheet />;
    } else if (this.state.uploadSheet === "google") {
      return <this.GoogleSheet />;
    }
    return <div />;
  };
  handleSheetSelection(uploadSheet) {
    this.setState({ uploadSheet });
  }

  render() {
    return (
      <div className="add-post-wrap">
        <h2>Edit Post</h2>
        <form
          className="add-post-form uploadForm"
          onSubmit={this.onFormSubmit.bind(this)}
        >
          {/* Entry Title */}
          <div className="input-block">
            <input
              required="true"
              placeholder="Title"
              value={this.state.title}
              onChange={event => this.onTitleChange(event.target.value)}
              className="form-control"
              type="text"
            />
          </div>
          {/* Entry Description */}
          <div className="input-block">
            <input
              required="true"
              placeholder="description"
              value={this.state.description}
              onChange={event => this.onDescriptionChange(event.target.value)}
              className="form-control"
              type="text"
            />
          </div>
          {/* Entry Featured Image */}
          <div className="input-block">
            <input
              placeholder="featuredImage"
              value={this.state.featuredImage}
              onChange={event => this.onFeaturedImageChange(event.target.value)}
              className="form-control"
              type="text"
            />
          </div>
          <img
            src={this.state.featuredImage}
            className="img-responsive"
            alt=""
          />
          {/* FileUpload */}
          <div className="divider" />
          <div className="section">
            <div className="section">
              <h5 className="white-text">Add Content</h5>
              <a
                className="waves-effect waves-light blue lighten-1 btn"
                onClick={e => this.handleSheetSelection("excel", e)}
              >
                Excel Sheet
              </a>
              &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;
              <a
                className="waves-effect waves-light blue lighten-1 btn"
                onClick={e => this.handleSheetSelection("google", e)}
              >
                Google Sheets
              </a>
            </div>
            {/* FileUpload */}
            <this.SelectedContentSheet />
          </div>
          {/* Submit Button        */}
          <div className="input-block">
            <input
              className="square-button"
              type="submit"
              value="Submit"
              name="submit"
            />
          </div>
        </form>
      </div>
    );
  }
}
