import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Grid, Segment } from 'semantic-ui-react';

import Contact from './components/Contact';

import './ContactsView.scss';

@inject(({ contactsStore }) => ({
  fetchContacts: contactsStore.fetchContacts,
  contacts: contactsStore.contacts
}))
@observer
class ContactsView extends Component {
  componentDidMount() {
    const { fetchContacts, contacts } = this.props;

    if (!contacts.length) {
      fetchContacts();
    }
  }

  render() {
    const { contacts } = this.props;

    return (
      <Segment className="contacts-view no-borders fetching-min-height">
        <Grid container stackable columns={2}>
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

ContactsView.wrappedComponent.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  fetchContacts: PropTypes.func.isRequired
};

ContactsView.wrappedComponent.defaultProps = {
  contacts: []
};

export default ContactsView;
