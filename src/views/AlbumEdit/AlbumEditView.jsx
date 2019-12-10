import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

import './AlbumEditView.scss';

import UploadFiles from '../../components/UploadFiles';
import Grid from '../../components/Grid';
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

  mapToGridEntity = album =>
    album.images.map(i => ({
      ...i,
      cover: i.previewSrc,
      description: i.title,
      title: undefined
    }));

  hasImages = album => album && album.images && album.images.length;

  handleUploadSubmit = async images => {
    const { uploadImages, getAlbum } = this.props;
    const album = getAlbum(this.albumId);

    const uploadedImages = await uploadImages(images, this.albumId);

    album.addImages(uploadedImages);
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

    // todo: fix positive and negative button background styling
    // todo: cancel button with confirm
    // todo: set max count of uploading files
    // todo: fix all () => {}
    return (
      <Segment
        className="album-edit-view no-borders fetching-min-height"
        loading={isFetching}
      >
        <Segment>
          <div>{album && album.title}</div>

          <Button
            onClick={() => {}}
            labelPosition="left"
            positive
            icon="save"
            disabled
            content={formatMessage({
              id: 'common.save',
              defaultMessage: 'save'
            })}
          />
          <Button
            onClick={() => {}}
            labelPosition="left"
            negative
            icon="cancel"
            disabled
            content={formatMessage({
              id: 'common.cancel',
              defaultMessage: 'cancel'
            })}
          />
        </Segment>

        {permissions[userPermissions.canEditAlbum] ? (
          <Segment loading={isUploading}>
            <UploadFiles
              onUploadSubmit={this.handleUploadSubmit}
              acceptedFileTypes=".jpg,.jpeg"
            />
          </Segment>
        ) : null}

        {this.hasImages(album) ? (
          <Grid
            className="images-grid"
            onCardClick={() => {}}
            elements={this.mapToGridEntity(album)}
            columns={4}
            imageHeight={200}
            circle={false}
            imagePadding={10}
          />
        ) : null}
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
