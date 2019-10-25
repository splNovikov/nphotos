import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Breadcrumb, Icon } from 'semantic-ui-react';

import './Breadcrumbs.scss';

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

  getSections = pathname =>
    pathname.split('/').reduce((acc, a) => {
      if (!a) return acc;
      return [...acc, a];
    }, []);

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
