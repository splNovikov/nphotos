import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import Grid from '../../components/Grid';
import appRoutes from '../../constants/appRoutes';

import './AlbumView.scss';

const LazyImagesCarousel = lazy(() => import('./components/ImagesCarousel'));

@inject(({ albumsStore, commonStore, userStore, routingStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album,
  toggleImagesCarousel: commonStore.toggleImagesCarousel,
  user: userStore.user,
  navigate: routingStore.push
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

  hasImages = album => album && album.images && album.images.length;

  handleClickEdit = () => {
    const { navigate } = this.props;

    navigate(`${appRoutes.albumEdit}/${this.albumId}`);
  };

  // todo: Suspend for LazyImagesCarousel
  // todo: delete button with confirm
  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage },
      user: { permissions }
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
          <div className="edit-segment-wrapper">
            <Segment textAlign="right">
              <Button
                onClick={this.handleClickEdit}
                labelPosition="left"
                positive
                icon="edit"
                content={formatMessage({
                  id: 'common.edit',
                  defaultMessage: 'edit'
                })}
              />
              <Button
                labelPosition="left"
                negative
                icon="delete"
                content={formatMessage({
                  id: 'common.delete',
                  defaultMessage: 'delete'
                })}
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
  navigate: PropTypes.func.isRequired
};

export default injectIntl(AlbumView);
