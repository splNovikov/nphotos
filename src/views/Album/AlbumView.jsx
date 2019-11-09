import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';

import ImagesCarousel from './components/ImagesCarousel';
import UploadFiles from '../../components/UploadFiles';
import Grid from '../../components/Grid';

import './AlbumView.scss';

// todo: all admin actions should be from specific pages and via chunks
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
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape,
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
        canAddImages: PropTypes.bool
      })
    }).isRequired,
    uploadImages: PropTypes.func.isRequired,
    isUploading: PropTypes.bool.isRequired
  };

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

  albumId;

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
          <React.Fragment>
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

            <ImagesCarousel images={album.images} />
          </React.Fragment>
        ) : null}
      </Segment>
    );
  }
}

export default injectIntl(AlbumView);
