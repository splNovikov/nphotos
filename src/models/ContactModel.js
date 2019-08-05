class ContactModel {
  store;

  id;

  name;

  avatar;

  constructor(store, contact) {
    this.store = store;
    this.id = contact.id;
    this.name = contact.name;
    this.avatar = contact.avatar;
  }
}

export default ContactModel;
