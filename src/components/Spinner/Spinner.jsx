import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import spinner from '../../assets/images/spinner.svg';

@inject(
  ({
    aboutStore,
    albumsStore,
    categoriesStore,
    contactsStore,
    priceListStore,
    filesStore
  }) => ({
    isAlbumsFetching: albumsStore.isFetching,
    isCategoriesFetching: categoriesStore.isFetching,
    isContactsFetching: contactsStore.isFetching,
    isAboutFetching: aboutStore.isFetching,
    isPriceFetching: priceListStore.isFetching,
    isFilesFetching: filesStore.isFetching
  })
)
@observer
class Spinner extends Component {
  getIsFetching = () => {
    const {
      isAboutFetching,
      isAlbumsFetching,
      isCategoriesFetching,
      isContactsFetching,
      isPriceFetching,
      isFilesFetching
    } = this.props;

    return (
      isAboutFetching ||
      isAlbumsFetching ||
      isCategoriesFetching ||
      isContactsFetching ||
      isPriceFetching ||
      isFilesFetching
    );
  };

  render() {
    const isFetching = this.getIsFetching();
    const { width } = this.props;

    return isFetching ? (
      <img width={width} src={spinner} alt="spinner" className="spinner" />
    ) : null;
  }
}

Spinner.wrappedComponent.propTypes = {
  width: PropTypes.number.isRequired,
  isAboutFetching: PropTypes.bool.isRequired,
  isAlbumsFetching: PropTypes.bool.isRequired,
  isCategoriesFetching: PropTypes.bool.isRequired,
  isContactsFetching: PropTypes.bool.isRequired,
  isPriceFetching: PropTypes.bool.isRequired,
  isFilesFetching: PropTypes.bool.isRequired
};

export default Spinner;
