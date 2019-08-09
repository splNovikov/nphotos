import { formatPhoneNumber } from '../utils';

class ContactModel {
  store;

  id;

  name;

  avatar;

  vkLink;

  instagramLink;

  facebookLink;

  phone;

  shortDescription;

  constructor(store, contact) {
    this.store = store;
    this.id = contact.id;
    this.name = contact.name;
    this.avatar = contact.avatar;
    this.vkLink = contact.vkLink;
    this.instagramLink = contact.instagramLink;
    this.facebookLink = contact.facebookLink;
    this.phone = formatPhoneNumber(contact.phone);
    this.shortDescription = contact.shortDescription;
  }
}

export default ContactModel;
