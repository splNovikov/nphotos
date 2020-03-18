import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Card, Grid, Image, Segment } from 'semantic-ui-react';

import SocialButtonWithPopup from '../../../../components/SocialButtonWithPopup';

import './Contact.scss';

const Contact = ({ contact }) => (
  <Segment className="contact">
    <Grid stackable>
      <Grid.Column width={4} textAlign="center">
        <Image src={contact.avatar} size="tiny" avatar />
      </Grid.Column>
      <Grid.Column width={12}>
        <Card fluid>
          <Card.Content>
            <Card.Header>{contact.name}</Card.Header>
            <Card.Meta>{contact.phone}</Card.Meta>
            <Card.Description>{contact.shortDescription}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <SocialButtonWithPopup href={contact.vkLink} icon="vk" />
            <SocialButtonWithPopup
              href={contact.instagramLink}
              icon="instagram"
            />
            <SocialButtonWithPopup
              href={contact.facebookLink}
              icon="facebook"
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

export default observer(Contact);
