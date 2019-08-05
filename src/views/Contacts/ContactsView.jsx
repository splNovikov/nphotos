import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Card, Grid, Image, Segment } from 'semantic-ui-react';

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

  // todo: show isFetching in better way
  render() {
    const { isFetching, contacts } = this.props;
    return (
      <React.Fragment>
        {isFetching}
        <Grid className="contacts-view" stackable columns={2}>
          {contacts.map(contact => (
            <Grid.Column key={contact.id}>
              <Segment>
                <Image src={contact.avatar} size="tiny" avatar floated="left" />
                <Card>
                  <Card.Content>
                    <Card.Header>{contact.name}</Card.Header>
                    <Card.Meta>Friends of Elliot</Card.Meta>
                    <Card.Description>
                      Steve wants to add you to the group{' '}
                      <strong>best friends</strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>Extra</Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default ContactsView;
