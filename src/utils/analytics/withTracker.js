import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-136814574-1');

const trackPage = (page, options) => {
  ReactGA.set({
    page,
    ...options
  });
  ReactGA.pageview(page);
};

const withTracker = (WrappedComponent, options = {}) => props => {
  const {
    // eslint-disable-next-line react/prop-types
    location: { pathname }
  } = props;
  useEffect(() => trackPage(pathname, options), [pathname]);

  // eslint-disable-next-line react/jsx-filename-extension
  return <WrappedComponent {...props} />;
};

export default withTracker;
