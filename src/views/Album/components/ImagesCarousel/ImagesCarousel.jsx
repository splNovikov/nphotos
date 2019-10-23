import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import Carousel, { Modal, ModalGateway } from 'react-images';

@inject(({ commonStore }) => ({
  isOpened: commonStore.isImagesCarouselOpened,
  toggleImagesCarousel: commonStore.toggleImagesCarousel,
  selectedImage: commonStore.selectedCarouselImageIndex
}))
@observer
class ImagesCarousel extends Component {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/require-default-props
    selectedImage: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string
      })
    ).isRequired,
    toggleImagesCarousel: PropTypes.func.isRequired
  };

  render() {
    const {
      isOpened,
      selectedImage,
      images,
      toggleImagesCarousel
    } = this.props;

    return (
      <ModalGateway>
        {isOpened ? (
          <Modal onClose={toggleImagesCarousel}>
            <Carousel currentIndex={selectedImage} views={images} />
          </Modal>
        ) : null}
      </ModalGateway>
    );
  }
}

export default ImagesCarousel;
