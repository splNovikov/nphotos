import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Modal, Button, Image } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import LoadingFallback from '../../../../components/LoadingFallback';

import './ModalImage.scss';

@observer
class ModalImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIsLoading: true
    };
  }

  handleImageLoaded = () => {
    this.setState({ imageIsLoading: false });
  };

  render() {
    const {
      closeModal,
      image,
      intl: { formatMessage }
    } = this.props;
    const { imageIsLoading } = this.state;

    if (!image) {
      return null;
    }

    return (
      <Modal className="modal-image" size="small" open onClose={closeModal}>
        <Modal.Content>
          {imageIsLoading ? <LoadingFallback /> : null}
          <Image
            loading="lazy"
            onLoad={this.handleImageLoaded}
            src={image.src}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            content={formatMessage({
              id: 'common.close',
              defaultMessage: 'edit'
            })}
            onClick={closeModal}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

ModalImage.propTypes = {
  intl: PropTypes.shape().isRequired,
  // eslint-disable-next-line react/require-default-props
  closeModal: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string
    }),
    PropTypes.bool
  ])
};

export default injectIntl(ModalImage);
