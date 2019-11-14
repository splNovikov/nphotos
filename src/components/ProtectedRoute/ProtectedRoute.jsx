import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

import userPermissions from '../../constants/userPermissions';

const render = (Component, permissions, restriction) => props => {
  return permissions && permissions[restriction] ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  );
};

const ProtectedRoute = ({
  component: Component,
  user,
  restriction,
  ...rest
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} render={render(Component, user.permissions, restriction)} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  restriction: PropTypes.string.isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      [userPermissions.canEditAlbum]: PropTypes.bool
    })
  }).isRequired,
  location: PropTypes.shape({
    path: PropTypes.string
  }).isRequired
};

export default inject(stores => ({
  user: stores.userStore.user
}))(observer(ProtectedRoute));
