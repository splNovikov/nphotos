import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

@observer
class ChooseFiles extends Component {
  filesInputRef = React.createRef();

  handleFilesChange = e => {
    const { files } = e.target;
    const { onSelect } = this.props;

    onSelect(files);
  };

  handleClickChooseButton = () => {
    this.filesInputRef.current.click();
  };

  // todo [after release]: move Max upload files to intl
  render() {
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
          multiple={maxUploadFiles > 1}
          accept={acceptedFileTypes}
          onChange={this.handleFilesChange}
        />
        {maxUploadFiles > 1 ? (
          <span>
            Max upload files:
            {maxUploadFiles}
          </span>
        ) : null}
      </Form>
    );
  }
}

ChooseFiles.propTypes = {
  intl: PropTypes.shape().isRequired,
  onSelect: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.string.isRequired,
  maxUploadFiles: PropTypes.number.isRequired
};

export default injectIntl(ChooseFiles);
