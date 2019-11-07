import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';

// todo: use store
import filesApi from '../../../../api/files';

import './UploadImages.scss';

@observer
class UploadImages extends Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape
  };

  filesInputRef = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { images } = this.state;

    if (!images || !images.length) {
      return;
    }

    filesApi.uploadImages(images);
  };

  handleFilesChange = e => {
    const { files } = e.target;

    this.setState({ images: files });
  };

  handleClickChooseButton = () => {
    this.filesInputRef.current.click();
  };

  render() {
    const { images } = this.state;
    const {
      intl: { formatMessage }
    } = this.props;

    return (
      <Form className="upload-images">
        <Button
          content={formatMessage({
            id: 'uploadImages.chooseImages',
            defaultMessage: 'choose images'
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
          accept=".jpg,.jpeg"
          onChange={this.handleFilesChange}
        />
        <Button
          type="submit"
          disabled={!images || !images.length}
          onClick={this.handleFormSubmit}
        >
          {images && images.length
            ? formatMessage(
                {
                  id: 'uploadImages.uploadNImages',
                  defaultMessage: 'upload'
                },
                { length: images.length }
              )
            : formatMessage({
                id: 'common.upload',
                defaultMessage: 'upload'
              })}
        </Button>
      </Form>
    );
  }
}

export default injectIntl(UploadImages);
