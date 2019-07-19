import React from 'react';
import {
  Segment,
  Container,
  Grid,
  List,
  Header,
  Image,
  Divider
} from 'semantic-ui-react';

import logo from '../../assets/images/logo.svg';

const Footer = () => (
  <Segment
    secondary
    vertical
    color="orange"
    style={{ margin: '5em 0em 0em', padding: '2em 0' }}
  >
    <Container textAlign="center">
      <Grid divided stackable>
        <Grid.Column width={3}>
          <Header as="h4" content="Group 1" />
          <List link>
            <List.Item as="a">Link One</List.Item>
            <List.Item as="a">Link Two</List.Item>
            <List.Item as="a">Link Three</List.Item>
            <List.Item as="a">Link Four</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header as="h4" content="Group 2" />
          <List link>
            <List.Item as="a">Link One</List.Item>
            <List.Item as="a">Link Two</List.Item>
            <List.Item as="a">Link Three</List.Item>
            <List.Item as="a">Link Four</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={3}>
          <Header as="h4" content="Group 3" />
          <List link>
            <List.Item as="a">Link One</List.Item>
            <List.Item as="a">Link Two</List.Item>
            <List.Item as="a">Link Three</List.Item>
            <List.Item as="a">Link Four</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as="h4" content="Footer Header" />
          <p>
            Extra space for a call to action inside the footer that could help
            re-engage users.
          </p>
        </Grid.Column>
      </Grid>

      <Divider section />
      <Image centered size="small" src={logo} />
      <List horizontal divided link size="small">
        <List.Item as="a" href="#">
          Site Map
        </List.Item>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
