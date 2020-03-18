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
  componentDidMount() {
    const { fetchContacts, contacts } = this.props;

    if (!contacts.length) {
      fetchContacts();
    }
  }

  render() {
    const { isFetching, contacts } = this.props;

    return (
      <Segment
        className="contacts-view no-borders fetching-min-height"
        loading={isFetching}
      >
        <Grid container stackable>
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
  fetchContacts: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

ContactsView.wrappedComponent.defaultProps = {
  contacts: []
};

export default ContactsView;
