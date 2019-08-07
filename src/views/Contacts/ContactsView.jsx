import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Grid, Segment } from 'semantic-ui-react';

import Contact from './components/Contact';

import './ContactsView.scss';

@inject(({ contactsStore }) => ({
  fetchContacts: contactsStore.fetchContacts,
  isFetching: contactsStore.isFetching,
  contacts: contactsStore.contacts
}))
@observer
class ContactsView extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape),
    fetchContacts: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
  };

  static defaultProps = {
    contacts: []
  };

  componentDidMount() {
    const { fetchContacts, contacts } = this.props;

    if (!contacts.length) {
      fetchContacts();
    }
  }

  render() {
    const { isFetching, contacts } = this.props;

    return (
      <Segment className="contacts-view no-borders" loading={isFetching}>
        <Grid className="contacts-grid" stackable columns={2}>
          {contacts.map(contact => (
            <Grid.Column key={contact.id}>
              <Contact contact={contact} />
            </Grid.Column>
          ))}
        </Grid>
      </Segment>
    );
  }
}

export default ContactsView;
