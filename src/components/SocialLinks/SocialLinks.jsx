import React from 'react';
import { Icon } from 'semantic-ui-react';

import './SocialLinks.scss';

const SocialLinks = () => (
  <div className="links">
    <a
      href="https://vk.com/nphotos_ru"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="vk" />
    </a>
    <a
      href="https://www.instagram.com/_u/nphotos.ru/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="instagram" />
    </a>
  </div>
);

export default SocialLinks;
