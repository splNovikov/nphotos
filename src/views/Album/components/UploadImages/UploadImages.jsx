import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';

@observer
class UploadImages extends Component {
  fileInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file);
    console.log('Submit');
  };

  fileChange = e => {
    this.setState({ file: e.target.files[0] }, () => {
      console.log('File chosen --->', this.state.file);
    });
  };

  fileUpload = file => {
    console.log(file);
  };

  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <Form.Field>
          <Button
            content="Choose File"
            labelPosition="left"
            icon="file"
            onClick={() => this.fileInputRef.current.click()}
          />
          <input
            ref={this.fileInputRef}
            type="file"
            hidden
            multiple
            onChange={this.fileChange}
          />
        </Form.Field>
        <Button type="submit">Upload</Button>
      </Form>
    );
  }
}

export default UploadImages;
