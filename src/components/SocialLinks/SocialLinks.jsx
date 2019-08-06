import React from 'react';
import { Button } from 'semantic-ui-react';

const SocialLinks = () => (
  <div className="links">
    <Button
      compact
      icon="vk"
      href="https://vk.com/nphotos_ru"
      target="_blank"
      className="transparent"
    />
    <Button
      compact
      icon="instagram"
      href="https://www.instagram.com/_u/nphotos.ru/"
      target="_blank"
      className="transparent"
    />
    <Button
      compact
      icon="telegram"
      href="https://t.me/kattynphoto"
      target="_blank"
      className="transparent"
    />
  </div>
);

export default SocialLinks;
