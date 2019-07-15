import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Grid, Segment } from 'semantic-ui-react';

import AlbumCard from '../AlbumCard';

import './Albums.scss';

// todo: remove this hardcode
const albums = [
  {
    id: '1RRZnQiKm4yzI6abbEidhcbIlhWkPPLLYpajoFpmYz68',
    title: 'Album title1'
  },
  {
    id: 11111112,
    title: 'Album title2'
  },
  {
    id: 11111113,
    title: 'Album title2'
  },
  {
    id: 11111114,
    title: 'Album title2'
  }
];

@inject(({ routingStore }) => ({
  navigate: routingStore.push
}))
@observer
class Albums extends React.Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  handleClickAlbum = album => {
    const { navigate } = this.props;

    navigate(`/albums/${album.id}`);
  };

  render() {
    return (
      <Segment className="albums">
        <Grid container columns={3}>
          {albums.map(album => (
            <Grid.Column key={album.id} mobile={16} tablet={8} computer={4}>
              <AlbumCard
                album={album}
                onAlbumCardClick={this.handleClickAlbum}
              />
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    );
  }
}

export default Albums;
