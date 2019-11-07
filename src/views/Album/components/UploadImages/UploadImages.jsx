import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';

@observer
class UploadImages extends Component {
  filesInputRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      files: null
    };
  }

  // todo: disable button when length is 0
  handleFormSubmit = e => {
    e.preventDefault(); // Stop form submit

    const { files } = this.state;

    if (!files || !files.length) {
      return;
    }

    // todo: refactor
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    const formData = new FormData();

    Array.from(files).forEach(file => formData.append('upload', file));

    axios.post(`${process.env.BASE_URL}/files`, formData, config);
  };

  handleFilesChange = e => {
    const { files } = e.target;

    this.setState({ files });
  };

  handleClickChooseButton = () => {
    this.filesInputRef.current.click();
  };

  // todo: intl
  render() {
    return (
      <Form>
        <Form.Field>
          <Button
            content="Choose File"
            labelPosition="left"
            icon="file"
            onClick={this.handleClickChooseButton}
          />
          <input
            ref={this.filesInputRef}
            type="file"
            hidden
            multiple
            accept=".jpg,.jpeg"
            onChange={this.handleFilesChange}
          />
        </Form.Field>
        <Button type="submit" onClick={this.handleFormSubmit}>
          Upload
        </Button>
      </Form>
    );
  }
}

export default UploadImages;
