import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html-react';

const defaultOptions = {
  allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'b']
};

const sanitize = (dirty, options) => ({
  __html: sanitizeHtml(dirty, { ...defaultOptions, ...options })
});

const SanitizeHTML = ({ html, options }) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={sanitize(html, options)} />
);

SanitizeHTML.propTypes = {
  html: PropTypes.string.isRequired,
  options: PropTypes.shape()
};

SanitizeHTML.defaultProps = {
  options: {}
};

export default SanitizeHTML;
