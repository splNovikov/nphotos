import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import UploadFiles from '../../components/UploadFiles';
import Grid from '../../components/Grid';

import './AlbumView.scss';

const LazyImagesCarousel = lazy(() => import('./components/ImagesCarousel'));

@inject(({ albumsStore, commonStore, filesStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album,
  toggleImagesCarousel: commonStore.toggleImagesCarousel,
  user: commonStore.user,
  uploadImages: filesStore.uploadImages,
  isUploading: filesStore.isUploading
}))
@observer
class AlbumView extends Component {
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

  handleClickImage = image => {
    const { getAlbum, toggleImagesCarousel } = this.props;
    const album = getAlbum(this.albumId);
    const index = album.images.map(e => e.id).indexOf(image.id);

    toggleImagesCarousel(true, index);
  };

  handleUploadSubmit = images => {
    const { uploadImages } = this.props;

    uploadImages(images, this.albumId);
  };

  hasImages = album => album && album.images && album.images.length;

  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage },
      user: { permissions },
      isUploading
    } = this.props;
    const album = getAlbum(this.albumId);

    return (
      <Segment
        className="album-view no-borders fetching-min-height"
        loading={isFetching}
      >
        {!this.hasImages(album) && !isFetching ? (
          <Header as="h2" className="album-title capitalize">
            {formatMessage({
              id: 'albumView.noImages',
              defaultMessage: 'No Images'
            })}
          </Header>
        ) : null}

        {permissions.canEditAlbum ? (
          <div className="edit-segment">
            <Segment loading={isUploading}>
              <div>Todo: edit button</div>
              <UploadFiles
                onUploadSubmit={this.handleUploadSubmit}
                acceptedFileTypes=".jpg,.jpeg"
              />
            </Segment>
          </div>
        ) : null}

        {this.hasImages(album) ? (
          <>
            <Header as="h2" className="album-title capitalize">
              {album.title}
            </Header>

            <div className="images-grid-wrapper">
              <Grid
                className="images-grid"
                elements={this.mapToGridEntity(album)}
                onCardClick={this.handleClickImage}
                columns={4}
                imageHeight={200}
                circle={false}
                imagePadding={10}
              />
            </div>

            <LazyImagesCarousel images={album.images} />
          </>
        ) : null}
      </Segment>
    );
  }
}

AlbumView.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired,
  fetchAlbum: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getAlbum: PropTypes.func.isRequired,
  toggleImagesCarousel: PropTypes.func.isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      canEditAlbum: PropTypes.bool
    })
  }).isRequired,
  uploadImages: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired
};

export default injectIntl(AlbumView);
