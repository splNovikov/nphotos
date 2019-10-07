import React from 'react';
import { observer } from 'mobx-react';

import SocialButtonWithPopup from '../SocialButtonWithPopup';

const SocialLinks = () => {
  return (
    <div className="links">
      <SocialButtonWithPopup href="https://vk.com/nphotos_ru" icon="vk" />
      <SocialButtonWithPopup
        href="https://www.instagram.com/_u/nphotos.ru/"
        icon="instagram"
      />
      <SocialButtonWithPopup href="https://t.me/kattynphoto" icon="telegram" />
    </div>
  );
};

export default observer(SocialLinks);
