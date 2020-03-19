import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';

import './CategoryExtra.scss';

const CategoryExtra = ({ albumsCount, intl: { formatMessage } }) => (
  <span className="category-extra">
    {formatMessage({
      id: 'common.albumsCount',
      defaultMessage: 'albums count'
    })}
    :{albumsCount}
  </span>
);

CategoryExtra.propTypes = {
  intl: PropTypes.shape().isRequired,
  albumsCount: PropTypes.number.isRequired
};

export default injectIntl(observer(CategoryExtra));
