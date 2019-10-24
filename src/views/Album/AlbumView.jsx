import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';

import ImagesCarousel from './components/ImagesCarousel';
import Grid from '../../components/Grid';

import './AlbumView.scss';

@inject(({ albumsStore, commonStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album,
  toggleImagesCarousel: commonStore.toggleImagesCarousel
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
    toggleImagesCarousel: PropTypes.func.isRequired
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
    const { getAlbum, fetchAlbum } = this.props;

    // fetch only if we don't have it already
    if (!getAlbum(this.albumId)) {
      fetchAlbum(this.albumId);
    }
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

  albumId;

  // todo: (!album || !category.images.length)
  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage }
    } = this.props;
    const album = getAlbum(this.albumId);

    return (
      <Segment
        className="album-view no-borders fetching-min-height"
        loading={isFetching}
      >
        {!album && !isFetching ? (
          <Header as="h2" className="album-title capitalize">
            {formatMessage({
              id: 'albumView.noImages',
              defaultMessage: 'No Images'
            })}
          </Header>
        ) : null}

        {album ? (
          <React.Fragment>
            <Header as="h2" className="album-title capitalize">
              {album.title}
            </Header>

            <Grid
              elements={this.mapToGridEntity(album)}
              onCardClick={this.handleClickImage}
              columns={4}
              imageHeight={200}
              circle={false}
            />

            <ImagesCarousel images={album.images} />
          </React.Fragment>
        ) : null}
      </Segment>
    );
  }
}

export default injectIntl(AlbumView);
