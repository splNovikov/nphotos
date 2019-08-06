import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Segment, Header } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';
import Carousel, { Modal, ModalGateway } from 'react-images';

import AlbumGrid from '../../components/AlbumGrid';

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

  handleClickImage = index => {
    this.setState({ modalOpen: true, selectedImage: index });
  };

  handleClose = () => {
    this.setState({ modalOpen: false, selectedImage: {} });
  };

  albumId;

  render() {
    const {
      isFetching,
      getAlbum,
      intl: { formatMessage }
    } = this.props;
    const album = getAlbum(this.albumId);
    const { modalOpen, selectedImage } = this.state;

    return (
      <Segment className="album-view" loading={isFetching}>
        {!album ? (
          <Header as="h2" className="album-title capitalize">
            {formatMessage({
              id: 'albumView.noImages',
              defaultMessage: 'No Images'
            })}
          </Header>
        ) : (
          <React.Fragment>
            <Header as="h2" className="album-title capitalize">
              {album.title}
            </Header>

            <AlbumGrid album={album} onImageClick={this.handleClickImage} />

            <ModalGateway>
              {modalOpen ? (
                <Modal onClose={this.handleClose}>
                  <Carousel currentIndex={selectedImage} views={album.images} />
                </Modal>
              ) : null}
            </ModalGateway>
          </React.Fragment>
        )}
      </Segment>
    );
  }
}

export default injectIntl(AlbumView);
