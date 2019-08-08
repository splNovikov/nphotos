import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Grid, Image, Segment } from 'semantic-ui-react';
import { formatPhoneNumber } from '../../../../utils';

const Contact = ({ contact }) => (
  <Segment>
    <Grid stackable columns={2}>
      <Grid.Column width={4} textAlign="center">
        <Image src={contact.avatar} size="tiny" avatar />
      </Grid.Column>
      <Grid.Column width={12}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{contact.name}</Card.Header>
            <Card.Meta>{formatPhoneNumber(contact.phone)}</Card.Meta>
            <Card.Description>{contact.shortDescription}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              compact
              icon="vk"
              href={contact.vkLink}
              target="_blank"
              className="transparent"
            />
            <Button
              compact
              icon="instagram"
              href={contact.instagramLink}
              target="_blank"
              className="transparent"
            />
            <Button
              compact
              icon="facebook"
              href={contact.facebookLink}
              target="_blank"
              className="transparent"
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  </Segment>
);

Contact.propTypes = {
  contact: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    shortDescription: PropTypes.string,
    vkLink: PropTypes.string,
    instagramLink: PropTypes.string,
    facebookLink: PropTypes.string
  }).isRequired
};

export default Contact;
