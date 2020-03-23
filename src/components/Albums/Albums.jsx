import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import Grid from '../Grid';
import AlbumExtra from './AlbumExtra';

@inject(({ albumsStore }) => ({
  fetchAlbums: albumsStore.fetchAlbums,
  isFetching: albumsStore.isFetching,
  albums: albumsStore.albums
}))
@observer
class Albums extends Component {
  componentDidMount() {
    const { fetchAlbums } = this.props;

    fetchAlbums();
  }

  fillAlbumsWithExtraProps = albums =>
    albums.map(album => ({
      ...album,
      to: `${appRoutes.albums}/${album.id}`,
      extra: album.categories ? (
        <AlbumExtra categories={album.categories} />
      ) : null
    }));

  render() {
    const { isFetching, albums } = this.props;
    const elements = this.fillAlbumsWithExtraProps(albums);

    return (
      <Segment
        className="albums no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid elements={elements} imageHeight={200} circle={false} />
      </Segment>
    );
  }
}

Albums.wrappedComponent.propTypes = {
  fetchAlbums: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape)
};

Albums.wrappedComponent.defaultProps = {
  albums: []
};

export default Albums;
