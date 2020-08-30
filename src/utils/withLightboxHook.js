import React from 'react';
import { useLightbox } from 'simple-react-lightbox';

// https://infinum.com/the-capsized-eight/how-to-use-react-hooks-in-class-components
const withLightboxHook = Component => props => {
  const { openLightbox } = useLightbox();

  // eslint-disable-next-line react/jsx-props-no-spreading,react/jsx-filename-extension
  return <Component openLightbox={openLightbox} {...props} />;
};

export default withLightboxHook;
