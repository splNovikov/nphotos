import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const SEO = ({ pageProps }) => {
  return (
    <Helmet>
      <title>{pageProps.title}</title>
      <meta property="og:title" content={pageProps.title} />
      <meta property="og:image" content={pageProps.thumbnail} />
      <meta property="og:url" content={pageProps.url} />
    </Helmet>
  );
};

SEO.propTypes = {
  pageProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default SEO;
