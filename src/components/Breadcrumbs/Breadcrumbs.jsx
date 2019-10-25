import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Breadcrumb, Icon } from 'semantic-ui-react';

import './Breadcrumbs.scss';

@inject(({ albumsStore, categoriesStore, routingStore }) => ({
  pathname: routingStore.location.pathname,
  getAlbum: albumsStore.album,
  getCategory: categoriesStore.category
}))
@observer
class Breadcrumbs extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape,
    pathname: PropTypes.string.isRequired,
    getAlbum: PropTypes.func.isRequired,
    getCategory: PropTypes.func.isRequired
  };

  getSections = pathname =>
    pathname.split('/').reduce((acc, a) => {
      if (!a) return acc;

      const title = this.getTitle(a);

      if (title) return [...acc, title];

      return [...acc, a];
    }, []);

  getTitle = id => {
    const { getAlbum, getCategory } = this.props;
    const album = getAlbum(id) || getCategory(id);

    return album && album.title;
  };

  isLast = (length, index) => index !== length - 1;

  render() {
    const {
      pathname,
      intl: { formatMessage }
    } = this.props;
    const sections = this.getSections(pathname);

    return sections && sections.length ? (
      <Breadcrumb className="breadcrumbs">
        <Breadcrumb.Section link as={NavLink} to="/">
          <Icon name="home" />
        </Breadcrumb.Section>

        {sections.map((section, index) => {
          return (
            <React.Fragment key={section}>
              <Breadcrumb.Divider icon="right angle" />

              {this.isLast(sections.length, index) ? (
                <Breadcrumb.Section as={NavLink} to={`/${section}`}>
                  {formatMessage({
                    id: `navigationMenu.${section}`,
                    defaultMessage: section
                  })}
                </Breadcrumb.Section>
              ) : (
                section
              )}
            </React.Fragment>
          );
        })}
      </Breadcrumb>
    ) : null;
  }
}

export default injectIntl(Breadcrumbs);
