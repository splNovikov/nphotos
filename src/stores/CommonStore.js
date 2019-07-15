import { observable, configure, action } from 'mobx';

// todo: do we need to put it everywhere in Stores? Or put it somewhere once?
configure({ enforceActions: 'observed' });
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
