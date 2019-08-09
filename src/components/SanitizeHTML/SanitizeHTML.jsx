import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html-react';

const defaultOptions = {
  allowedTags: ['br']
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
