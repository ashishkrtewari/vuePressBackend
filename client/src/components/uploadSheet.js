import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default class UploadSheet extends Component {
    constructor() {
      super()
      this.state = { files: [], json: {} }
    }
  
    async onDrop(files) {
      let data = new FormData();

      data.append('file', files[0]);

      const config = {
          headers: { 'content-type': 'multipart/form-data' }
      }
      var json = await axios.post('/api/upload', data, config)
      console.log(json);
      this.setState({
        files
      });
    }
  
    render() {
      return (
        <section>
          <div className="dropzone">
            <Dropzone className="drop-zone hoverable" onDrop={this.onDrop.bind(this)}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <p>Dropped files</p>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
      );
    }
  }