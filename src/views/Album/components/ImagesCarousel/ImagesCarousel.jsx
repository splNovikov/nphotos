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
  componentWillUnmount() {
    const { toggleImagesCarousel } = this.props;

    toggleImagesCarousel(false);
  }

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

ImagesCarousel.propTypes = {
  isOpened: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  selectedImage: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired,
  // eslint-disable-next-line react/require-default-props
  toggleImagesCarousel: PropTypes.func
};

ImagesCarousel.defaultProps = {
  isOpened: false
};

export default ImagesCarousel;
