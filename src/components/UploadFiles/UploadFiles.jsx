import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

@observer
class UploadFiles extends Component {
  filesInputRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { files } = this.state;
    const { onUploadSubmit } = this.props;

    if (!files || !files.length) {
      return;
    }

    onUploadSubmit(files);
    this.clearSelectedFiles();
  };

  handleFilesChange = e => {
    const { files } = e.target;

    this.setState({ files });
  };

  handleClickChooseButton = () => {
    this.filesInputRef.current.click();
  };

  clearSelectedFiles = () => this.setState({ files: [] });

  isFormValid = (files, maxUploadFiles) =>
    files && files.length && files.length <= maxUploadFiles;

  // todo [after release]: move Max upload files to intl
  render() {
    const { files } = this.state;
    const {
      intl: { formatMessage },
      acceptedFileTypes,
      maxUploadFiles
    } = this.props;

    return (
      <Form>
        <Button
          content={formatMessage({
            id: 'uploadFiles.chooseFiles',
            defaultMessage: 'choose files'
          })}
          labelPosition="left"
          icon="file"
          onClick={this.handleClickChooseButton}
        />
        <input
          ref={this.filesInputRef}
          type="file"
          hidden
          multiple
          accept={acceptedFileTypes}
          onChange={this.handleFilesChange}
        />
        <Button
          type="submit"
          disabled={!this.isFormValid(files, maxUploadFiles)}
          onClick={this.handleFormSubmit}
        >
          {files && files.length
            ? formatMessage(
                {
                  id: 'uploadFiles.uploadNFiles',
                  defaultMessage: 'upload'
                },
                { length: files.length }
              )
            : formatMessage({
                id: 'common.upload',
                defaultMessage: 'upload'
              })}
        </Button>
        <span>
          Max upload files:
          {maxUploadFiles}
        </span>
      </Form>
    );
  }
}

UploadFiles.propTypes = {
  intl: PropTypes.shape().isRequired,
  onUploadSubmit: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.string.isRequired,
  maxUploadFiles: PropTypes.number.isRequired
};

export default injectIntl(UploadFiles);
