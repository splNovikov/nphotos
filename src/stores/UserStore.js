import { observable } from 'mobx';

import userPermissions from '../constants/userPermissions';

class UserStore {
  @observable user = {
    // todo: should be received from backend
    permissions: {
      [userPermissions.canEditAlbum]: true
    }
  };
}

export default new UserStore();
