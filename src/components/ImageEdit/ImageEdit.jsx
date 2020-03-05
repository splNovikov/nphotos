import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';

import ChooseFiles from '../ChooseFiles';

import './ImageEdit.scss';

const acceptedFileTypes = process.env.UPLOAD_ACCEPTED_IMAGE_TYPES;

@observer
class ImageEdit extends Component {
  handleImageSelected = ([image]) => {
    const { updateRelativeState } = this.props;

    // should be - updateModelState
    return updateRelativeState({ cover: image });
  };

  handleInputChange = (e, { name, value }) => {
    const { updateRelativeState } = this.props;

    // should be - updateModelState
    return updateRelativeState({ [name]: value });
  };

  // todo [after release]: should be confirmed?
  handleFormSubmit = () => {
    const { cover, titleRus, titleEng, isCreate, update, create } = this.props;

    return isCreate
      ? create({ cover, titleRus, titleEng })
      : update({ cover, titleRus, titleEng });
  };

  isSaveValid = (cover, titleRus, titleEng) => !(cover && titleRus && titleEng);

  render() {
    const { cover, titleRus, titleEng, isFetching } = this.props;

    return (
      <Segment loading={isFetching} className="image-edit no-borders">
        <ChooseFiles
          onSelect={this.handleImageSelected}
          acceptedFileTypes={acceptedFileTypes}
          maxUploadFiles={1}
        />
        {cover ? (
          <span className="cover-selected-label">Cover Selected</span>
        ) : (
          <span className="cover-not-selected-label">
            Cover Was Not Selected
          </span>
        )}

        <Form onSubmit={this.handleFormSubmit} className="form-wrapper">
          <Form.Field
            control={Input}
            label="Title Rus"
            name="titleRus"
            placeholder="Title Rus"
            value={titleRus}
            onChange={this.handleInputChange}
          />
          <Form.Field
            control={Input}
            label="Title Eng"
            name="titleEng"
            placeholder="Title Eng"
            value={titleEng}
            onChange={this.handleInputChange}
          />
          <Form.Field
            disabled={this.isSaveValid(cover, titleRus, titleEng)}
            control={Button}
            content="Save"
          />
        </Form>
      </Segment>
    );
  }
}

ImageEdit.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  cover: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  titleRus: PropTypes.string.isRequired,
  titleEng: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  create: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  updateRelativeState: PropTypes.func.isRequired
};

ImageEdit.defaultProps = {
  cover: null
};

export default ImageEdit;
