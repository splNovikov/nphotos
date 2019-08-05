import { observable, flow, configure } from 'mobx';

import contactsApi from '../api/contacts';
import ContactModel from '../models/ContactModel';

// todo: do we need to put it everywhere in Stores? Or put it somewhere once?
configure({ enforceActions: 'observed' });

export class ContactsStore {
  @observable isFetching = false;

  @observable errors = [];

  // contacts, loaded all for once
  @observable contacts = [];

  fetchContacts = () => this.flowFetchContacts();

  flowFetchContacts = flow(function* fetchContacts() {
    this.isFetching = true;
    try {
      const { data: contacts } = yield contactsApi.getContacts();

      this.contacts = contacts.map(contact => new ContactModel(this, contact));
    } catch (error) {
      this.errors.push(error);
    } finally {
      this.isFetching = false;
    }
  });
}

export default new ContactsStore();
