import React from 'react'
import { render } from 'react-dom'
// import fs from 'fs'

var file_name, refer_file_name;
var Client = require('node-rest-client').Client;
var client = new Client();
import axios, { post, get } from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: 'something' }

    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange_targetfile = this.onChange_targetfile.bind(this)
    this.onChange_filename = this.onChange_filename.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
    this.onGetFileList = this.onGetFileList.bind(this)
  }

  onChange_filename(e) {
    file_name = e.target.value
  }

  onChange_targetfile(e) {
    this.setState({ file: e.target.files[0] })
  }

  fileUpload(file) {
    const url = 'http://localhost:5000/files/';
    var target_url = url + file_name;
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(target_url, formData, config)
  }

  getFileList() {
    const url = 'http://localhost:5000/files';
    // const formData = new FormData();
    // formData.append('file', file)
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data'
    //   }
    // }
    return get(url)
  }  

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    })
  }

  onGetFileList(e) {
    e.preventDefault() // Stop form submit
    this.getFileList().then((response) => {
      console.log(response.data);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>        File Name:      </label>
          <input type="text" onChange={this.onChange_filename} />
          <input type="file" onChange={this.onChange_targetfile} />
          <button type="submit">Upload</button>
        </form>
      <form onSubmit={this.onGetFileList}>
        <label>        Get file list:      </label>
        {/* <input type="text" onChange={this.onChange_filename} /> */}
        {/* <input type="file" onChange={this.onChange_targetfile} /> */}
        <button type="submit">Get</button>
      </form>
    </div>      
    );
  }
}

render(<App />, document.getElementById('app'))