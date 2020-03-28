import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import spinner from '../../assets/images/spinner.svg';
import debounce from '../../utils/debounce';

@inject(
  ({
    aboutStore,
    albumsStore,
    categoriesStore,
    contactsStore,
    priceListStore
  }) => ({
    isAlbumsFetching: albumsStore.isFetching,
    isCategoriesFetching: categoriesStore.isFetching,
    isContactsFetching: contactsStore.isFetching,
    isAboutFetching: aboutStore.isFetching,
    isPriceFetching: priceListStore.isFetching
  })
)
@observer
class Spinner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: false
    };
  }

  // can not use getDerivedStateFromProps here because
  // getDerivedStateFromProps is static and we can not call this.anyFunction
  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps() {
    this.getIsFetching();
  }

  getIsFetching = debounce(() => {
    const {
      isAboutFetching,
      isAlbumsFetching,
      isCategoriesFetching,
      isContactsFetching,
      isPriceFetching
    } = this.props;

    this.setState({
      isFetching:
        isAboutFetching ||
        isAlbumsFetching ||
        isCategoriesFetching ||
        isContactsFetching ||
        isPriceFetching
    });
  }, 300);

  render() {
    const { isFetching } = this.state;

    return isFetching ? (
      <img width={100} src={spinner} alt="spinner" className="spinner" />
    ) : null;
  }
}

Spinner.wrappedComponent.propTypes = {
  isAboutFetching: PropTypes.bool.isRequired,
  isAlbumsFetching: PropTypes.bool.isRequired,
  isCategoriesFetching: PropTypes.bool.isRequired,
  isContactsFetching: PropTypes.bool.isRequired,
  isPriceFetching: PropTypes.bool.isRequired
};

export default Spinner;
