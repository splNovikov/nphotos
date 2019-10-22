import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';
import Carousel, { Modal, ModalGateway } from 'react-images';

import Grid from '../../components/Grid';

import './AlbumView.scss';

@inject(({ albumsStore }) => ({
  fetchAlbum: albumsStore.fetchAlbum,
  isFetching: albumsStore.isFetching,
  getAlbum: albumsStore.album
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
    getAlbum: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const {
      match: {
        params: { id }
      }
    } = this.props;

    this.albumId = id;
    this.state = { modalOpen: false, selectedImage: {} };
  }

  componentDidMount() {
    const { getAlbum, fetchAlbum } = this.props;

    // fetch only if we don't have it already
    if (!getAlbum(this.albumId)) {
      fetchAlbum(this.albumId);
    }
  }

  mapToGridEntity = album => ({
    ...album,
    elements: album.images.map(i => ({
      ...i,
      cover: i.previewSrc,
      description: i.title,
      title: undefined
    }))
  });

  handleClickImage = image => {
    const { getAlbum } = this.props;
    const album = getAlbum(this.albumId);
    const index = album.images.map(e => e.id).indexOf(image.id);

    this.setState({ modalOpen: true, selectedImage: index });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, selectedImage: {} });
  };

  albumId;

  // todo: re-render called each time when we toggle modal
  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage }
    } = this.props;
    const album = getAlbum(this.albumId);
    const { modalOpen, selectedImage } = this.state;

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
              entity={this.mapToGridEntity(album)}
              onCardClick={this.handleClickImage}
            />

            <ModalGateway>
              {modalOpen ? (
                <Modal onClose={this.handleClose}>
                  <Carousel currentIndex={selectedImage} views={album.images} />
                </Modal>
              ) : null}
            </ModalGateway>
          </React.Fragment>
        ) : null}
      </Segment>
    );
  }
}

export default injectIntl(AlbumView);
