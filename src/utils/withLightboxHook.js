import React from 'react';
import { useLightbox } from 'simple-react-lightbox';

// https://infinum.com/the-capsized-eight/how-to-use-react-hooks-in-class-components
const withLightboxHook = Component => props => {
  const { openLightbox, closeLightbox } = useLightbox();

  /* eslint-disable react/jsx-filename-extension, react/jsx-props-no-spreading */
  return (
    <Component
      openLightbox={openLightbox}
      closeLightbox={closeLightbox}
      {...props}
    />
  );
  /* eslint-enable react/jsx-filename-extension, react/jsx-props-no-spreading */
};

export default withLightboxHook;
