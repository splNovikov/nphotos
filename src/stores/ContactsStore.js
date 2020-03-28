import { observable, flow } from 'mobx';

import { BaseStore } from './BaseStore';
import contactsApi from '../api/contacts';
import ContactModel from '../models/ContactModel';
import httpErrorHandler from '../utils/httpErrorHandler';

export class ContactsStore extends BaseStore {
  @observable errors = [];

  // contacts, loaded all for once
  @observable contacts = [];

  fetchContacts = () => this.flowFetchContacts();

  flowFetchContacts = flow(function* fetchContacts() {
    this.debouncedToggleFetching(true);

    try {
      const { data: contacts } = yield contactsApi.getContacts();

      this.contacts = contacts.map(contact => new ContactModel(this, contact));
    } catch (error) {
      this.errors.push(error);
      httpErrorHandler(error);
    } finally {
      this.debouncedToggleFetching(false);
    }
  });
}

export default new ContactsStore();
