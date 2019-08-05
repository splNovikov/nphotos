import React from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';

import './ContactsView.scss';

// todo: get avatars and contacts from BE
// todo: avatars are too big!!!
const ContactsView = () => {
  return (
    <Grid className="contacts-view" stackable columns={2}>
      <Grid.Column>
        <Segment>
          <Image
            src="https://downloader.disk.yandex.ru/preview/741124e5fd63a2747394bac3bcb0d4376100a76bce5507617700456305050456/5d47d2de/l-nWSGxEyuUy2YWE9n89gbqSih9ZFsU6dbylTbZw1Y4vAbqdkK5Nje-byCu7mtIJZljijhLJfCdQJK8YZbXuwQ%3D%3D?uid=0&filename=kate-avatar-nphotos.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048"
            size="tiny"
            avatar
          />
          Todo: Text here
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment>
          <Image
            src="https://1.downloader.disk.yandex.ru/preview/dd32167785b6b859e3938fc399722b9b213dc8155f6258aba10e727016cc7462/inf/z0MdQ8k7-UxX9EnNV1B_E0uibOhlBwI0uZrhndx3UaSvnkJVbUIE4FVx1AJKwrD3d2zzFgBGqpNsS0_2wB2RmQ%3D%3D?uid=173675977&filename=pavel-avatar-nphotos.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=173675977&tknv=v2&size=2160x1298"
            size="tiny"
            avatar
          />
          Todo: Text here
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default ContactsView;
