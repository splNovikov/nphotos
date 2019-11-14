import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';

// todo: canEditAlbum - is a one case. It should be passed as a parameter
const render = (Component, permissions) => props =>
  permissions && permissions.canEditAlbum ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  );

const ProtectedRoute = ({ component: Component, user, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...rest} render={render(Component, user.permissions)} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  user: PropTypes.shape({
    permissions: PropTypes.shape({
      canEditAlbum: PropTypes.bool
    })
  }).isRequired,
  location: PropTypes.shape({
    path: PropTypes.string
  }).isRequired
};

export default inject(stores => ({
  user: stores.userStore.user
}))(observer(ProtectedRoute));
