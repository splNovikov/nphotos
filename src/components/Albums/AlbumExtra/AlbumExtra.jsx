import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Image, List } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import appRoutes from '../../../constants/appRoutes';

import './AlbumExtra.scss';

const handleCategoryClick = e => e.stopPropagation();

const mapLinkToCategories = categories =>
  categories.map(c => ({
    ...c,
    to: `${appRoutes.categories}/${c.id}`
  }));

const AlbumExtra = ({ categories, intl: { formatMessage } }) => {
  const categoriesWithNavLink = mapLinkToCategories(categories);

  return (
    <div className="album-extra">
      <div>
        {formatMessage({
          id: 'common.categories',
          defaultMessage: 'categories'
        })}
        :
      </div>
      <List horizontal relaxed="very">
        {categoriesWithNavLink.map(category => (
          <List.Item
            className="category"
            onClick={handleCategoryClick}
            key={category.id}
            as={NavLink}
            to={category.to}
          >
            <Image avatar src={category.cover} />
            <List.Content>{category.title}</List.Content>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

AlbumExtra.propTypes = {
  intl: PropTypes.shape().isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string
    })
  )
};

AlbumExtra.defaultProps = {
  categories: []
};

export default injectIntl(observer(AlbumExtra));
