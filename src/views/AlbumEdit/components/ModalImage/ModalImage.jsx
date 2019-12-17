import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Modal, Button, Image } from 'semantic-ui-react';

@observer
// todo: intl: Close button
class ModalImage extends Component {
  render() {
    const { isOpened, toggleModal, image } = this.props;

    if (!image) {
      return null;
    }

    return (
      <Modal size="small" open={isOpened} onClose={toggleModal}>
        <Modal.Content>
          <Image src={image.src} />
        </Modal.Content>
        <Modal.Actions>
          <Button positive content="Yes" onClick={toggleModal} />
        </Modal.Actions>
      </Modal>
    );
  }
}

ModalImage.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  toggleModal: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string
    }),
    PropTypes.bool
  ])
};

export default ModalImage;
