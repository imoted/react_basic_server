import React from 'react'
import { render } from 'react-dom'
// import fs from 'fs'

var file_name, refer_file_name;
var Client = require('node-rest-client').Client;
var client = new Client();
import axios, { post } from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: 'something' }
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  // handleChange(event) {
  //   this.setState({ value: event.target.value });
  // }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    // event.preventDefault();
    var url = "http://localhost:5000/files/" + file_name
    client.post(url, { headers: { "Content-Type": "multipart/form-data" } }, (data, response) => {
      // res.send(data ? data.toString('utf8') : "ERROR");
    });
    var args = {
      file: { refer_file_name },
      headers: { "Content-Type": "multipart/form-data" }
    };

    client.post(url, args, function (data, response) {
      // parsed response body as js object
      console.log(data);
      // raw response
      console.log(response);
    });

  }

  onChange_filename(e) {
    //  this.setState( {message: e.target.value} )
    file_name = e.target.value
  }

  // referfile(e) {
  //   //  this.setState( {message: e.target.value} )
  //   refer_file_name = e.target.value
  //   console.log(refer_file_name)
  // }

  // handleChangeFile(e) {
  //   // const target: HTMLInputElement = e.target as HTMLInputElement;
  //   // const file: File = target.files.item(0);
  //   updateFile(this.props.dispatch, file);
  // }

  // export function updateFile(dispatch: Dispatch<any>, file: File) {
  //   dispatch({ type: UPDATE_FILE, file: file})
  // }

  onChange(e) {
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

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <label>        File Name:      </label>
          {/* <input type="text" onChange = { this.onChange_filename.bind(this) } /> */}
          <input type="text" onChange={this.onChange_filename} />
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'))