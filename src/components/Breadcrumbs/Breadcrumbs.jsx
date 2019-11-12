import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Breadcrumb, Icon } from 'semantic-ui-react';

import './Breadcrumbs.scss';
import appRoutes from '../../constants/appRoutes';

@inject(({ albumsStore, categoriesStore, routingStore }) => ({
  pathname: routingStore.location.pathname,
  getAlbum: albumsStore.album,
  isAlbumFetching: albumsStore.isFetching,
  getCategory: categoriesStore.category,
  isCategoryFetching: categoriesStore.isFetching
}))
@observer
class Breadcrumbs extends React.Component {
  specificRoutesMap = {
    [appRoutes.albumEdit]: (
      <Breadcrumb.Section as={NavLink} to={appRoutes.albums}>
        {this.props.intl.formatMessage({
          id: `navigationMenu.albums`,
          defaultMessage: 'albums'
        })}
      </Breadcrumb.Section>
    )
  };

  getSections = pathname =>
    pathname.split('/').reduce((acc, a) => {
      if (!a) return acc;

      return [...acc, a];
    }, []);

  getTitle = id => {
    const { getAlbum, getCategory } = this.props;

    const entity = getAlbum(id) || getCategory(id);

    return entity && entity.title;
  };

  getLastSection = section => {
    const { isAlbumFetching, isCategoryFetching } = this.props;

    if (isAlbumFetching || isCategoryFetching) {
      return <Icon name="circle notch" loading />;
    }

    return this.getTitle(section) || section;
  };

  isLast = (length, index) => index === length - 1;

  renderSection = (section, sectionsSize, index) => {
    const {
      intl: { formatMessage }
    } = this.props;

    if (this.specificRoutesMap[`/${section}`]) {
      return this.specificRoutesMap[`/${section}`];
    }

    if (!this.isLast(sectionsSize, index)) {
      return (
        <Breadcrumb.Section as={NavLink} to={`/${section}`}>
          {formatMessage({
            id: `navigationMenu.${section}`,
            defaultMessage: section
          })}
        </Breadcrumb.Section>
      );
    }

    return this.getLastSection(section);
  };

  render() {
    const { pathname } = this.props;
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

              {this.renderSection(section, sections.length, index)}
            </React.Fragment>
          );
        })}
      </Breadcrumb>
    ) : null;
  }
}

Breadcrumbs.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  pathname: PropTypes.string.isRequired,
  getAlbum: PropTypes.func.isRequired,
  isAlbumFetching: PropTypes.bool.isRequired,
  isCategoryFetching: PropTypes.bool.isRequired,
  getCategory: PropTypes.func.isRequired
};

export default injectIntl(Breadcrumbs);
