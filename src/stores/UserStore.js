import { observable } from 'mobx';

class UserStore {
  @observable user = {
    // todo: should be received from backend
    permissions: {
      canEditAlbum: true
    }
  };
}

export default new UserStore();
