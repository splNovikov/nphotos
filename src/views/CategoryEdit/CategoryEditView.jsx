import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import UploadFiles from '../../components/UploadFiles';
import api from '../../api/albums';

import './CategoryEditView.scss';

// todo: UPLOAD_ACCEPTED_IMAGE_TYPES instead of UPLOAD_ACCEPTED_FILE_TYPES;
const acceptedFileTypes = process.env.UPLOAD_ACCEPTED_FILE_TYPES;

@inject(() => ({}))
@observer
class CategoryEditView extends Component {
  categoryId;

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.categoryId = id;
  }

  componentDidMount() {}

  // todo [after release]: should be confirmed?
  handleUploadSubmit = fileList => {
    if (!this.categoryId) {
      console.log('no category id');
      return;
    }

    // todo: right handling
    api.addAlbum({
      cover: fileList[0],
      categoryId: this.categoryId,
      titleEng: 'asda',
      titleRus: 'фываыв'
    });
    // const { addCategory, getAlbum } = this.props;
    // 1. vali
    // const album = getAlbum(this.albumId);

    // const uploadedImages = uploadImages(images, this.albumId);

    // album.addImages(uploadedImages);
  };

  // todo [after release]: add album with confirm
  render() {
    return (
      <Segment className="category-edit-view no-borders fetching-min-height">
        <UploadFiles
          onUploadSubmit={this.handleUploadSubmit}
          acceptedFileTypes={acceptedFileTypes}
          maxUploadFiles={1}
        />
      </Segment>
    );
  }
}

CategoryEditView.wrappedComponent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default CategoryEditView;
