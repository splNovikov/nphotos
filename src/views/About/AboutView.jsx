import React from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react';

const isFetching = false;

const AboutView = () => (
  <Segment className="about-view no-borders" loading={isFetching}>
    <Grid container stackable>
      <Grid.Column width={8}>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Grid.Column>
      <Grid.Column width={8}>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Grid.Column>
      <Grid.Column width={8}>
        <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
      </Grid.Column>
    </Grid>
  </Segment>
);
export default AboutView;
