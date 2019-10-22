import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Grid, Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import Card from '../Card';

// todo common Grid component
@inject(({ albumsStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchAlbums: albumsStore.fetchAlbums,
  isFetching: albumsStore.isFetching,
  albums: albumsStore.albums
}))
@observer
class Albums extends React.Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    fetchAlbums: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    albums: PropTypes.arrayOf(PropTypes.shape)
  };

  static defaultProps = {
    albums: []
  };

  componentDidMount() {
    const { albums, fetchAlbums } = this.props;

    // fetch only if we don't have it already
    if (!albums.length) {
      fetchAlbums();
    }
  }

  handleClickAlbum = album => {
    const { navigate } = this.props;

    navigate(`${appRoutes.albums}/${album.id}`);
  };

  render() {
    const { isFetching, albums } = this.props;

    return (
      <Segment
        className="albums no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid container columns={3}>
          {albums.map(album => (
            <Grid.Column key={album.id} mobile={16} tablet={8} computer={4}>
              <Card entity={album} onCardClick={this.handleClickAlbum} />
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    );
  }
}

export default Albums;
