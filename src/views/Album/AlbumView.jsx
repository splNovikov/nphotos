import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import Grid from '../../components/Grid';
import appRoutes from '../../constants/appRoutes';
import userPermissions from '../../constants/userPermissions';
import albumHelper from '../helpers/albumHelper';

import './AlbumView.scss';

const LazyImagesCarousel = lazy(() => import('./components/ImagesCarousel'));

@inject(({ albumsStore, commonStore, userStore, routingStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
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

  handleClickImage = image => {
    const { getAlbum, toggleImagesCarousel } = this.props;
    const album = getAlbum(this.albumId);
    const index = album.images.map(e => e.id).indexOf(image.id);

    toggleImagesCarousel(true, index);
  };

  handleClickEdit = () => {
    const { navigate } = this.props;

    navigate(`${appRoutes.albumEdit}/${this.albumId}`);
  };

  // todo [after release]: delete button with confirm
  render() {
    const {
      getAlbum,
      intl: { formatMessage },
      user: { permissions }
    } = this.props;
    const album = getAlbum(this.albumId);

    return album ? (
      <Segment className="album-view no-borders fetching-min-height">
        {permissions[userPermissions.canEditAlbum] ? (
          <div className="edit-segment-wrapper">
            <Segment textAlign="right" className="no-borders">
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
            </Segment>
          </div>
        ) : null}

        {album.images && !album.images.length ? (
          <Header as="h2" className="album-title capitalize">
            {formatMessage({
              id: 'albumView.noImages',
              defaultMessage: 'No Images'
            })}
          </Header>
        ) : null}

        {album.images && album.images.length ? (
          <>
            <Header as="h2" className="album-title capitalize">
              {`${formatMessage({
                id: 'common.album',
                defaultMessage: 'album'
              })}: ${album.title}`}
            </Header>

            <div className="images-grid-wrapper">
              <Grid
                className="images-grid"
                elements={albumHelper.mapToGridEntity(album)}
                onCardClick={this.handleClickImage}
                imageHeight={200}
                circle={false}
                imagePadding={10}
              />
            </div>

            <LazyImagesCarousel images={album.images} />
          </>
        ) : null}
      </Segment>
    ) : null;
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
  getAlbum: PropTypes.func.isRequired,
  toggleImagesCarousel: PropTypes.func.isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      [userPermissions.canEditAlbum]: PropTypes.bool
    })
  }).isRequired,
  navigate: PropTypes.func.isRequired
};

export default injectIntl(AlbumView);
