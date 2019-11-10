import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';
import Grid from '../Grid';

@inject(({ albumsStore, routingStore }) => ({
  navigate: routingStore.push,
  fetchAlbums: albumsStore.fetchAlbums,
  isFetching: albumsStore.isFetching,
  albums: albumsStore.albums
}))
@observer
class Albums extends React.Component {
  componentDidMount() {
    const { fetchAlbums } = this.props;

    fetchAlbums();
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
        <Grid
          elements={albums}
          onCardClick={this.handleClickAlbum}
          columns={3}
          imageHeight={200}
          circle={false}
        />
      </Segment>
    );
  }
}

Albums.propTypes = {
  navigate: PropTypes.func.isRequired,
  fetchAlbums: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  albums: PropTypes.arrayOf(PropTypes.shape)
};

Albums.defaultProps = {
  albums: []
};

export default Albums;
