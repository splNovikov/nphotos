import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

import './AlbumEditView.scss';

import UploadFiles from '../../components/UploadFiles';
import userPermissions from '../../constants/userPermissions';

@inject(({ albumsStore, userStore, filesStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album,
  user: userStore.user,
  uploadImages: filesStore.uploadImages,
  isUploading: filesStore.isUploading
}))
@observer
class AlbumEditView extends Component {
  albumId;

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.albumId = id;
  }

  componentDidMount() {
    const { fetchAlbum } = this.props;

    fetchAlbum(this.albumId);
  }

  handleUploadSubmit = images => {
    const { uploadImages } = this.props;

    uploadImages(images, this.albumId);
  };

  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage },
      user: { permissions },
      isUploading
    } = this.props;
    const album = getAlbum(this.albumId);

    // todo: fix positive and negative background styling
    // todo: cancel button with confirm
    return (
      <Segment
        className="album-edit-view no-borders fetching-min-height"
        loading={isFetching}
      >
        {permissions[userPermissions.canEditAlbum] ? (
          <div className="edit-segment-wrapper">
            <Segment loading={isUploading}>
              <UploadFiles
                onUploadSubmit={this.handleUploadSubmit}
                acceptedFileTypes=".jpg,.jpeg"
              />
            </Segment>
          </div>
        ) : null}

        <Segment>
          <div>{album && album.title}</div>

          <Button
            onClick={this.handleClickEdit}
            labelPosition="left"
            positive
            icon="save"
            content={formatMessage({
              id: 'common.save',
              defaultMessage: 'save'
            })}
          />
          <Button
            onClick={this.handleClickEdit}
            labelPosition="left"
            negative
            icon="cancel"
            content={formatMessage({
              id: 'common.cancel',
              defaultMessage: 'cancel'
            })}
          />
        </Segment>
      </Segment>
    );
  }
}

AlbumEditView.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getAlbum: PropTypes.func.isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      [userPermissions.canEditAlbum]: PropTypes.bool
    })
  }).isRequired,
  uploadImages: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
};

export default injectIntl(AlbumEditView);
