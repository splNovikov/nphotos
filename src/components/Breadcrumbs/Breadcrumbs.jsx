import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Breadcrumb } from 'semantic-ui-react';

import appRoutes from '../../constants/appRoutes';

@inject(({ routingStore }) => ({
  pathname: routingStore.location.pathname
}))
@observer
class Breadcrumbs extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    intl: intlShape,
    pathname: PropTypes.string.isRequired
  };

  render() {
    const {
      pathname,
      intl: { formatMessage }
    } = this.props;

    return (
      <Breadcrumb>
        <Breadcrumb.Section link as={NavLink} to="/">
          {formatMessage({
            id: 'navigationMenu.home',
            defaultMessage: 'home'
          })}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section link as={NavLink} to={appRoutes.categories}>
          {formatMessage({
            id: 'navigationMenu.categories',
            defaultMessage: 'categories'
          })}
        </Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>{pathname}</Breadcrumb.Section>
      </Breadcrumb>
    );
  }
}

export default injectIntl(Breadcrumbs);
