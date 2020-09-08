import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import Categories from '../../components/Categories';
import SEO from '../../components/SEO';
import userPermissions from '../../constants/userPermissions';
import appRoutes from '../../constants/appRoutes';

import './CategoriesView.scss';

@inject(({ userStore, routingStore }) => ({
  navigate: routingStore.push,
  user: userStore.user
}))
@observer
class CategoriesView extends Component {
  handleClickEdit = () => {
    const { navigate } = this.props;

    navigate(`${appRoutes.categoryEdit}/add`);
  };

  render() {
    const {
      intl: { formatMessage },
      user: { permissions }
    } = this.props;

    return (
      <div className="categories-view">
        <SEO
          pageProps={{
            title: 'NPhotos: Categories',
            url: appRoutes.categories,
            thumbnail:
              'https://nphotos-images.s3.us-east-2.amazonaws.com/bnnrs/banner-5-mobile.jpg'
          }}
        />

        {permissions[userPermissions.canEditCategory] ? (
          <div className="edit-segment-wrapper">
            <Segment textAlign="right" className="no-borders">
              <Button
                onClick={this.handleClickEdit}
                labelPosition="left"
                positive
                icon="add"
                content={formatMessage({
                  id: 'common.add',
                  defaultMessage: 'add'
                })}
              />
            </Segment>
          </div>
        ) : null}
        <Categories />
      </div>
    );
  }
}

CategoriesView.wrappedComponent.propTypes = {
  intl: PropTypes.shape().isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      [userPermissions.canEditCategory]: PropTypes.bool
    })
  }).isRequired,
  navigate: PropTypes.func.isRequired
};

export default injectIntl(CategoriesView);
