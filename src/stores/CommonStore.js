import { observable, action } from 'mobx';

class CommonStore {
  @observable isSidebarOpened = false;

  @action.bound
  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  @action.bound
  closeSidebar() {
    this.isSidebarOpened = false;
  }
}

export default new CommonStore();
