import { flow, observable } from 'mobx';

import userPermissions from '../constants/userPermissions';
import userApi from '../api/user';
import httpErrorHandler from '../utils/httpErrorHandler';

class UserStore {
  @observable isFetching = false;

  @observable errors = [];

  @observable user = {
    permissions: {
      [userPermissions.canEditAlbum]: false,
      [userPermissions.canEditCategory]: false
    }
  };

  fetchUser = () => this.flowFetchUser();

  flowFetchUser = flow(function* fetchUser() {
    this.isFetching = true;
    try {
      // todo: canEditCategory add to api response
      const { data: user } = yield userApi.getUser();

      // todo: map User
      this.user = user;
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.isFetching = false;
    }
  });
}

export default new UserStore();
