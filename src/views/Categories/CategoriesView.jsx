import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button, Segment } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import Categories from '../../components/Categories';
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
        {permissions[userPermissions.canEditCategory] ? (
          <div className="edit-segment-wrapper">
            <Segment textAlign="right">
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
